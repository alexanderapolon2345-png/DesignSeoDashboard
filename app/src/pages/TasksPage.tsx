import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { RootState } from "@/store";

import {
    Users,
    Plus,
    Mail,
    MoreVertical,
    Shield,
    UserCheck,
    UserX,
    Edit,
    Trash2,
    Table,
    Kanban,
    Filter,
    Search,
    ListTodo,
    ListEndIcon,
    MoveRightIcon,
    Check,
    CheckCircle,
    CheckSquare,
    LucideBedDouble,
    CheckCheck
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import { getStatusBadge } from "@/utils";
import KanbanBoard from "./KanbanBoard";
import TaskModal from "@/components/TaskModal";
import { fetchTasks, patchTaskStatus } from "@/store/slices/taskSlice";
import { ROLE, Task } from "@/utils/types";

const TasksPage = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<Number>(0);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [enabled, setEnabled] = useState(false);
    const { tasks } = useSelector((state: RootState) => state.task)
    const { user } = useSelector((state: RootState) => state.auth);

    // Only non-workers can create
    const canCreate = (user?.role as ROLE | undefined) !== "WORKER";

    const handleCreateClick = () => {
        setSelectedTask(null);
        setMode(0);
        setOpen(true);
    };

    const handleEditClick = (task: Task) => {
        setSelectedTask(task);
        setMode(1);
        setOpen(true);
    };

    const handleDeleteTask = (id: string) => {
    }

    const filtered = tasks.filter((t) => {
        const q = searchTerm.toLowerCase();
        return (
            t.title.toLowerCase().includes(q) ||
            (t.description ?? "").toLowerCase().includes(q) ||
            (t.category ?? "").toLowerCase().includes(q) ||
            (t.assignee?.name ?? "").toLowerCase().includes(q) ||
            (t.client?.name ?? "").toLowerCase().includes(q)
        );
    });

    useEffect(() => { dispatch(fetchTasks() as any); }, [dispatch]);

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                    <p className="text-gray-600 mt-2">
                        Manage all tasks and assign to the workers
                    </p>
                </div>
                {canCreate &&
                    <button
                        onClick={handleCreateClick}
                        className={"bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"}
                    >
                        <Plus className="h-5 w-5" />
                        <span>Create Task</span>
                    </button>
                }
            </div>

            {/* Task */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {tasks.length}
                            </p>
                        </div>
                        <Users className="h-8 w-8 text-primary-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">TODO</p>
                            <p className="text-2xl font-bold text-gray-400">
                                {tasks.filter((m) => m.status === "TODO").length}
                            </p>
                        </div>
                        <ListTodo className="h-8 w-8 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">IN_PROGRESS</p>
                            <p className="text-2xl font-bold text-blue-400">
                                {tasks.filter((m) => m.status === "IN_PROGRESS").length}
                            </p>
                        </div>
                        <Edit className="h-8 w-8 text-blue-400" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">REVIEW</p>
                            <p className="text-2xl font-bold text-orange-400">
                                {tasks.filter((m) => m.status === "REVIEW").length}
                            </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-orange-400" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">DONE</p>
                            <p className="text-2xl font-bold text-secondary-600">
                                {tasks.filter((m) => m.status === "DONE").length}
                            </p>
                        </div>
                        <CheckCheck className="h-8 w-8 text-secondary-600" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    {/* Select Mode (Table | Kanban) */}
                    <div className="flex flex-row items-center">
                        <button
                            onClick={() => setEnabled((prev) => !prev)}
                            className={`relative w-16 h-9 rounded-full transition-colors duration-300 ${enabled ? "bg-blue-500" : "bg-gray-400"}`}
                        >
                            <span
                                className={`absolute top-1 left-1 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-7" : "translate-x-0"}`}
                            >
                                {enabled ? (
                                    <Kanban className="w-4 h-4 text-yellow-500" />
                                ) : (
                                    <Table className="w-4 h-4 text-indigo-600" />
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Task View */}
            {(!enabled) ? (
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtered.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">{task.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusBadge(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">{task.category ?? "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">{task.client?.name ?? "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">{task.assignee?.name ?? "-"}</td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-xs">{task.description ?? "-"}</td> */}
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                                            {task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                                                    onClick={() => handleEditClick(task)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <KanbanBoard
                    tasks={filtered}
                    onMove={(id, status) => dispatch(patchTaskStatus({ id, status }) as any)}
                />
            )}

            {/* Create Task Modal */}
            <TaskModal
                mode={mode}
                title={mode === 0 ? "Create Task" : "Edit Task"}
                open={open}
                setOpen={setOpen}
                task={selectedTask ?? undefined}
            />
        </div>
    );
};

export default TasksPage;
