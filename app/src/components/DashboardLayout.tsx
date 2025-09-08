import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/agency/dashboard") return "Dashboard";
    if (path === "/agency/projects") return "Projects";
    if (path === "/agency/keywords") return "Keywords";
    if (path === "/agency/rankings") return "Rankings";
    if (path === "/agency/reports") return "Reports";
    if (path === "/agency/team") return "Team";
    if (path === "/agency/settings") return "Settings";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
