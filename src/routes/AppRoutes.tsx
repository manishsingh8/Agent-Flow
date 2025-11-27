// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MainLayout } from "@/layout/MainLayout";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import Payment from "@/pages/VarianceQueue/VarianceQueue";
import CashPostingPage from "@/pages/CashPosting Report/CashPostingPage";
import CashPostingQueue from "@/pages/CashPosting Queue/CashPostingQueue";
import ReconciledReport from "@/pages/ReconciledReport/ReconciledReport";
// import SettingsPage from "@/pages/settings/SettingsPage";
import LoginPage from "@/pages/Login/Login";
import Dashboard1 from "@/pages/RCMDashboard/RCMDashboard";
import Dashboard2 from "@/pages/HCDDashboard/HCDDashboard";
import RemittanceProcessing from "@/pages/Remittance Processing/RemittanceProcessing";

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
          <Route path="/variance-queue" element={<Payment />} />
          <Route path="/cash-posting" element={<CashPostingPage />} />
          <Route path="/cash-posting-queue" element={<CashPostingQueue />} />
          <Route path="/reconciled-report" element={<ReconciledReport />} />
          <Route path="/dashboard/rcm-dashboard" element={<Dashboard1 />} />
          <Route path="/dashboard/hcd-dashboard" element={<Dashboard2 />} />
          <Route path="/era-parser" element={<RemittanceProcessing />} />
        </Route>
      </Route>
      {/* Catch-All */}
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
};
