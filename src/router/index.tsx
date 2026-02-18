import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Maintenance from "@/pages/maintenance/Maintenance";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes: require auth, single layout for sidebar + navbar */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Maintenance />} />
          <Route path="invoices" element={<Maintenance />} />
          <Route path="wallets" element={<Maintenance />} />
          <Route path="settings" element={<Maintenance />} />
        </Route>
      </Route>

      <Route path="/maintenance" element={<Maintenance />} />
    </Routes>
  );
};

export default AppRouter;
