import type {DashboardShellConfig} from "@/types/dashboardTypes";
import {resolveDashboardUser} from "@/lib/dashboard-data";
import type {AuthResponse} from "@/types/auth";
import {
    BedDoubleIcon,
    BookCheckIcon,
    CalendarCheck2Icon,
    ClipboardListIcon,
    CommandIcon,
    CreditCardIcon,
    LayoutDashboardIcon,
    Settings2Icon,
    StarIcon,
    UserRoundIcon, Warehouse,
} from "lucide-react";

export const adminDashboardConfig: DashboardShellConfig = {
    appName: "CamHotel Admin",
    appUrl: "/",
    appIcon: <CommandIcon className="size-5!"/>,
    headerTitle: "Admin Overview",
    headerDescription: "Full operations dashboard for management and controls",
    user: {
        name: "Admin User",
        email: "admin@camhotel.com",
        avatar: "/avatars/shadcn.jpg",
    },
    quickAction: {
        title: "Manage Bookings",
        url: "/admin/bookings",
        showEmailIcon: false,
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: <LayoutDashboardIcon/>,
        },
        {
            title: "Rooms",
            url: "/admin/rooms",
            icon: <BedDoubleIcon/>,
        },
        {
            title: "Room Types",
            url: "/admin/room-types",
            icon: <ClipboardListIcon/>,
        },
        {
            title: "Bookings",
            url: "/admin/bookings",
            icon: <CalendarCheck2Icon/>,
        },
        {
            title: "Payments",
            url: "/admin/payments",
            icon: <CreditCardIcon/>,
        },
        {
            title: "Facilities",
            url: "/admin/facilities",
            icon: <Warehouse/>,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: <UserRoundIcon/>,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: <Settings2Icon/>,
        },
    ],
    navSecondary: [],
    documents: [],
};

export const staffDashboardConfig: DashboardShellConfig = {
    appName: "CamHotel Staff",
    appUrl: "/staff",
    appIcon: <CommandIcon className="size-5!"/>,
    headerTitle: "Staff Operations",
    headerDescription: "Manage daily tasks and reservation workflows",
    user: {
        name: "Staff User",
        email: "staff@camhotel.com",
        avatar: "/avatars/shadcn.jpg",
    },
    quickAction: {
        title: "Open Queue",
        url: "/staff/bookings",
        showEmailIcon: false,
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/staff",
            icon: <LayoutDashboardIcon/>,
        },
        {
            title: "Bookings",
            url: "/staff/bookings",
            icon: <BookCheckIcon/>,
        },
        {
            title: "Rooms",
            url: "/staff/rooms",
            icon: <BedDoubleIcon/>,
        },
        {
            title: "Payments",
            url: "/staff/payments",
            icon: <CreditCardIcon/>,
        },
        {
            title: "Settings",
            url: "/staff/settings",
            icon: <Settings2Icon/>,
        },
    ],
    navSecondary: [],
    documents: [],
};

export const customerDashboardConfig: DashboardShellConfig = {
    appName: "CamHotel Guest",
    appUrl: "/",
    appIcon: <CommandIcon className="size-5!"/>,
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
            icon: <LayoutDashboardIcon/>,
        },
        {
            title: "My Bookings",
            url: "/customer/mybookings",
            icon: <BookCheckIcon/>,
        },
        {
            title: "Profile",
            url: "/customer/profile",
            icon: <UserRoundIcon/>,
        },
        {
            title: "My Rating",
            url: "/customer/rating",
            icon: <StarIcon/>,
        },
        {
            title: "Settings",
            url: "/customer/settings",
            icon: <Settings2Icon/>,
        },
    ],
    navSecondary: [],
    documents: [],
};

function withResolvedUser(
    config: DashboardShellConfig,
    profile?: AuthResponse,
): DashboardShellConfig {
    return {
        ...config,
        user: resolveDashboardUser(profile, config.user),
    };
}

export function getAdminDashboardConfig(
    profile?: AuthResponse,
): DashboardShellConfig {
    return withResolvedUser(adminDashboardConfig, profile);
}

export function getStaffDashboardConfig(
    profile?: AuthResponse,
): DashboardShellConfig {
    return withResolvedUser(staffDashboardConfig, profile);
}

export function getCustomerDashboardConfig(
    profile?: AuthResponse,
): DashboardShellConfig {
    return withResolvedUser(customerDashboardConfig, profile);
}
