import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import {
  BarChart3,
  Home,
  FolderOpen,
  Search,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  Users,
  Building2,
  Target,
  Menu,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout() as any);
    navigate("/login");
  };

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/agency/dashboard",
      roles: ["ADMIN", "AGENCY", "WORKER"],
    },
    {
      icon: FolderOpen,
      label: "Projects",
      path: "/agency/projects",
      roles: ["ADMIN", "AGENCY", "WORKER"],
    },
    {
      icon: Search,
      label: "Keywords",
      path: "/agency/keywords",
      roles: ["ADMIN", "AGENCY", "WORKER"],
    },
    {
      icon: Target,
      label: "Rankings",
      path: "/agency/rankings",
      roles: ["ADMIN", "AGENCY", "WORKER"],
    },
    {
      icon: FileText,
      label: "Reports",
      path: "/agency/reports",
      roles: ["ADMIN", "AGENCY"],
    },
    {
      icon: Building2,
      label: "Agencies",
      path: "/agency/agencies",
      roles: ["ADMIN"],
    },
    {
      icon: Users,
      label: "Team",
      path: "/agency/team",
      roles: ["ADMIN", "AGENCY"],
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/agency/settings",
      roles: ["ADMIN", "AGENCY", "WORKER"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-gray-900 h-screen flex flex-col transition-all duration-300 fixed left-0 top-0 z-30`}
    >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-40">
        <button
          onClick={onToggle}
          className="bg-white border border-gray-200 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          {collapsed ? (
            <Menu className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Logo */}
      <div
        className={`${
          collapsed ? "p-4" : "p-6"
        } border-b border-gray-700 transition-all duration-300`}
      >
        <div className="flex items-center space-x-3">
          <BarChart3
            className={`${
              collapsed ? "h-6 w-6" : "h-8 w-8"
            } text-primary-400 text-white transition-all duration-300`}
          />
          {!collapsed && (
            <div className="transition-opacity duration-300">
              <h1 className="text-lg font-bold text-white">SEO Dashboard</h1>
              <p className="text-xs text-gray-400">{user?.role} Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 ${
          collapsed ? "p-2" : "p-4"
        } transition-all duration-300`}
      >
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "agency/dashboard" &&
                location.pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${
                    collapsed
                      ? "justify-center px-2 py-3"
                      : "space-x-3 px-4 py-3"
                  } rounded-lg text-left transition-all duration-300 ${
                    isActive
                      ? "bg-primary-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  } group relative`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={`${
                      collapsed ? "h-5 w-5" : "h-5 w-5"
                    } transition-all duration-300`}
                  />
                  {!collapsed && (
                    <span className="font-medium transition-opacity duration-300">
                      {item.label}
                    </span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div
        className={`${
          collapsed ? "p-2" : "p-4"
        } border-t border-gray-700 transition-all duration-300`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center mb-2" : "space-x-3 mb-4"
          } transition-all duration-300`}
        >
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.name?.charAt(0) || user?.email?.charAt(0)}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 transition-opacity duration-300">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            collapsed ? "justify-center px-2 py-2" : "space-x-3 px-4 py-2"
          } text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300 group relative`}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && (
            <span className="text-sm transition-opacity duration-300">
              Sign out
            </span>
          )}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Sign out
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
