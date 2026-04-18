import type {
  DashboardChartPoint,
  DashboardMetricCard,
  DashboardTableRow,
  DashboardUser,
} from "@/types/dashboardTypes";
import { resolveMediaUrl } from "@/lib/media-url";
import type { AuthResponse, UserResponse } from "@/types/auth";
import type { BookingResponse, RoomResponse, RoomTypeResponse } from "@/types/hotel";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function percentLabel(current: number, base: number): {
  label: string;
  trend: "up" | "down" | "flat";
} {
  if (base <= 0) {
    return { label: "Live", trend: "flat" };
  }

  const diff = ((current - base) / base) * 100;
  if (Math.abs(diff) < 0.5) {
    return { label: "0%", trend: "flat" };
  }

  const rounded = Math.round(diff * 10) / 10;
  return {
    label: `${rounded > 0 ? "+" : ""}${rounded}%`,
    trend: rounded > 0 ? "up" : "down",
  };
}

function aggregateBookingsChart(
  bookings: BookingResponse[],
  countStatuses?: string[],
): DashboardChartPoint[] {
  const grouped = new Map<string, { desktop: number; mobile: number }>();

  bookings.forEach((booking) => {
    const primaryDate = booking.checkInDate ?? booking.createdAt?.slice(0, 10);
    if (!primaryDate) return;

    const row = grouped.get(primaryDate) ?? { desktop: 0, mobile: 0 };
    row.desktop += 1;
    if (!countStatuses || countStatuses.includes(booking.status)) {
      row.mobile += 1;
    }
    grouped.set(primaryDate, row);
  });

  const chartData = [...grouped.entries()]
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, value]) => ({
      date,
      desktop: value.desktop,
      mobile: value.mobile,
    }));

  if (chartData.length > 0) return chartData;

  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - index));
    const isoDate = d.toISOString().slice(0, 10);
    return { date: isoDate, desktop: 0, mobile: 0 };
  });
}

function roomRows(rooms: RoomResponse[], startId = 1): DashboardTableRow[] {
  return rooms.map((room, index) => ({
    id: startId + index,
    header: `Room ${room.roomNumber}`,
    type: room.roomType?.name ?? "Room",
    status: toTitleCase(room.status ?? "AVAILABLE"),
    target: formatCurrency(room.currentPrice ?? 0),
    limit: `Floor ${room.floorNumber ?? "-"}`,
    reviewer:
      typeof room.rating === "number" && room.rating > 0
        ? `${room.rating.toFixed(1)}★`
        : "No rating",
  }));
}

function bookingRows(bookings: BookingResponse[], startId = 1): DashboardTableRow[] {
  return bookings.map((booking, index) => ({
    id: startId + index,
    header: `Booking #${booking.id}`,
    type: booking.room?.roomType?.name ?? "Reservation",
    status: toTitleCase(booking.status),
    target: formatCurrency(booking.totalPrice ?? 0),
    limit: `${booking.checkInDate} → ${booking.checkOutDate}`,
    reviewer: booking.user?.fullName ?? "Guest",
  }));
}

function userRows(users: UserResponse[], startId = 1): DashboardTableRow[] {
  return users.map((user, index) => ({
    id: startId + index,
    header: user.fullName,
    type: user.role?.name ?? "USER",
    status: user.isDeleted ? "Archived" : "Active",
    target: user.email,
    limit: user.phoneNumber ?? "No phone",
    reviewer: "Admin",
  }));
}

export function resolveDashboardUser(
  profile: AuthResponse | undefined,
  fallback: DashboardUser,
): DashboardUser {
  return {
    name: profile?.fullName ?? fallback.name,
    email: profile?.email ?? fallback.email,
    avatar: resolveMediaUrl(profile?.profileImage) || fallback.avatar,
  };
}

export function buildAdminDashboardData(input: {
  rooms: RoomResponse[];
  roomTotal: number;
  roomTypes: RoomTypeResponse[];
  roomTypeTotal: number;
  users: UserResponse[];
  userTotal: number;
  bookings: BookingResponse[];
  bookingTotal: number;
}): {
  cards: DashboardMetricCard[];
  chart: DashboardChartPoint[];
  rows: DashboardTableRow[];
} {
  const availableRooms = input.rooms.filter((room) => room.status === "AVAILABLE").length;
  const occupiedRooms = input.rooms.filter((room) => room.status === "OCCUPIED").length;
  const pendingBookings = input.bookings.filter((booking) => booking.status === "PENDING").length;
  const confirmedBookings = input.bookings.filter(
    (booking) => booking.status === "CONFIRMED" || booking.status === "CHECKED_IN",
  ).length;

  const availabilityTrend = percentLabel(availableRooms, Math.max(occupiedRooms, 1));
  const bookingTrend = percentLabel(confirmedBookings, Math.max(pendingBookings, 1));

  const cards: DashboardMetricCard[] = [
    {
      title: "Total Rooms",
      value: String(input.roomTotal),
      changeLabel: availabilityTrend.label,
      trend: availabilityTrend.trend,
      context: `${availableRooms} available now`,
    },
    {
      title: "Room Types",
      value: String(input.roomTypeTotal),
      changeLabel: "Catalog",
      trend: "flat",
      context: "Configured room categories",
    },
    {
      title: "Users",
      value: String(input.userTotal),
      changeLabel: "Accounts",
      trend: "flat",
      context: "Customer + staff accounts",
    },
    {
      title: "Bookings",
      value: String(input.bookingTotal),
      changeLabel: bookingTrend.label,
      trend: bookingTrend.trend,
      context: `${pendingBookings} pending approval`,
    },
  ];

  const rows = [
    ...roomRows(input.rooms.slice(0, 4), 1),
    ...bookingRows(input.bookings.slice(0, 4), 100),
    ...userRows(input.users.slice(0, 4), 200),
  ];

  return {
    cards,
    chart: aggregateBookingsChart(input.bookings, ["CONFIRMED", "CHECKED_IN"]),
    rows,
  };
}

