"use client";

import { useEffect, useRef, useState } from "react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import { adminDashboardConfig } from "@/components/dashboard/role-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Upload,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { FacilitiesData } from "@/types/hotel";
import {
  useGetFacilitiesQuery,
  useUpdateFacilityMutation,
  useUploadFileMutation,
} from "@/lib/feature/facilitySlice";
import { resolveMediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";

import { useGetCurrentUserQuery } from "@/lib/feature/userSlice";
import { normalizeRole } from "@/lib/admin-auth";

const initialData: FacilitiesData = {
  exquisiteHeader: "World-Class Facilities.",
  exquisiteBody:
    "A curated ecosystem of luxury, designed to facilitate your peace of mind and provide unparalleled comfort.",
  accommodationsHeader: "Luxurious Sanctuaries",
  accommodationsBody:
    "Our rooms feature Italian marble, custom linens, and smart-room technology.",
  accommodationsType: ["King Size", "Smart Controls"],
  accommodationsImage:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
  leisureHeader: "Infinity Skyline Pool",
  leisureBody:
    "Experience the city from above in our temperature-controlled rooftop pool.",
  leisureImage:
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
  gastronomyHeader: "Fine Dining Excellence",
  gastronomyBody:
    "Experience a culinary journey led by world-renowned chefs at our Michelin-starred restaurant 'The Azure'.",
  gastronomyImage: [
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  ],
};

export default function FacilitiesAdminPage() {
  const { data: facilitiesResponse, isLoading: isFetching } = useGetFacilitiesQuery();
  const { data: userData } = useGetCurrentUserQuery();
  const [updateFacility, { isLoading: isUpdating }] = useUpdateFacilityMutation();
  const [uploadFile] = useUploadFileMutation();

  const [data, setData] = useState<FacilitiesData>(initialData);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const accImageInputRef = useRef<HTMLInputElement>(null);
  const leisureImageInputRef = useRef<HTMLInputElement>(null);
  const gastronomyImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (facilitiesResponse?.success && Array.isArray(facilitiesResponse.data) && facilitiesResponse.data.length > 0) {
      setData((prev) => ({
        ...prev,
        ...facilitiesResponse.data[0],
      }));
    }
  }, [facilitiesResponse]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    field: "accommodationsType" | "gastronomyImage",
    index: number,
    value: string
  ) => {
    setData((prev) => {
      const currentArray = prev[field] || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: "accommodationsType" | "gastronomyImage") => {
    setData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (
    field: "accommodationsType" | "gastronomyImage",
    index: number
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FacilitiesData,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const fieldKey = index !== undefined ? `${String(field)}-${index}` : String(field);
    setUploadingField(fieldKey);

    try {
      const result = await uploadFile(formData).unwrap();
      if (result.success && result.data.filePath) {
        const url = result.data.filePath;
        
        if (index !== undefined) {
          // Update specific index in an array field
          if (field === "gastronomyImage" || field === "accommodationsType") {
             handleArrayChange(field, index, url);
          }
        } else {
          // Update a single string field
          setData((prev) => ({ ...prev, [field]: url }));
        }
        
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    // Role check to allow only ADMIN
    const userRole = normalizeRole(userData?.data?.role?.name);
    if (userRole !== "ADMIN") {
      toast.error("Access Denied: Only administrators can modify facilities.");
      return;
    }

    if (!data.id) {
      toast.error("Facility ID is missing. Please refresh the page.");
      return;
    }

    try {
      // Construct exact payload excluding id as it goes in the URL path per user requirement
      const payload: FacilitiesData = {
        id: data.id, // Included for slice extraction, slice will put it in URL and strip from body
        exquisiteHeader: data.exquisiteHeader || "",
        exquisiteBody: data.exquisiteBody || "",
        accommodationsHeader: data.accommodationsHeader || "",
        accommodationsBody: data.accommodationsBody || "",
        accommodationsType: data.accommodationsType || [],
        accommodationsImage: data.accommodationsImage || "",
        leisureHeader: data.leisureHeader || "",
        leisureBody: data.leisureBody || "",
        leisureImage: data.leisureImage || "",
        gastronomyHeader: data.gastronomyHeader || "",
        gastronomyBody: data.gastronomyBody || "",
        gastronomyImage: data.gastronomyImage || [],
      };

      const result = await updateFacility(payload).unwrap();
      if (result.success) {
        toast.success("Facilities content updated successfully!");
      } else {
        toast.error(result.message || "Failed to update facilities");
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || error?.message || "Internal server error";
      toast.error(`Save failed: ${errorMsg}`);
      console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <DashboardFrame
        config={adminDashboardConfig}
        headerTitle="Manage Facilities"
        headerDescription="Loading facilities data..."
      >
        <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Syncing with server...</p>
        </div>
      </DashboardFrame>
    );
  }

  return (
    <DashboardFrame
      config={adminDashboardConfig}
      headerTitle="Manage Facilities"
      headerDescription="Update the content and images for the public facilities page"
    >
      <div className="p-6 space-y-10 max-w-6xl mx-auto pb-32">
        {/* Hero Section */}
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <div className="h-2 bg-primary/10" />
          <CardHeader className="pb-4">
            <CardTitle className="font-heading text-xl flex items-center gap-2 text-primary">
              <span className="p-1.5 rounded-md bg-primary/10">
                 <ImageIcon className="size-4" />
              </span>
              Hero Section
            </CardTitle>
            <CardDescription>
              This content appears at the top of the facilities landing page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="exquisiteHeader" className="text-sm font-semibold">Hero Title</Label>
                <Input
                  id="exquisiteHeader"
                  name="exquisiteHeader"
                  value={data.exquisiteHeader}
                  onChange={handleInputChange}
                  className="bg-muted/30 focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exquisiteBody" className="text-sm font-semibold">Hero Description</Label>
                <Textarea
                  id="exquisiteBody"
                  name="exquisiteBody"
                  value={data.exquisiteBody}
                  onChange={handleInputChange}
                  rows={2}
                  className="bg-muted/30 focus-visible:ring-primary/30 resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accommodations */}
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="font-heading text-xl">Accommodations Section</CardTitle>
            <CardDescription>
              Showcase your rooms and their premium features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="accommodationsHeader" className="font-semibold">Section Title</Label>
                  <Input
                    id="accommodationsHeader"
                    name="accommodationsHeader"
                    value={data.accommodationsHeader}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodationsBody" className="font-semibold">Description</Label>
                  <Textarea
                    id="accommodationsBody"
                    name="accommodationsBody"
                    value={data.accommodationsBody}
                    onChange={handleInputChange}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Key Features</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("accommodationsType")}
                      className="h-8 text-xs bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary"
                    >
                      <Plus className="size-3 mr-1" /> Add Feature
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(data.accommodationsType || []).map((type, idx) => (
                      <div key={idx} className="flex gap-2 group">
                        <Input
                          value={type}
                          onChange={(e) =>
                            handleArrayChange("accommodationsType", idx, e.target.value)
                          }
                          className="h-9 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("accommodationsType", idx)}
                          className="size-9 text-destructive opacity-40 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-semibold">Section Hero Image</Label>
                <div className="border rounded-2xl p-4 bg-muted/20 space-y-4">
                  <div className="flex gap-2">
                    <Input
                      name="accommodationsImage"
                      value={data.accommodationsImage}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="text-xs bg-background"
                    />
                    <input
                      type="file"
                      className="hidden"
                      ref={accImageInputRef}
                      onChange={(e) => handleFileUpload(e, "accommodationsImage")}
                      accept="image/*"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="shrink-0 border shadow-sm"
                      onClick={() => accImageInputRef.current?.click()}
                      disabled={uploadingField === "accommodationsImage"}
                    >
                      {uploadingField === "accommodationsImage" ? (
                        <Loader2 className="size-4 animate-spin text-primary" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                    </Button>
                  </div>
                  {data.accommodationsImage && (
                    <div className="relative aspect-16/10 rounded-xl overflow-hidden border-2 border-background shadow-lg ring-1 ring-black/5">
                      <Image
                        src={resolveMediaUrl(data.accommodationsImage)}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leisure */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl">Leisure Section</CardTitle>
            <CardDescription>Rooftop pool and leisure facility details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leisureHeader" className="font-semibold">Section Title</Label>
                  <Input
                    id="leisureHeader"
                    name="leisureHeader"
                    value={data.leisureHeader}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leisureBody" className="font-semibold">Description</Label>
                  <Textarea
                    id="leisureBody"
                    name="leisureBody"
                    value={data.leisureBody}
                    onChange={handleInputChange}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-semibold">Leisure Feature Image</Label>
                <div className="border rounded-2xl p-4 bg-muted/20 space-y-4">
                  <div className="flex gap-2">
                    <Input
                      name="leisureImage"
                      value={data.leisureImage}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="text-xs bg-background"
                    />
                    <input
                      type="file"
                      className="hidden"
                      ref={leisureImageInputRef}
                      onChange={(e) => handleFileUpload(e, "leisureImage")}
                      accept="image/*"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="shrink-0 border shadow-sm"
                      onClick={() => leisureImageInputRef.current?.click()}
                      disabled={uploadingField === "leisureImage"}
                    >
                      {uploadingField === "leisureImage" ? (
                        <Loader2 className="size-4 animate-spin text-primary" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                    </Button>
                  </div>
                  {data.leisureImage && (
                    <div className="relative aspect-21/9 rounded-xl overflow-hidden border-2 border-background shadow-lg ring-1 ring-black/5">
                      <Image
                        src={resolveMediaUrl(data.leisureImage)}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gastronomy Gallery */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <div className="space-y-1">
              <CardTitle className="font-heading text-xl">Gastronomy Gallery</CardTitle>
              <CardDescription>Manage the images for the dining excellence section</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("gastronomyImage")}
              className="h-9 px-4 rounded-full border-primary/20 hover:bg-primary/5 text-primary gap-2"
            >
              <Plus className="size-4" /> Add Image
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(data.gastronomyImage || []).map((img, idx) => (
                <div key={idx} className="group flex flex-col border rounded-2xl overflow-hidden bg-muted/10 transition-all hover:shadow-md hover:border-primary/20">
                  {/* Image Card Header as shown in screenshot */}
                  <div className="p-3 bg-background/80 backdrop-blur-sm border-b flex items-center gap-2">
                    <div className="flex-1 relative">
                       <Input
                        value={img}
                        onChange={(e) =>
                          handleArrayChange("gastronomyImage", idx, e.target.value)
                        }
                        placeholder="Image URL"
                        className="h-9 text-xs pr-10 focus-visible:ring-primary/20"
                      />
                      <input
                        type="file"
                        className="hidden"
                        ref={(el) => {
                          gastronomyImageInputRefs.current[idx] = el;
                        }}
                        onChange={(e) => handleFileUpload(e, "gastronomyImage", idx)}
                        accept="image/*"
                      />
                      <button
                        type="button"
                        onClick={() => gastronomyImageInputRefs.current[idx]?.click()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                        disabled={uploadingField === `gastronomyImage-${idx}`}
                      >
                        {uploadingField === `gastronomyImage-${idx}` ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Upload className="size-4" />
                        )}
                      </button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("gastronomyImage", idx)}
                      className="size-9 text-destructive hover:bg-destructive/10 shrink-0 border border-transparent hover:border-destructive/20"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  {/* Image Preview */}
                  <div className="relative aspect-4/3 bg-muted/20">
                    {img ? (
                      <Image
                        src={resolveMediaUrl(img)}
                        alt={`Preview ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40 gap-2">
                        <ImageIcon className="size-10" />
                        <span className="text-sm font-medium">No Image URL</span>
                      </div>
                    )}
                    {/* Overlay info */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      Image {idx + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {data.gastronomyImage.length === 0 && (
              <div className="py-20 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-muted-foreground space-y-3">
                <div className="p-4 rounded-full bg-muted">
                   <Plus className="size-8" />
                </div>
                <p>No images in the gallery yet.</p>
                <Button variant="link" onClick={() => addArrayItem("gastronomyImage")}>
                  Add your first image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Floating Save Button */}
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Button
            size="lg"
            className={cn(
                "h-14 px-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-full gap-2 transition-all active:scale-95",
                isUpdating ? "bg-muted-foreground cursor-not-allowed" : "bg-primary hover:bg-primary/90 hover:-translate-y-1"
            )}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <CheckCircle2 className="size-5" />
            )}
            <span className="font-semibold tracking-tight">Save All Changes</span>
          </Button>
        </div>
      </div>
    </DashboardFrame>
  );
}
