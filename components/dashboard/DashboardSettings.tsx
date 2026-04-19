"use client";

import { ReactNode } from "react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { DashboardShellConfig } from "@/types/dashboardTypes";
import { Theme, useTheme } from "@/components/theme/ThemeProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Badge } from "@/components/ui/badge";
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
import {
  CheckIcon,
  MoonIcon,
  PaletteIcon,
  Settings2Icon,
  SunIcon,
} from "lucide-react";

type DashboardSettingsProps = {
  config: DashboardShellConfig;
};

type ThemeOption = {
  value: Theme;
  title: string;
  description: string;
  icon: ReactNode;
};

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    title: "Light Theme",
    description: "Clean and bright for daytime operations.",
    icon: <SunIcon className="size-4" />,
  },
  {
    value: "dark",
    title: "Dark Theme",
    description: "Comfortable low-glare look for long sessions.",
    icon: <MoonIcon className="size-4" />,
  },
];

export default function DashboardSettings({ config }: DashboardSettingsProps) {
  const { theme, setTheme, toggleTheme } = useTheme();

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
                  <div className="grid gap-4 md:grid-cols-2">
                    {themeOptions.map((option) => {
                      const isActive = theme === option.value;
                      return (
                        <Card
                          key={option.value}
                          className="border-border/70 bg-card/80 shadow-none"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center justify-between text-sm">
                              <span className="inline-flex items-center gap-2">
                                {option.icon}
                                {option.title}
                              </span>
                              {isActive ? <Badge>Active</Badge> : null}
                            </CardTitle>
                            <CardDescription>
                              {option.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button
                              type="button"
                              variant={isActive ? "default" : "outline"}
                              onClick={() => {
                                setTheme(option.value);
                                toast.success(`Theme changed to ${option.value} mode`);
                              }}
                              className="w-full"
                            >
                              {isActive ? (
                                <>
                                  <CheckIcon />
                                  Selected
                                </>
                              ) : (
                                <>
                                  <PaletteIcon />
                                  Use {option.value}
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Card className="border-border/70 bg-card/80 shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Quick Toggle</CardTitle>
                      <CardDescription>
                        Switch instantly with one tap.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">
                        Current mode:{" "}
                        <span className="font-medium text-foreground">
                          {theme === "dark" ? "Dark" : "Light"}
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            toggleTheme();
                            toast.success("Theme toggled successfully");
                          }}
                        >
                          Toggle
                        </Button>
                      </div>
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