export function buildStaffDashboardData(input: {
  rooms: RoomResponse[];
  roomTotal: number;
  bookings: BookingResponse[];
  bookingTotal: number;
}): {
  cards: DashboardMetricCard[];
  chart: DashboardChartPoint[];
  rows: DashboardTableRow[];
} {
  const pendingBookings = input.bookings.filter((booking) => booking.status === "PENDING").length;
  const checkedInBookings = input.bookings.filter(
    (booking) => booking.status === "CHECKED_IN",
  ).length;
  const occupiedRooms = input.rooms.filter((room) => room.status === "OCCUPIED").length;
  const maintenanceRooms = input.rooms.filter(
    (room) => room.status === "MAINTENANCE",
  ).length;

  const pendingTrend = percentLabel(pendingBookings, Math.max(checkedInBookings, 1));
  const occupancyTrend = percentLabel(occupiedRooms, Math.max(maintenanceRooms, 1));

  const cards: DashboardMetricCard[] = [
    {
      title: "Booking Queue",
      value: String(input.bookingTotal),
      changeLabel: pendingTrend.label,
      trend: pendingTrend.trend,
      context: `${pendingBookings} pending`,
    },
    {
      title: "Checked In",
      value: String(checkedInBookings),
      changeLabel: "Today",
      trend: "flat",
      context: "Guests currently in-house",
    },
    {
      title: "Occupied Rooms",
      value: String(occupiedRooms),
      changeLabel: occupancyTrend.label,
      trend: occupancyTrend.trend,
      context: `${maintenanceRooms} in maintenance`,
    },
    {
      title: "Total Rooms",
      value: String(input.roomTotal),
      changeLabel: "Inventory",
      trend: "flat",
      context: "Rooms under staff visibility",
    },
  ];

  const rows = [
    ...bookingRows(input.bookings.slice(0, 8), 1),
    ...roomRows(input.rooms.slice(0, 4), 200),
  ];

  return {
    cards,
    chart: aggregateBookingsChart(input.bookings, ["PENDING", "CHECKED_IN"]),
    rows,
  };
}

export function buildCustomerDashboardData(input: {
  myBookings: BookingResponse[];
  myBookingTotal: number;
  rooms: RoomResponse[];
  roomTotal: number;
}): {
  cards: DashboardMetricCard[];
  chart: DashboardChartPoint[];
  rows: DashboardTableRow[];
} {
  const now = new Date();
  const upcomingBookings = input.myBookings.filter(
    (booking) =>
      new Date(booking.checkInDate) >= now &&
      booking.status !== "CANCELLED" &&
      booking.status !== "CHECKED_OUT",
  ).length;
  const completedBookings = input.myBookings.filter(
    (booking) => booking.status === "CHECKED_OUT",
  ).length;
  const availableRooms = input.rooms.filter((room) => room.status === "AVAILABLE").length;
  const occupancyTrend = percentLabel(availableRooms, Math.max(input.roomTotal, 1));

  const cards: DashboardMetricCard[] = [
    {
      title: "My Bookings",
      value: String(input.myBookingTotal),
      changeLabel: "History",
      trend: "flat",
      context: "All reservations linked to your account",
    },
    {
      title: "Upcoming Stays",
      value: String(upcomingBookings),
      changeLabel: "Planned",
      trend: "flat",
      context: "Future check-ins ready",
    },
    {
      title: "Completed Stays",
      value: String(completedBookings),
      changeLabel: "Visited",
      trend: "flat",
      context: "Past completed reservations",
    },
    {
      title: "Available Rooms",
      value: String(availableRooms),
      changeLabel: occupancyTrend.label,
      trend: occupancyTrend.trend,
      context: "Current public inventory",
    },
  ];

  const rows = [
    ...bookingRows(input.myBookings.slice(0, 8), 1),
    ...roomRows(input.rooms.slice(0, 4), 200),
  ];

  return {
    cards,
    chart: aggregateBookingsChart(input.myBookings, ["CONFIRMED", "CHECKED_IN"]),
    rows,
  };
}
