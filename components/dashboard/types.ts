import { ReactNode } from "react";

export type DashboardLinkItem = {
  title: string;
  url: string;
  icon: ReactNode;
};

export type DashboardDocumentItem = {
  name: string;
  url: string;
  icon: ReactNode;
};

export type DashboardUser = {
  name: string;
  email: string;
  avatar: string;
};

export type DashboardQuickAction = {
  title: string;
  url: string;
  showEmailIcon?: boolean;
};

export type DashboardShellConfig = {
  appName: string;
  appUrl: string;
  appIcon?: ReactNode;
  headerTitle: string;
  headerDescription?: string;
  user: DashboardUser;
  navMain: DashboardLinkItem[];
  navSecondary: DashboardLinkItem[];
  documents: DashboardDocumentItem[];
  quickAction?: DashboardQuickAction;
};

export type MetricTrend = "up" | "down" | "flat";

export type DashboardMetricCard = {
  title: string;
  value: string;
  changeLabel: string;
  trend: MetricTrend;
  context: string;
};

export type DashboardChartPoint = {
  date: string;
  desktop: number;
  mobile: number;
};

export type DashboardTableRow = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};
