// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export default function PrivateRoute() {
  const user = useAuth();
  return user ? <Outlet /> : <Navigate to="/" replace />;
}
