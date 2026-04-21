"use client";

import { CSSProperties, ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardShellConfig } from "@/types/dashboardTypes";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

type DashboardFrameProps = {
  config: DashboardShellConfig;
  children: ReactNode;
  headerTitle?: string;
  headerDescription?: string;
};

export default function DashboardFrame({
  config,
  children,
  headerTitle,
  headerDescription,
}: DashboardFrameProps) {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as CSSProperties
        }
        className="dashboard-theme h-svh overflow-hidden"
      >
        <AppSidebar data={config} variant="inset" />
        <SidebarInset className="flex h-svh min-h-0 flex-col overflow-hidden">
          <SiteHeader
            title={headerTitle ?? config.headerTitle}
            description={headerDescription ?? config.headerDescription}
          />
          <main className="min-h-0 flex-1 overflow-y-auto bg-background animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
