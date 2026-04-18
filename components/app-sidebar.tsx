"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { DashboardShellConfig } from "@/types/dashboardTypes";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CommandIcon, LogOutIcon } from "lucide-react";
import { clearStoredBasicToken } from "@/lib/admin-auth";

export function AppSidebar({
  data,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  data: DashboardShellConfig;
}) {
  const router = useRouter();

  const handleLogout = () => {
    clearStoredBasicToken();
    router.push("/login");
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href={data.appUrl}>
                {data.appIcon ?? <CommandIcon className="size-5!" />}
                <span className="text-base font-semibold">{data.appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} quickAction={data.quickAction} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full justify-start gap-2"
        >
          <LogOutIcon className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
