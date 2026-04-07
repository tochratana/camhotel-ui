"use client";

import DashboardShell from "@/components/dashboard/dashboard";
import { customerDashboardConfig } from "@/components/dashboard/role-config";
import data from "@/components/data/data.json";

export default function CustomerDashboard() {
  return <DashboardShell config={customerDashboardConfig} data={data} />;
}
