// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = true; // or use context/zustand

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
