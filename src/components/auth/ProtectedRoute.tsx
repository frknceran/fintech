import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
