"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Loader2,
  MailIcon,
  PhoneIcon,
  UserIcon,
  ShieldIcon,
  SaveIcon,
  UploadIcon,
} from "lucide-react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getCustomerDashboardConfig } from "@/components/dashboard/role-config";
import {
  useGetCurrentUserQuery,
  useUpdateMyProfileMutation,
  useUploadProfileImageMutation,
} from "@/lib/feature/userSlice";
import { resolveMediaUrl } from "@/lib/media-url";
import { UpdateMyProfilePayload } from "@/types/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function extractErrorMessage(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") {
    return fallback;
  }

  const withData = error as { data?: unknown; error?: unknown };
  if (typeof withData.error === "string" && withData.error.trim()) {
    return withData.error;
  }

  if (typeof withData.data === "string" && withData.data.trim()) {
    return withData.data;
  }

  if (withData.data && typeof withData.data === "object") {
    const payload = withData.data as { message?: unknown; error?: unknown };
    if (typeof payload.message === "string" && payload.message.trim()) {
      return payload.message;
    }
    if (typeof payload.error === "string" && payload.error.trim()) {
      return payload.error;
    }
  }

  return fallback;
}

export default function CustomerProfilePage() {
  const profileQuery = useGetCurrentUserQuery();
  const [updateMyProfile, { isLoading: isSavingProfile }] =
    useUpdateMyProfileMutation();
  const [uploadProfileImage, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();

  const profile = profileQuery.data?.data;
  const isLoading = profileQuery.isLoading;
  const hasError = profileQuery.isError;

  const [fullNameDraft, setFullNameDraft] = useState<string | null>(null);
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const [phoneNumberDraft, setPhoneNumberDraft] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const getInitials = (value?: string) => {
    if (!value) return "?";
    return value
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const config = getCustomerDashboardConfig(profile);
  const avatarUrl = previewUrl || resolveMediaUrl(profile?.profileImage);
  const fullName = fullNameDraft ?? profile?.fullName ?? "";
  const email = emailDraft ?? profile?.email ?? "";
  const phoneNumber = phoneNumberDraft ?? profile?.phoneNumber ?? "";

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();

    if (!profile) return;

    const payload: UpdateMyProfilePayload = {};
    const currentFullName = profile.fullName ?? "";
    const currentEmail = profile.email ?? "";
    const currentPhone = profile.phoneNumber ?? "";

    const normalizedFullName = fullName.trim();
    const normalizedEmail = email.trim();
    const normalizedPhone = phoneNumber.trim();

    if (normalizedFullName !== currentFullName) {
      payload.fullName = normalizedFullName;
    }
    if (normalizedEmail !== currentEmail) {
      payload.email = normalizedEmail;
    }
    if (normalizedPhone !== currentPhone) {
      payload.phoneNumber = normalizedPhone;
    }

    if (Object.keys(payload).length === 0) {
      setSuccessMessage("No profile changes to save.");
      return;
    }

    try {
      await updateMyProfile(payload).unwrap();
      await profileQuery.refetch();
      setFullNameDraft(null);
      setEmailDraft(null);
      setPhoneNumberDraft(null);
      const msg = "Profile updated successfully.";
      setSuccessMessage(msg);
      toast.success(msg);
    } catch (error) {
      const errorMsg = extractErrorMessage(error, "Failed to update profile.");
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearMessages();
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file.");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUploadImage = async () => {
    clearMessages();

    if (!profile) return;
    if (!selectedFile) {
      setErrorMessage("Please choose an image before uploading.");
      return;
    }

    try {
      await uploadProfileImage({ file: selectedFile }).unwrap();
      await profileQuery.refetch();
      setSelectedFile(null);
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      const msg = "Profile image uploaded successfully.";
      setSuccessMessage(msg);
      toast.success(msg);
    } catch (error) {
      const errorMsg = extractErrorMessage(error, "Failed to upload image.");
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

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
      <div className="flex flex-col w-full h-full px-4 py-6 lg:px-6 lg:py-8 pb-20 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-slate-500 mt-1">
            Update your account information and profile image
          </p>
        </div>

        {errorMessage ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </CardContent>
          </Card>
        ) : null}

        {successMessage ? (
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <p className="text-sm text-emerald-700">{successMessage}</p>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Profile Photo</CardTitle>
              <CardDescription>
                Upload your avatar image for the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl} alt={profile.fullName} />
                  <AvatarFallback className="text-xl font-semibold">
                    {getInitials(profile.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-semibold">{profile.fullName}</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <Badge variant="outline" className="w-fit">
                    {profile.role?.name}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-image">Select Image</Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <Button
                type="button"
                onClick={() => {
                  void handleUploadImage();
                }}
                disabled={!selectedFile || isUploadingImage}
                className="w-full"
              >
                {isUploadingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4" />
                    Upload Profile Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Profile Details</CardTitle>
              <CardDescription>
                Keep your contact details up to date.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSaveProfile}>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(event) => setFullNameDraft(event.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmailDraft(event.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumberDraft(event.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <Button type="submit" disabled={isSavingProfile} className="w-full">
                  {isSavingProfile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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
        </div>
      </div>
    </DashboardFrame>
  );
}
