import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchTasks } from "@/store/slices/taskSlice";
import Layout from "@/components/Layout";
import Kanban from "@/components/Kanban"
import { CheckCircle, Clock, AlertCircle, Users, ListTodo, Edit, CheckCheck, Trash2, Eye } from "lucide-react";

const WorkerDashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.task);

  // Ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const teamMembers = [
    {
      id: 1,
      name: "James Lee",
      role: "Manager",
      email: "jameslee@gmail.com",
      phoneNumber: "+1 (234)-5678"
    },
    {
      id: 2,
      name: "John Motter",
      role: "Worker",
      email: "johnmotter@gmail.com",
      phoneNumber: "+1 (234)-5678"
    },
    {
      id: 3,
      name: "David Simon",
      role: "Worker",
      email: "davidsimon@gmail.com",
      phoneNumber: "+1 (234)-5678"
    },
    {
      id: 4,
      name: "Ron Christopher",
      role: "Worker",
      email: "ronchris@gmail.com",
      phoneNumber: "+1 (234)-5678"
    }
  ]

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const myTasks = safeTasks.filter((task) => task.assignee); // In real app, filter by current user

  return (
    <Layout title="Worker Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-2">
            Here's all task status which you're assigned
          </p>
        </div>


        {/* My Task */}
        <div className="flex flex-col mb-8 items-end">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 w-full">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myTasks.length}
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
                    {myTasks.filter((m) => m.status === "TODO").length}
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
                    {myTasks.filter((m) => m.status === "IN_PROGRESS").length}
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
                    {myTasks.filter((m) => m.status === "REVIEW").length}
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
                    {myTasks.filter((m) => m.status === "DONE").length}
                  </p>
                </div>
                <CheckCheck className="h-8 w-8 text-secondary-600" />
              </div>
            </div>
          </div>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium m-3">
            View details
          </button>
        </div>

        {/* My Team */}
        <div className="relative">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Team</h1>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 mt-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`py-1 text-xs font-medium rounded-full`}
                        >
                          {member.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`py-1 text-xs font-medium rounded-full`}
                        >
                          {member.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`py-1 text-xs font-medium rounded-full`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`py-1 text-xs font-medium rounded-full`}
                        >
                          {member.email}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`py-1 text-xs font-medium rounded-full`}
                        >
                          {member.phoneNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="absolute text-primary-600 hover:text-primary-700 text-sm font-medium m-3 right-0">
            View Agency
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default WorkerDashboard;
