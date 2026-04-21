"use client";

import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { DashboardShellConfig } from "@/types/dashboardTypes";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoonIcon, Settings2Icon, SunIcon } from "lucide-react";

type DashboardSettingsProps = {
  config: DashboardShellConfig;
};

export default function DashboardSettings({ config }: DashboardSettingsProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardFrame
      config={config}
      headerTitle="Settings"
      headerDescription="Manage dashboard appearance and preferences"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6 h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card className="border-border/70">
            <CardHeader className="gap-2">
              <CardTitle className="flex items-center gap-2">
                <Settings2Icon className="size-4" />
                Dashboard Settings
              </CardTitle>
              <CardDescription>
                Choose your preferred dashboard color mode.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="appearance">
                <TabsList>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="appearance" className="mt-4 space-y-4">
                  <Card className="border-border/70 bg-card/80 shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Theme Mode</CardTitle>
                      <CardDescription>
                        Use one button to switch your dashboard color mode.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Current mode:{" "}
                        <span className="font-medium text-foreground">
                          {theme === "dark" ? "Dark" : "Light"}
                        </span>
                      </p>
                      <Button
                        type="button"
                        onClick={(e) => {
                          const nextTheme = theme === "dark" ? "light" : "dark";
                          toggleTheme(e);
                          toast.success(`Theme changed to ${nextTheme} mode`);
                        }}
                        className="w-full sm:w-auto"
                      >
                        {theme === "dark" ? (
                          <SunIcon className="size-4" />
                        ) : (
                          <MoonIcon className="size-4" />
                        )}
                        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="mt-4">
                  <Card className="border-border/70 bg-card/80 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        More Settings Soon
                      </CardTitle>
                      <CardDescription>
                        Notification, language, and privacy controls can be
                        added here next.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFrame>
  );
}
