"use client";

import DashboardShell from "@/components/dashboard/dashboard";
import { staffDashboardConfig } from "@/components/dashboard/role-config";
import data from "@/components/data/data.json";

export default function StaffDashboard() {
  return <DashboardShell config={staffDashboardConfig} data={data} />;
}
