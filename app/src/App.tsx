import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { checkAuth } from "./store/slices/authSlice";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/Admin/AdminDashboardPage";
import WorkerDashboard from "./pages/Worker/WorkerDashboardPage";
import DashboardLayout from "./components/DashboardLayout";
import ClientsPage from "./pages/ClientsPage";
import KeywordsPage from "./pages/KeywordsPage";
import RankingsPage from "./pages/RankingPage";
import ReportsPage from "./pages/ReportsPage";
import TeamPage from "./pages/TeamPage";
import SettingsPage from "./pages/SettingsPage";
import TasksPage from "./pages/TasksPage";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import AgencyDashboardPage from "./pages/Agency/AgencyDashboardPage";
import AgenciesPage from "./pages/SuperAdmin/AgenciesPage";
import ReportPage from "./pages/ReportPage";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkAuth() as any);
    }
  }, [dispatch]);

  // Only show loading on initial app load, not during auth operations
  const isInitialLoad = loading && !user && !localStorage.getItem("token");

  // if (isInitialLoad) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
  //         <p className="text-gray-500">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Role-based dashboard URLs
  const dashboardUrls = {
    SUPER_ADMIN: "/superadmin/dashboard",
    ADMIN: "/admin/dashboard",
    AGENCY: "/agency/dashboard",
    WORKER: "/worker/dashboard",
  };

  // Agency routes with DashboardLayout
  const superAdminRoutes = [
    { path: "/superadmin/dashboard", component: SuperAdminDashboard },
    { path: "/superadmin/clients", component: ClientsPage },
    { path: "/superadmin/agencies/myagency", component: AgencyDashboardPage },
    { path: "/superadmin/agencies/allagencies", component: AgenciesPage },
    { path: "/superadmin/tasks", component: TasksPage },
    { path: "/superadmin/settings", component: SettingsPage },
  ];

  // Agency routes with DashboardLayout
  const agencyRoutes = [
    { path: "/agency/dashboard", component: AgencyDashboardPage },
    { path: "/agency/clients", component: ClientsPage },
    { path: "/agency/tasks", component: TasksPage },
    { path: "/agency/keywords", component: KeywordsPage },
    { path: "/agency/rankings", component: RankingsPage },
    { path: "/agency/reports", component: ReportsPage },
    { path: "/agency/report", component: ReportPage },
    { path: "/agency/team", component: TeamPage },
    { path: "/agency/settings", component: SettingsPage },
  ];

  // Agency routes with DashboardLayout
  const workerRoutes = [
    { path: "/worker/dashboard", component: WorkerDashboard },
    { path: "/worker/myagency", component: AgencyDashboardPage },
    { path: "/worker/tasks", component: TasksPage },
    { path: "/worker/settings", component: SettingsPage },
  ];

  const getRedirectUrl = () => {
    if (!user) return "/login";
    return dashboardUrls[user.role as keyof typeof dashboardUrls] || "/login";
  };

  return (
    <Routes>
      {/* Auth routes - only redirect if user is authenticated and verified */}
      <Route
        path="/login"
        element={
          user && user.verified ? (
            <Navigate to={getRedirectUrl()} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/register"
        element={
          user && user.verified ? (
            <Navigate to={getRedirectUrl()} replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Super Admin routes */}
      {superAdminRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            !user || !user.verified ? (
              <Navigate to="/login" replace />
            ) : user.role !== "SUPER_ADMIN" ? (
              <Navigate to={getRedirectUrl()} replace />
            ) : (
              <DashboardLayout>
                <Component />
              </DashboardLayout>
            )
          }
        />
      ))}

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          !user || !user.verified ? (
            <Navigate to="/login" replace />
          ) : user.role !== "ADMIN" ? (
            <Navigate to={getRedirectUrl()} replace />
          ) : (
            <AdminDashboard />
          )
        }
      />

      {workerRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            !user || !user.verified ? (
              <Navigate to="/login" replace />
            ) : user.role !== "WORKER" ? (
              <Navigate to={getRedirectUrl()} replace />
            ) : (
              <DashboardLayout>
                <Component />
              </DashboardLayout>
            )
          }
        />
      ))}


      {/* Agency routes */}
      {agencyRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            !user || !user.verified ? (
              <Navigate to="/login" replace />
            ) : user.role !== "AGENCY" ? (
              <Navigate to={getRedirectUrl()} replace />
            ) : (
              <DashboardLayout>
                <Component />
              </DashboardLayout>
            )
          }
        />
      ))}

      {/* Root redirect */}
      <Route path="/" element={<Navigate to={getRedirectUrl()} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
