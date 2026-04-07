import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { customerDashboardConfig } from "@/components/dashboard/role-config";

export default function CustomerSettingsPage() {
  return <DashboardSettings config={customerDashboardConfig} />;
}

