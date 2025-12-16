// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MainLayout } from "@/layout/MainLayout";
import LoginPage from "@/pages/Login/Login";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import Payment from "@/pages/VarianceQueue/VarianceQueue";
import CashPostingPage from "@/pages/CashPosting Report/CashPostingPage";
import CashPostingQueue from "@/pages/CashPosting Queue/CashPostingQueue";
import ReconciledReport from "@/pages/ReconciledReport/ReconciledReport";
import Dashboard1 from "@/pages/RCMDashboard/RCMDashboard";
import Dashboard2 from "@/pages/HCDDashboard/HCDDashboard";
import RemittanceProcessing from "@/pages/Remittance Processing/RemittanceProcessing";
import EOBParser from "@/pages/EOB Parser/EOBParser";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/variance-queue" element={<Payment />} />
          <Route path="/cash-posting" element={<CashPostingPage />} />
          <Route path="/cash-posting-queue" element={<CashPostingQueue />} />
          <Route path="/reconciled-report" element={<ReconciledReport />} />
          <Route path="/dashboard/rcm-dashboard" element={<Dashboard1 />} />
          <Route path="/dashboard/hcd-dashboard" element={<Dashboard2 />} />
          <Route path="/era-parser" element={<RemittanceProcessing />} />
          <Route path="/eob-parser" element={<EOBParser />} />
        </Route>
      </Route>

      {/* Catch-All */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
