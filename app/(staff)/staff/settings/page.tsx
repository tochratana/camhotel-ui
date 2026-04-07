import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { staffDashboardConfig } from "@/components/dashboard/role-config";

export default function StaffSettingsPage() {
  return <DashboardSettings config={staffDashboardConfig} />;
}

