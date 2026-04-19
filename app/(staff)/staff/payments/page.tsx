"use client";

import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getStaffDashboardConfig } from "@/components/dashboard/role-config";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import PaymentManagement from "@/components/dashboard/PaymentManagement";

export default function StaffPaymentsPage() {
  const profileQuery = useGetCurrentUserQuery();
  const config = getStaffDashboardConfig(profileQuery.data?.data);

  return (
    <DashboardFrame 
      config={config}
      headerTitle="Payment Operations"
      headerDescription="Manage transactions and guest payments"
    >
      <PaymentManagement isStaff />
    </DashboardFrame>
  );
}
