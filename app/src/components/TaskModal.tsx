import { createTask } from "@/store/slices/taskSlice";
import { Task, TaskStatus } from "@/utils/types";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

interface TaskModalProps {
    title: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    mode: Number;
    task?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, setOpen, title, mode, task }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        status: "TODO" as TaskStatus,
        dueDate: null as Date | null,
        assigneeId: "",
        clientId: "",
    });

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            title: form.title.trim(),
            description: form.description || undefined,
            category: form.category || undefined,
            status: form.status,
            dueDate: form.dueDate ? form.dueDate.toISOString() : undefined,
            assigneeId: form.assigneeId || undefined,
            clientId: form.clientId || undefined,
        };

        if (mode === 0) {
            // @ts-ignore
            dispatch(createTask(payload));
        } else if (mode === 1 && task) {
            // @ts-ignore
            dispatch(updateTask({ id: task.id, ...payload }));
        }

        setOpen(false);
    };

    const handleCancel = () => setOpen(false);

    React.useEffect(() => {
        if (open) {
            if (mode === 1 && task) {
                setForm({
                    title: task.title ?? "",
                    description: task.description ?? "",
                    category: task.category ?? "",
                    status: task.status,
                    dueDate: task.dueDate ? new Date(task.dueDate) : null,
                    assigneeId: task.assignee?.id ?? "",
                    clientId: task.client?.id ?? "",
                });
            } else {
                setForm({
                    title: "",
                    description: "",
                    category: "",
                    status: "TODO",
                    dueDate: null,
                    assigneeId: "",
                    clientId: "",
                });
            }
        }
    }, [open, mode, task]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="REVIEW">REVIEW</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <DatePicker
                                selected={form.dueDate}
                                onChange={(date) => date && setForm({ ...form, dueDate: date })}
                                minDate={new Date()}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assignee ID</label>
                            <input
                                type="text"
                                value={form.assigneeId}
                                onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="(optional)"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                        <input
                            type="text"
                            value={form.clientId}
                            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="(optional)"
                        />
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {mode === 0 ? "Create" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
