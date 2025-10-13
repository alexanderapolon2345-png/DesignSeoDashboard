import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Mail,
  Share2,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    name: "",
    type: "monthly",
    projects: [],
    recipients: "",
  });

  // Mock reports data
  const reports = [
    {
      id: "1",
      name: "Monthly SEO Report - E-commerce Store",
      type: "Monthly",
      project: "E-commerce Store",
      lastGenerated: "2024-01-15",
      status: "Sent",
      recipients: ["client@ecommerce.com", "manager@agency.com"],
      metrics: { keywords: 156, avgPosition: 8.2, traffic: 12450 },
    },
    {
      id: "2",
      name: "Weekly Performance - Local Business",
      type: "Weekly",
      project: "Local Business",
      lastGenerated: "2024-01-14",
      status: "Draft",
      recipients: ["owner@localbiz.com"],
      metrics: { keywords: 89, avgPosition: 15.7, traffic: 5670 },
    },
    {
      id: "3",
      name: "Quarterly Review - Tech Blog",
      type: "Quarterly",
      project: "Tech Blog",
      lastGenerated: "2024-01-01",
      status: "Scheduled",
      recipients: ["editor@techblog.io", "seo@techblog.io"],
      metrics: { keywords: 234, avgPosition: 6.3, traffic: 8920 },
    },
  ];

  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating report:", reportForm);
    setReportForm({ name: "", type: "monthly", projects: [], recipients: "" });
    setShowCreateModal(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Sent: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Scheduled: "bg-blue-100 text-blue-800",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Create and manage client reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Sent This Month
              </p>
              <p className="text-2xl font-bold text-secondary-600">
                {reports.filter((r) => r.status === "Sent").length}
              </p>
            </div>
            <Mail className="h-8 w-8 text-secondary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-accent-600">
                {reports.filter((r) => r.status === "Scheduled").length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-accent-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter((r) => r.status === "Draft").length}
              </p>
            </div>
            <Edit className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Reports</h2>
            <div className="flex items-center space-x-4">
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                <option>All Projects</option>
                <option>E-commerce Store</option>
                <option>Local Business</option>
                <option>Tech Blog</option>
              </select>
              <button className="text-gray-400 hover:text-gray-600">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {report.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {report.metrics.keywords} keywords • Avg pos:{" "}
                        {report.metrics.avgPosition}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {report.project}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {report.recipients.length} recipient
                      {report.recipients.length !== 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors" onClick={() => navigate("/agency/report")}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Create New Report
            </h2>
            <form onSubmit={handleCreateReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportForm.name}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Monthly SEO Report - Client Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select
                  value={reportForm.type}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, type: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projects
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option>E-commerce Store</option>
                  <option>Local Business</option>
                  <option>Tech Blog</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple projects
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Recipients
                </label>
                <textarea
                  value={reportForm.recipients}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, recipients: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="client@example.com&#10;manager@agency.com"
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
                  Create Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
