import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  assigneeId: z.string().optional(),
});

// Get tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === 'ADMIN') {
      // Admin can see all tasks
      tasks = await prisma.task.findMany({
        include: {
          assignee: {
            select: { id: true, name: true, email: true },
          },
          agency: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Get user's agency memberships
      const memberships = await prisma.userAgency.findMany({
        where: { userId: req.user.userId },
        include: { agency: true },
      });

      const agencyIds = memberships.map(m => m.agencyId);

      if (req.user.role === 'AGENCY') {
        // Agency can see all tasks in their agencies
        tasks = await prisma.task.findMany({
          where: { agencyId: { in: agencyIds } },
          include: {
            assignee: {
              select: { id: true, name: true, email: true },
            },
            agency: {
              select: { id: true, name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      } else {
        // Worker can only see assigned tasks
        tasks = await prisma.task.findMany({
          where: {
            OR: [
              { assigneeId: req.user.userId },
              { agencyId: { in: agencyIds } },
            ],
          },
          include: {
            assignee: {
              select: { id: true, name: true, email: true },
            },
            agency: {
              select: { id: true, name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      }
    }

    res.json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, assigneeId } = createTaskSchema.parse(req.body);

    // For MVP, create task in first agency the user belongs to
    const membership = await prisma.userAgency.findFirst({
      where: { userId: req.user.userId },
    });

    if (!membership && req.user.role !== 'ADMIN') {
      return res.status(400).json({ message: 'You must belong to an agency to create tasks' });
    }

    const agencyId = membership?.agencyId || (await prisma.agency.findFirst())?.id;

    if (!agencyId) {
      return res.status(400).json({ message: 'No agency found' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        agencyId,
        createdById: req.user.userId,
        assigneeId,
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        agency: {
          select: { id: true, name: true },
        },
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// Update task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = updateTaskSchema.parse(req.body);

    // Check if user has permission to update this task
    const task = await prisma.task.findUnique({
      where: { id },
      include: { agency: { include: { members: true } } },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const hasPermission = req.user.role === 'ADMIN' ||
      task.agency.members.some(m => m.userId === req.user.userId);

    if (!hasPermission) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updates,
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        agency: {
          select: { id: true, name: true },
        },
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

export default router;