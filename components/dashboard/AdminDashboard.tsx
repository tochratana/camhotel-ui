"use client";

import DashboardShell from "@/components/dashboard/dashboard";
import { adminDashboardConfig } from "@/components/dashboard/role-config";
import data from "@/components/data/data.json";

export default function AdminDashboard() {
  return <DashboardShell config={adminDashboardConfig} data={data} />;
}
