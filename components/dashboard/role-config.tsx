import { DashboardShellConfig } from "@/components/dashboard/types";
import {
  BedDoubleIcon,
  BookCheckIcon,
  CalendarCheck2Icon,
  CircleHelpIcon,
  ClipboardListIcon,
  CommandIcon,
  ContactIcon,
  FileChartColumnIcon,
  FileIcon,
  LayoutDashboardIcon,
  SearchIcon,
  Settings2Icon,
  UserRoundIcon,
} from "lucide-react";

const baseSecondary = [
  {
    title: "Get Help",
    url: "/contact",
    icon: <CircleHelpIcon />,
  },
  {
    title: "Search",
    url: "/rooms",
    icon: <SearchIcon />,
  },
];

export const adminDashboardConfig: DashboardShellConfig = {
  appName: "CamHotel Admin",
  appUrl: "/admin",
  appIcon: <CommandIcon className="size-5!" />,
  headerTitle: "Admin Overview",
  headerDescription: "Full operations dashboard for management and controls",
  user: {
    name: "Admin User",
    email: "admin@camhotel.com",
    avatar: "/avatars/shadcn.jpg",
  },
  quickAction: {
    title: "Add Room",
    url: "/dashboard/rooms",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Rooms",
      url: "/dashboard/rooms",
      icon: <BedDoubleIcon />,
    },
    {
      title: "Room Types",
      url: "/dashboard/roomtype",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Bookings",
      url: "/dashboard/booking",
      icon: <CalendarCheck2Icon />,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings2Icon />,
    },
  ],
  navSecondary: baseSecondary,
  documents: [
    {
      name: "Operations Reports",
      url: "/dashboard/booking",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Room Catalog",
      url: "/dashboard/rooms",
      icon: <FileIcon />,
    },
  ],
};

export const staffDashboardConfig: DashboardShellConfig = {
  appName: "CamHotel Staff",
  appUrl: "/staff",
  appIcon: <CommandIcon className="size-5!" />,
  headerTitle: "Staff Operations",
  headerDescription: "Manage daily tasks and reservation workflows",
  user: {
    name: "Staff User",
    email: "staff@camhotel.com",
    avatar: "/avatars/shadcn.jpg",
  },
  quickAction: {
    title: "View Queue",
    url: "/bookings",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/staff",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: <BookCheckIcon />,
    },
    {
      title: "Rooms",
      url: "/rooms",
      icon: <BedDoubleIcon />,
    },
    {
      title: "Support",
      url: "/contact",
      icon: <ContactIcon />,
    },
    {
      title: "Settings",
      url: "/staff/settings",
      icon: <Settings2Icon />,
    },
  ],
  navSecondary: baseSecondary,
  documents: [
    {
      name: "Today Schedule",
      url: "/bookings",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Service Notes",
      url: "/contact",
      icon: <FileIcon />,
    },
  ],
};

export const customerDashboardConfig: DashboardShellConfig = {
  appName: "CamHotel Guest",
  appUrl: "/customer",
  appIcon: <CommandIcon className="size-5!" />,
  headerTitle: "My Dashboard",
  headerDescription: "Track your stays and manage your account quickly",
  user: {
    name: "Guest User",
    email: "guest@camhotel.com",
    avatar: "/avatars/shadcn.jpg",
  },
  quickAction: {
    title: "Book Room",
    url: "/rooms",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/customer",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Bookings",
      url: "/bookings",
      icon: <BookCheckIcon />,
    },
    {
      title: "Rooms",
      url: "/rooms",
      icon: <BedDoubleIcon />,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <UserRoundIcon />,
    },
    {
      title: "Settings",
      url: "/customer/settings",
      icon: <Settings2Icon />,
    },
  ],
  navSecondary: baseSecondary,
  documents: [
    {
      name: "Booking History",
      url: "/bookings",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Account Notes",
      url: "/profile",
      icon: <FileIcon />,
    },
  ],
};
