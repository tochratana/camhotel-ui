"use client";

import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { adminDashboardConfig } from "@/components/dashboard/role-config";
import PaymentManagement from "@/components/dashboard/PaymentManagement";

export default function AdminPaymentsPage() {
  return (
    <DashboardFrame 
      config={adminDashboardConfig}
      headerTitle="Payment Management"
      headerDescription="Monitor and manage all hotel transactions"
    >
      <PaymentManagement />
    </DashboardFrame>
  );
}
