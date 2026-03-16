// src/components/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function PublicRoute() {
  const user = useAuth();
  console.log(user);
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
