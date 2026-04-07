import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { adminDashboardConfig } from "@/components/dashboard/role-config";

export default function AdminSettingsPage() {
  return <DashboardSettings config={adminDashboardConfig} />;
}

