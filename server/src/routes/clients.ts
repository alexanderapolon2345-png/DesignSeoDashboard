import express from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const inviteSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
});

// Get all clients
router.get('/', authenticateToken, async (req, res) => {
    try {
        let clients;

        if (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN') {
            // Global admins see all clients
            clients = await prisma.client.findMany({
                include: {
                    user: {
                        select: { id: true, name: true, email: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        } else {
            // Worker/Agency users → get clients of their agency
            const memberships = await prisma.userAgency.findMany({
                where: { userId: req.user.userId },
                select: { agencyId: true },
            });

            const agencyIds = memberships.map(m => m.agencyId);

            clients = await prisma.client.findMany({
                where: {
                    user: {
                        memberships: {
                            some: { agencyId: { in: agencyIds } },
                        },
                    },
                },
                include: {
                    user: {
                        select: { id: true, name: true, email: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        }

        res.json(clients);
    } catch (error) {
        console.error('Fetch clients error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a client
router.put('/:id', authenticateToken, async (req, res) => {
    const clientId = req.params.id;
    const { name, domain, status } = req.body.data;

    try {
        // Check if client exists
        const existing = await prisma.client.findUnique({
            where: { id: clientId },
        });

        if (!existing) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Restrict: only ADMIN / SUPER_ADMIN can update status
        const updateData: any = {};
        if (name) updateData.name = name;
        if (domain) updateData.domain = domain;

        if (status) {
            if (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN') {
                updateData.status = status;
            } else {
                return res.status(403).json({ message: 'Not allowed to update status' });
            }
        }

        const updated = await prisma.client.update({
            where: { id: clientId },
            data: updateData,
        });

        res.json(updated);
    } catch (error) {
        console.error('Update client error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



export default router;