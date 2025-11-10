// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MainLayout } from "@/layout/MainLayout";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import Payment from "@/pages/Payment/Payment";
// import SettingsPage from "@/pages/settings/SettingsPage";
import LoginPage from "@/pages/Login/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Route>
      {/* Catch-All */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
};
