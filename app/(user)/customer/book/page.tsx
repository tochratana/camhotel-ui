"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getCustomerDashboardConfig } from "@/components/dashboard/role-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBookingMutation, useGetBookingPolicyQuery, useGetRoomByIdQuery } from "@/lib/feature/hotelSlice";
import { useGetCurrentUserQuery, useUpdateMyProfileMutation } from "@/lib/feature/userSlice";

const DEFAULT_MAX_BOOKING_DAYS = 30;
const DEFAULT_LEAD_TIME_HOURS = 24;
const HOTEL_CHECK_IN_HOUR = 14;

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addDaysToDateInputValue(dateInput: string, days: number): string {
  const baseDate = new Date(`${dateInput}T00:00:00`);
  if (Number.isNaN(baseDate.getTime())) {
    const fallback = new Date();
    fallback.setHours(0, 0, 0, 0);
    return toDateInputValue(addDays(fallback, days));
  }
  return toDateInputValue(addDays(baseDate, days));
}

function getMinimumCheckInDateByLeadTime(leadTimeHours: number): string {
  const normalizedLeadTime =
    Number.isFinite(leadTimeHours) && leadTimeHours > 0
      ? Math.floor(leadTimeHours)
      : 0;

  if (normalizedLeadTime <= 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return toDateInputValue(today);
  }

  const minimumAllowedCheckInTime = new Date(Date.now() + normalizedLeadTime * 60 * 60 * 1000);
  const candidate = new Date(minimumAllowedCheckInTime);
  candidate.setHours(HOTEL_CHECK_IN_HOUR, 0, 0, 0);

  if (candidate.getTime() < minimumAllowedCheckInTime.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }

  return toDateInputValue(candidate);
}

