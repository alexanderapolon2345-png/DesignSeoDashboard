import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchKeywords, addKeyword } from "@/store/slices/clientSlice";
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

const KeywordsPage = () => {
  const dispatch = useDispatch();
  // const { keywords, loading } = useSelector(
  //   (state: RootState) => state.project
  // );
  const [showAddModal, setShowAddModal] = useState(false);
  const [keywordForm, setKeywordForm] = useState({
    keyword: "",
    searchVolume: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for demo
  const mockKeywords = [
    {
      id: "1",
      keyword: "seo services",
      position: 3,
      previousPosition: 5,
      searchVolume: 8100,
      difficulty: 65,
      url: "/seo-services",
      project: "E-commerce Store",
    },
    {
      id: "2",
      keyword: "digital marketing",
      position: 7,
      previousPosition: 6,
      searchVolume: 12100,
      difficulty: 72,
      url: "/digital-marketing",
      project: "E-commerce Store",
    },
    {
      id: "3",
      keyword: "content marketing",
      position: 12,
      previousPosition: 12,
      searchVolume: 5400,
      difficulty: 58,
      url: "/content-marketing",
      project: "Local Business",
    },
    {
      id: "4",
      keyword: "link building",
      position: 5,
      previousPosition: 8,
      searchVolume: 2900,
      difficulty: 68,
      url: "/link-building",
      project: "Tech Blog",
    },
    {
      id: "5",
      keyword: "local seo",
      position: 2,
      previousPosition: 3,
      searchVolume: 3600,
      difficulty: 45,
      url: "/local-seo",
      project: "Local Business",
    },
    {
      id: "6",
      keyword: "technical seo",
      position: 15,
      previousPosition: 18,
      searchVolume: 1800,
      difficulty: 62,
      url: "/technical-seo",
      project: "Tech Blog",
    },
    {
      id: "7",
      keyword: "seo audit",
      position: 8,
      previousPosition: 11,
      searchVolume: 4200,
      difficulty: 55,
      url: "/seo-audit",
      project: "E-commerce Store",
    },
    {
      id: "8",
      keyword: "keyword research",
      position: 4,
      previousPosition: 4,
      searchVolume: 6700,
      difficulty: 48,
      url: "/keyword-research",
      project: "Tech Blog",
    },
  ];

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, would dispatch addKeyword with projectId
    console.log("Adding keyword:", keywordForm);
    setKeywordForm({ keyword: "", searchVolume: 0 });
    setShowAddModal(false);
  };

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current; // Positive means improvement (lower position number)
    return change;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (change < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-500";
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return "text-red-600 bg-red-50";
    if (difficulty >= 50) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const filteredKeywords = mockKeywords.filter((keyword) => {
    const matchesSearch = keyword.keyword
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "top10")
      return matchesSearch && keyword.position <= 10;
    if (filterStatus === "improving")
      return (
        matchesSearch &&
        getPositionChange(keyword.position, keyword.previousPosition) > 0
      );
    if (filterStatus === "declining")
      return (
        matchesSearch &&
        getPositionChange(keyword.position, keyword.previousPosition) < 0
      );
    return matchesSearch;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Keywords</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your keyword rankings
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Keywords</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Keywords
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockKeywords.length}
              </p>
            </div>
            <Search className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Top 10 Rankings
              </p>
              <p className="text-2xl font-bold text-secondary-600">
                {mockKeywords.filter((k) => k.position <= 10).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-secondary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Position</p>
              <p className="text-2xl font-bold text-gray-900">
                {(
                  mockKeywords.reduce((sum, k) => sum + k.position, 0) /
                  mockKeywords.length
                ).toFixed(1)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockKeywords
                  .reduce((sum, k) => sum + k.searchVolume, 0)
                  .toLocaleString()}
              </p>
            </div>
            <Search className="h-8 w-8 text-primary-600" />
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
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Keywords</option>
              <option value="top10">Top 10</option>
              <option value="improving">Improving</option>
              <option value="declining">Declining</option>
            </select>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredKeywords.map((keyword) => {
                const change = getPositionChange(
                  keyword.position,
                  keyword.previousPosition
                );
                return (
                  <tr key={keyword.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {keyword.keyword}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        #{keyword.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`flex items-center space-x-1 text-sm ${getChangeColor(
                          change
                        )}`}
                      >
                        {getChangeIcon(change)}
                        <span>
                          {change > 0 ? "+" : ""}
                          {change}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {keyword.searchVolume.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                          keyword.difficulty
                        )}`}
                      >
                        {keyword.difficulty}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{keyword.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {keyword.project}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Keyword Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Add Keywords
            </h2>
            <form onSubmit={handleAddKeyword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (one per line)
                </label>
                <textarea
                  value={keywordForm.keyword}
                  onChange={(e) =>
                    setKeywordForm({ ...keywordForm, keyword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={5}
                  placeholder="seo services&#10;digital marketing&#10;content strategy"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>E-commerce Store</option>
                  <option>Local Business</option>
                  <option>Tech Blog</option>
                </select>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add Keywords
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordsPage;
