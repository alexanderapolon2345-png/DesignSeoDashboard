import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchProjects, createProject } from "../store/slices/projectSlice";
import {
  Plus,
  Globe,
  Calendar,
  MoreVertical,
  TrendingUp,
  Search,
} from "lucide-react";

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(
    (state: RootState) => state.project
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: "", domain: "" });

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createProject(projectForm) as any);
    setProjectForm({ name: "", domain: "" });
    setShowCreateModal(false);
  };

  // Mock data for demo
  const mockProjects =
    projects.length > 0
      ? projects.map((p) => ({
          ...p,
          keywords: 0,
          avgPosition: 0,
          topRankings: 0,
          traffic: 0,
        }))
      : [
          {
            id: "1",
            name: "E-commerce Store",
            domain: "example-store.com",
            status: "ACTIVE",
            createdAt: "2024-01-15",
            keywords: 156,
            avgPosition: 8.2,
            topRankings: 23,
            traffic: 12450,
          },
          {
            id: "2",
            name: "Local Business",
            domain: "localbiz.com",
            status: "ACTIVE",
            createdAt: "2024-02-01",
            keywords: 89,
            avgPosition: 15.7,
            topRankings: 12,
            traffic: 5670,
          },
          {
            id: "3",
            name: "Tech Blog",
            domain: "techblog.io",
            status: "PAUSED",
            createdAt: "2024-01-08",
            keywords: 234,
            avgPosition: 6.3,
            topRankings: 45,
            traffic: 8920,
          },
        ];

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: "bg-green-100 text-green-800",
      PAUSED: "bg-yellow-100 text-yellow-800",
      ARCHIVED: "bg-gray-100 text-gray-800",
    };
    return styles[status as keyof typeof styles] || styles.ACTIVE;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">
            Manage your SEO projects and track their performance
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600">{project.domain}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {project.keywords ?? 0}
                  </p>
                  <p className="text-xs text-gray-600">Keywords</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {project.avgPosition ?? 0}
                  </p>
                  <p className="text-xs text-gray-600">Avg Position</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-secondary-600">
                    {project.topRankings ?? 0}
                  </p>
                  <p className="text-xs text-gray-600">Top 10</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-primary-600">
                    {project.traffic?.toLocaleString() ?? "0"}
                  </p>
                  <p className="text-xs text-gray-600">Traffic</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Create New Project
            </h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <input
                  type="url"
                  value={projectForm.domain}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, domain: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