function getDateRangeError(
  checkInDate: string,
  checkOutDate: string,
  minimumCheckInDate: string,
  maxBookingDays: number,
): string | null {
  if (!checkInDate || !checkOutDate) {
    return "Please select both check-in and check-out dates.";
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const minimumCheckIn = new Date(minimumCheckInDate);

  if (
    Number.isNaN(checkIn.getTime()) ||
    Number.isNaN(checkOut.getTime()) ||
    Number.isNaN(minimumCheckIn.getTime())
  ) {
    return "Please select valid dates.";
  }

  if (checkIn < minimumCheckIn) {
    return `Check-in date must be on or after ${minimumCheckInDate}.`;
  }

  if (checkOut <= checkIn) {
    return "Check-out date must be after check-in date.";
  }

  const nights = getNights(checkInDate, checkOutDate);
  if (maxBookingDays > 0 && nights > maxBookingDays) {
    return `Stay cannot exceed ${maxBookingDays} night(s).`;
  }

  return null;
}

function getNights(checkInDate: string, checkOutDate: string): number {
  const checkInTs = Date.parse(`${checkInDate}T00:00:00`);
  const checkOutTs = Date.parse(`${checkOutDate}T00:00:00`);
  const diff = checkOutTs - checkInTs;
  if (!Number.isFinite(diff) || diff <= 0) return 0;
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function parseApiError(error: unknown): string {
  if (!error || typeof error !== "object") return "Unable to complete booking.";

  const maybeError = error as {
    data?: {
      message?: string;
      error?: string;
      validationErrors?: Record<string, string>;
    };
    error?: string;
  };

  if (maybeError.data?.validationErrors) {
    const firstValidationError = Object.values(maybeError.data.validationErrors).find(
      (value) => typeof value === "string" && value.trim().length > 0,
    );
    if (firstValidationError) return firstValidationError;
  }

  if (typeof maybeError.data?.message === "string") return maybeError.data.message;
  if (typeof maybeError.data?.error === "string") return maybeError.data.error;
  if (typeof maybeError.error === "string") return maybeError.error;
  return "Unable to complete booking.";
}

type FeedbackState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export default function CustomerBookRoomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get("roomId");
  const roomId = Number(roomIdParam);
  const isValidRoomId = Number.isInteger(roomId) && roomId > 0;

  const defaultDateRange = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = addDays(today, 1);
    return {
      todayString: toDateInputValue(today),
      checkInDate: toDateInputValue(today),
      checkOutDate: toDateInputValue(tomorrow),
    };
  }, []);

  const initialCheckIn = searchParams.get("checkInDate") ?? defaultDateRange.checkInDate;
  const initialCheckOut = searchParams.get("checkOutDate") ?? defaultDateRange.checkOutDate;

  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [fullNameDraft, setFullNameDraft] = useState<string | null>(null);
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const [phoneNumberDraft, setPhoneNumberDraft] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);

  const profileQuery = useGetCurrentUserQuery();
  const roomQuery = useGetRoomByIdQuery(roomId, { skip: !isValidRoomId });
  const bookingPolicyQuery = useGetBookingPolicyQuery();
  const [createBooking, createBookingState] = useCreateBookingMutation();
  const [updateMyProfile, updateMyProfileState] = useUpdateMyProfileMutation();

  const profile = profileQuery.data?.data;
  const room = roomQuery.data?.data;
  const config = getCustomerDashboardConfig(profile);
  const fullName = fullNameDraft ?? profile?.fullName ?? "";
  const email = emailDraft ?? profile?.email ?? "";
  const phoneNumber = phoneNumberDraft ?? profile?.phoneNumber ?? "";
  const leadTimeHours = bookingPolicyQuery.data?.data?.leadTimeHours ?? DEFAULT_LEAD_TIME_HOURS;
  const maxBookingDays = bookingPolicyQuery.data?.data?.maxBookingDays ?? DEFAULT_MAX_BOOKING_DAYS;
  const minimumCheckInDate = useMemo(
    () => getMinimumCheckInDateByLeadTime(leadTimeHours),
    [leadTimeHours],
  );
  const normalizedCheckInDate = checkInDate >= minimumCheckInDate ? checkInDate : minimumCheckInDate;

  const minCheckOutDate = useMemo(() => {
    const checkIn = new Date(normalizedCheckInDate);
    if (Number.isNaN(checkIn.getTime())) {
      return addDaysToDateInputValue(minimumCheckInDate, 1);
    }
    return toDateInputValue(addDays(checkIn, 1));
  }, [minimumCheckInDate, normalizedCheckInDate]);

  const maxCheckOutDate = useMemo(
    () => addDaysToDateInputValue(normalizedCheckInDate, maxBookingDays),
    [normalizedCheckInDate, maxBookingDays],
  );
  const normalizedCheckOutDate = useMemo(() => {
    const safeCheckOutDate = checkOutDate || minCheckOutDate;
    if (safeCheckOutDate < minCheckOutDate) {
      return minCheckOutDate;
    }
    if (maxBookingDays > 0 && safeCheckOutDate > maxCheckOutDate) {
      return maxCheckOutDate;
    }
    return safeCheckOutDate;
  }, [checkOutDate, minCheckOutDate, maxBookingDays, maxCheckOutDate]);

  const dateRangeError = getDateRangeError(
    normalizedCheckInDate,
    normalizedCheckOutDate,
    minimumCheckInDate,
    maxBookingDays,
  );
  const nights = dateRangeError ? 0 : getNights(normalizedCheckInDate, normalizedCheckOutDate);
  const totalPrice = room ? Number(room.currentPrice ?? 0) * nights : 0;

  const guestError = useMemo(() => {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!phoneNumber.trim()) return "Please enter your phone number.";
    return null;
  }, [email, fullName, phoneNumber]);

  const isSubmitting = createBookingState.isLoading || updateMyProfileState.isLoading;
  const canSubmit = Boolean(room) && !dateRangeError && !guestError && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidRoomId) {
      setFeedback({ type: "error", message: "Please select a valid room before booking." });
      return;
    }

    if (!room) {
      setFeedback({ type: "error", message: "Room details are still loading. Please try again." });
      return;
    }

    if (dateRangeError) {
      setFeedback({ type: "error", message: dateRangeError });
      return;
    }

    if (guestError) {
      setFeedback({ type: "error", message: guestError });
      return;
    }

    setFeedback(null);
    setCreatedBookingId(null);

    try {
      if (profile) {
        const profileUpdates: {
          fullName?: string;
          phoneNumber?: string;
        } = {};

        const nextFullName = fullName.trim();
        const nextPhoneNumber = phoneNumber.trim();

        if (nextFullName !== (profile.fullName ?? "")) {
          profileUpdates.fullName = nextFullName;
        }
        if (nextPhoneNumber !== (profile.phoneNumber ?? "")) {
          profileUpdates.phoneNumber = nextPhoneNumber;
        }

        if (Object.keys(profileUpdates).length > 0) {
          await updateMyProfile(profileUpdates).unwrap();
        }
      }

      const response = await createBooking({
        roomId: room.id,
        checkInDate: normalizedCheckInDate,
        checkOutDate: normalizedCheckOutDate,
      }).unwrap();

      const bookingId = response.data?.id ?? null;
      setCreatedBookingId(bookingId);
      setFeedback({
        type: "success",
        message: bookingId
          ? `Booking #${bookingId} created successfully.`
          : "Booking created successfully.",
      });
    } catch (error) {
      setFeedback({ type: "error", message: parseApiError(error) });
    }
  };

  return (
    <DashboardFrame
      config={config}
      headerTitle="Book Room"
      headerDescription="Choose your dates, confirm your details, and complete your reservation."
    >
      <div className="flex flex-col gap-6 px-4 py-6 lg:px-6 lg:py-8">
        <div className="flex items-center justify-between gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/rooms">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back To Rooms
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/customer/mybookings">My Bookings</Link>
          </Button>
        </div>

        {!isValidRoomId ? (
          <Card className="border-rose-200">
            <CardHeader>
              <CardTitle>Room Not Selected</CardTitle>
              <CardDescription>Please choose a room from the room listing first.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/rooms">Browse Rooms</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Guest Details</CardTitle>
                <CardDescription>
                  Your saved account details are pre-filled. You can edit them before placing the booking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="check-in">Check-in Date</Label>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                          id="check-in"
                          type="date"
                          min={minimumCheckInDate}
                          value={normalizedCheckInDate}
                          onChange={(event) => setCheckInDate(event.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="check-out">Check-out Date</Label>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                          id="check-out"
                          type="date"
                          min={minCheckOutDate}
                          max={maxBookingDays > 0 ? maxCheckOutDate : undefined}
                          value={normalizedCheckOutDate}
                          onChange={(event) => setCheckOutDate(event.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    Booking policy: check-in requires at least {leadTimeHours} hour(s) lead time and maximum stay is{" "}
                    {maxBookingDays} night(s).
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="guest-name">Full Name</Label>
                      <div className="relative">
                        <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                          id="guest-name"
                          value={fullName}
                          onChange={(event) => setFullNameDraft(event.target.value)}
                          placeholder="Enter your full name"
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guest-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                          id="guest-phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(event) => setPhoneNumberDraft(event.target.value)}
                          placeholder="Enter your phone number"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guest-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="guest-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmailDraft(event.target.value)}
                        placeholder="Enter your email address"
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Email is editable for confirmation. Account email changes can be done from Profile settings.
                    </p>
                  </div>

                  {dateRangeError ? (
                    <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                      {dateRangeError}
                    </p>
                  ) : null}

                  {!dateRangeError && guestError ? (
                    <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                      {guestError}
                    </p>
                  ) : null}

                  {feedback ? (
                    <p
                      className={`rounded-md px-3 py-2 text-sm ${
                        feedback.type === "success"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {feedback.message}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                          Creating Booking...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>

                    {createdBookingId ? (
                      <Button type="button" variant="outline" onClick={() => router.push("/customer/mybookings")}>
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        View My Bookings
                      </Button>
                    ) : null}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Review your room and stay total before submitting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {roomQuery.isLoading || roomQuery.isFetching ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading room details...
                  </div>
                ) : roomQuery.isError || !room ? (
                  <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    Unable to load room details.
                  </p>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Room</p>
                      <p className="font-semibold">
                        {room.roomType?.name ?? "Room"} - Room {room.roomNumber}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Nightly Rate</p>
                      <p className="font-semibold">
                        {moneyFormatter.format(Number(room.currentPrice ?? 0))}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-500">Stay Length</p>
                      <p className="font-semibold">{nights} night(s)</p>
                    </div>
                    <div className="space-y-1 rounded-md border bg-slate-50 p-3">
                      <p className="text-sm text-slate-500">Estimated Total</p>
                      <p className="text-2xl font-bold">{moneyFormatter.format(totalPrice)}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardFrame>
  );
}
