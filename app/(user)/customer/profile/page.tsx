"use client";

import {
  Loader2,
  MailIcon,
  PhoneIcon,
  UserIcon,
  ShieldIcon,
} from "lucide-react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getCustomerDashboardConfig } from "@/components/dashboard/role-config";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CustomerProfilePage() {
  const profileQuery = useGetCurrentUserQuery();

  const profile = profileQuery.data?.data;
  const isLoading = profileQuery.isLoading;
  const hasError = profileQuery.isError;

  const getInitials = (fullName?: string) => {
    if (!fullName) return "?";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const config = getCustomerDashboardConfig(profile);

  if (isLoading) {
    return (
      <DashboardFrame config={config}>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </DashboardFrame>
    );
  }

  if (hasError || !profile) {
    return (
      <DashboardFrame config={config}>
        <div className="flex flex-col w-full h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-center text-red-600">
                Failed to load profile information. Please try again later.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardFrame>
    );
  }

  return (
    <DashboardFrame config={config}>
      <div className="flex flex-col w-full h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage your account information</p>
        </div>

        {/* Profile Summary Card */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={profile.profileImage || ""}
                    alt={profile.fullName}
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(profile.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                  <CardDescription className="mt-1">
                    {profile.role?.description || profile.role?.name}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <ShieldIcon className="h-3 w-3" />
                {profile.role?.name}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Information */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Email Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MailIcon className="h-4 w-4" />
                Email Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Email</p>
              <p className="text-lg font-semibold break-all">{profile.email}</p>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <PhoneIcon className="h-4 w-4" />
                Phone Number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Contact Phone</p>
              <p className="text-lg font-semibold">
                {profile.phoneNumber || "Not provided"}
              </p>
            </CardContent>
          </Card>

          {/* Full Name Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserIcon className="h-4 w-4" />
                Full Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Your Name</p>
              <p className="text-lg font-semibold">{profile.fullName}</p>
            </CardContent>
          </Card>

          {/* Role Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldIcon className="h-4 w-4" />
                Account Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Your Account Type</p>
              <Badge className="mt-2">{profile.role?.name || "Unknown"}</Badge>
            </CardContent>
          </Card>

          {/* Member ID Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Member ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Your Unique ID</p>
              <p className="text-lg font-semibold font-mono">#{profile.id}</p>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Current Status</p>
              <Badge
                variant="outline"
                className="mt-2 bg-green-50 text-green-800 border-green-200"
              >
                Active
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Manage your profile settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Member Since</span>
                {/* <span className="font-medium">
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—"}
                </span> */}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Profile Completeness</span>
                <span className="font-medium">
                  {profile.phoneNumber ? "95%" : "85%"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardFrame>
  );
}
