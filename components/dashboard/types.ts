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
