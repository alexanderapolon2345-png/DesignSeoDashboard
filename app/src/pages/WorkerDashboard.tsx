import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchTasks } from "@/store/slices/taskSlice";
import Layout from "@/components/Layout";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const WorkerDashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.task);

  // Ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const myTasks = safeTasks.filter((task) => task.assignee); // In real app, filter by current user

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DONE":
        return <CheckCircle className="h-5 w-5 text-secondary-500" />;
      case "IN_PROGRESS":
        return <Clock className="h-5 w-5 text-accent-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      TODO: "bg-gray-100 text-gray-800",
      IN_PROGRESS: "bg-accent-100 text-accent-800",
      DONE: "bg-secondary-100 text-secondary-800",
    };
    return styles[status as keyof typeof styles] || styles.TODO;
  };

  return (
    <Layout title="Worker Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-2">
            View and manage your assigned tasks
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {safeTasks.filter((t) => t.status === "TODO").length}
              </p>
              <p className="text-gray-600">To Do</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent-600">
                {safeTasks.filter((t) => t.status === "IN_PROGRESS").length}
              </p>
              <p className="text-gray-600">In Progress</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary-600">
                {safeTasks.filter((t) => t.status === "DONE").length}
              </p>
              <p className="text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                    task.status
                  )}`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </div>
              {task.description && (
                <p className="text-gray-600 mb-4">{task.description}</p>
              )}
              <div className="text-sm text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {myTasks.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tasks assigned
            </h3>
            <p className="text-gray-600">
              You don't have any tasks assigned yet.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WorkerDashboard;
