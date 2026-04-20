"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, SaveIcon, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { getCustomerDashboardConfig } from "@/components/dashboard/role-config";
import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import {
  useCreateMyRatingMutation,
  useDeleteMyRatingMutation,
  useGetMyRatingQuery,
  useUpdateMyRatingMutation,
} from "@/lib/feature/hotelSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

function extractStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const payload = error as { status?: unknown };
  return typeof payload.status === "number" ? payload.status : null;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") {
    return fallback;
  }

  const payload = error as {
    error?: unknown;
    data?: unknown;
    message?: unknown;
  };

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (typeof payload.data === "string" && payload.data.trim()) {
    return payload.data;
  }

  if (payload.data && typeof payload.data === "object") {
    const nested = payload.data as { message?: unknown; error?: unknown };
    if (typeof nested.message === "string" && nested.message.trim()) {
      return nested.message;
    }
    if (typeof nested.error === "string" && nested.error.trim()) {
      return nested.error;
    }
  }

  return fallback;
}

export default function CustomerRatingPage() {
  const profileQuery = useGetCurrentUserQuery();
  const myRatingQuery = useGetMyRatingQuery();
  const [createMyRating, { isLoading: isCreating }] = useCreateMyRatingMutation();
  const [updateMyRating, { isLoading: isUpdating }] = useUpdateMyRatingMutation();
  const [deleteMyRating, { isLoading: isDeleting }] = useDeleteMyRatingMutation();

  const profile = profileQuery.data?.data;
  const config = getCustomerDashboardConfig(profile);

  const ratingStatus = extractStatus(myRatingQuery.error);
  const hasNoRatingYet = ratingStatus === 404;
  const rating = myRatingQuery.data?.data;
  const hasRating = Boolean(rating);

  const [stars, setStars] = useState(5);
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const isLoading = profileQuery.isLoading || myRatingQuery.isLoading;
  const hasBlockingError =
    profileQuery.isError || (myRatingQuery.isError && !hasNoRatingYet);

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (!rating) {
      return;
    }

    setStars(rating.stars);
    setDescription(rating.description ?? "");
    setJobTitle(rating.jobTitle ?? "");
  }, [rating]);

  const modeLabel = hasRating ? "Update My Rating" : "Create My Rating";

  const ratingSummary = useMemo(() => {
    if (!rating?.updatedAt) {
      return null;
    }
    const parsed = new Date(rating.updatedAt);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return parsed.toLocaleString();
  }, [rating?.updatedAt]);

  const clearMessages = () => {
    setFormError("");
    setFormSuccess("");
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessages();

    const normalizedDescription = description.trim();
    const normalizedJobTitle = jobTitle.trim();

    if (!Number.isFinite(stars) || stars < 1 || stars > 5) {
      setFormError("Please choose a star rating between 1 and 5.");
      return;
    }

    if (!normalizedDescription) {
      setFormError("Description is required.");
      return;
    }

    if (normalizedDescription.length > 2000) {
      setFormError("Description must not exceed 2000 characters.");
      return;
    }

    try {
      const payload = {
        stars,
        description: normalizedDescription,
        jobTitle: normalizedJobTitle || undefined,
      };

      if (hasRating) {
        await updateMyRating(payload).unwrap();
      } else {
        await createMyRating(payload).unwrap();
      }

      await myRatingQuery.refetch();
      const successMsg = hasRating
        ? "Your rating was updated successfully."
        : "Your rating was submitted successfully.";
      setFormSuccess(successMsg);
      toast.success(successMsg);
    } catch (error) {
      const message = extractErrorMessage(error, "Failed to save rating.");
      setFormError(message);
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    clearMessages();

    if (!hasRating) {
      return;
    }

    try {
      await deleteMyRating().unwrap();
      await myRatingQuery.refetch();
      setStars(5);
      setDescription("");
      setJobTitle("");
      const successMsg = "Your rating was deleted successfully.";
      setFormSuccess(successMsg);
      toast.success(successMsg);
    } catch (error) {
      const message = extractErrorMessage(error, "Failed to delete rating.");
      setFormError(message);
      toast.error(message);
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

  if (hasBlockingError) {
    return (
      <DashboardFrame config={config}>
        <div className="flex flex-col w-full h-full px-4 py-6 lg:px-6 lg:py-8 pb-20">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-center text-red-600">
                Failed to load rating information. Please try again later.
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
          <h1 className="text-3xl font-bold tracking-tight">My Rating</h1>
          <p className="text-slate-500 mt-1">
            Share your experience. Each customer can keep one public rating and
            update it anytime.
          </p>
        </div>

        {formError ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-sm text-red-700">{formError}</p>
            </CardContent>
          </Card>
        ) : null}

        {formSuccess ? (
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <p className="text-sm text-emerald-700">{formSuccess}</p>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{modeLabel}</CardTitle>
              <CardDescription>
                This rating appears in public testimonials after saving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSave}>
                <div className="space-y-2">
                  <Label>Stars</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setStars(value)}
                        className="rounded-md p-1 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Set rating to ${value} star${value > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`h-7 w-7 ${
                            value <= stars
                              ? "fill-amber-400 text-amber-500"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <Badge variant="outline" className="ml-2">
                      {stars}/5
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating-description">Description</Label>
                  <Textarea
                    id="rating-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Tell us about your stay experience..."
                    rows={6}
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground">
                    {description.length}/2000 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating-job-title">
                    Job Title (Optional)
                  </Label>
                  <Input
                    id="rating-job-title"
                    value={jobTitle}
                    onChange={(event) => setJobTitle(event.target.value)}
                    placeholder="e.g. Product Designer"
                    maxLength={255}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" className="sm:flex-1" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <SaveIcon className="h-4 w-4" />
                        Save Rating
                      </>
                    )}
                  </Button>

                  {hasRating ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 sm:w-auto"
                      onClick={() => {
                        void handleDelete();
                      }}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </>
                      )}
                    </Button>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Current Status</CardTitle>
              <CardDescription>
                Summary of your current public testimonial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Rating owner</p>
                <p className="text-lg font-semibold">
                  {profile?.fullName || "Unknown user"}
                </p>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Existing rating</p>
                {hasRating ? (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={`summary-star-${index}`}
                          className={`h-4 w-4 ${
                            index < (rating?.stars ?? 0)
                              ? "fill-amber-400 text-amber-500"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    {ratingSummary ? (
                      <p className="text-xs text-muted-foreground">
                        Last updated: {ratingSummary}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <Badge variant="outline">No rating submitted yet</Badge>
                )}
              </div>

              <div className="rounded-lg border bg-slate-50/70 p-3 text-xs text-slate-600">
                Your name and profile image are sourced from your profile
                account and synced automatically.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardFrame>
  );
}
