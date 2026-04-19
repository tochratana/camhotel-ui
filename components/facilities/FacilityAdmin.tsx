"use client";

import {useState} from "react";
import DashboardFrame from "@/components/dashboard/DashboardFrame";
import {adminDashboardConfig} from "@/components/dashboard/role-config";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Plus, Trash2, Upload, Loader2, Image as ImageIcon} from "lucide-react";
import {toast} from "sonner";
import Image from "next/image";
import {FacilitiesData} from "@/types/hotel";


const initialData: FacilitiesData = {
    exquisiteHeader: "World-Class Facilities.",
    exquisiteBody: "A curated ecosystem of luxury, designed to facilitate your peace of mind and provide unparalleled comfort.",
    accommodationsHeader: "Luxurious Sanctuaries",
    accommodationsBody: "Our rooms feature Italian marble, custom linens, and smart-room technology.",
    accommodationsType: ["King Size", "Smart Controls"],
    accommodationsImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
    leisureHeader: "Infinity Skyline Pool",
    leisureBody: "Experience the city from above in our temperature-controlled rooftop pool.",
    leisureImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
    gastronomyHeader: "Fine Dining Excellence",
    gastronomyBody: "Experience a culinary journey led by world-renowned chefs at our Michelin-starred restaurant 'The Azure'.",
    gastronomyImage: [
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
    ]
};

export default function FacilitiesAdminPage() {
    const [data, setData] = useState<FacilitiesData>(initialData);
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const handleArrayChange = (field: "accommodationsType" | "gastronomyImage", index: number, value: string) => {
        setData(prev => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return {...prev, [field]: newArray};
        });
    };

    const addArrayItem = (field: "accommodationsType" | "gastronomyImage") => {
        setData(prev => ({...prev, [field]: [...prev[field], ""]}));
    };

    const removeArrayItem = (field: "accommodationsType" | "gastronomyImage", index: number) => {
        setData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Facilities content updated successfully!");
            console.log("Saving data:", data);
        }, 1500);
    };

    return (
        <DashboardFrame
            config={adminDashboardConfig}
            headerTitle="Manage Facilities"
            headerDescription="Update the content and images for the public facilities page"
        >
            <div className="p-6 space-y-8 max-w-5xl mx-auto pb-24">

                {/* Hero Section (Exquisite) */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-heading text-lg">Hero Section</CardTitle>
                        <CardDescription>Main header and introduction of the facilities page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="exquisiteHeader">Hero Title</Label>
                            <Input
                                id="exquisiteHeader"
                                name="exquisiteHeader"
                                value={data.exquisiteHeader}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="exquisiteBody">Hero Description</Label>
                            <Textarea
                                id="exquisiteBody"
                                name="exquisiteBody"
                                value={data.exquisiteBody}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Accommodations */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-heading text-lg">Accommodations Section</CardTitle>
                        <CardDescription>Showcase your rooms and their premium features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accommodationsHeader">Section Title</Label>
                                    <Input
                                        id="accommodationsHeader"
                                        name="accommodationsHeader"
                                        value={data.accommodationsHeader}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accommodationsBody">Description</Label>
                                    <Textarea
                                        id="accommodationsBody"
                                        name="accommodationsBody"
                                        value={data.accommodationsBody}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Section Image URL</Label>
                                <div className="flex gap-2 mb-2">
                                    <Input
                                        name="accommodationsImage"
                                        value={data.accommodationsImage}
                                        onChange={handleInputChange}
                                    />
                                    <Button variant="outline" size="icon" className="shrink-0"><Upload
                                        className="size-4"/></Button>
                                </div>
                                {data.accommodationsImage && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                        <Image src={data.accommodationsImage} alt="Preview" fill
                                               className="object-cover" unoptimized/>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label>Accommodation Types / Features</Label>
                                <Button variant="outline" size="sm" onClick={() => addArrayItem("accommodationsType")}
                                        className="h-8">
                                    <Plus className="size-3 mr-1"/> Add Feature
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {data.accommodationsType.map((type, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input
                                            value={type}
                                            onChange={(e) => handleArrayChange("accommodationsType", idx, e.target.value)}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeArrayItem("accommodationsType", idx)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="size-4"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Leisure (Pool) */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-heading text-lg">Leisure Section</CardTitle>
                        <CardDescription>Rooftop pool and leisure facility details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="leisureHeader">Section Title</Label>
                                    <Input
                                        id="leisureHeader"
                                        name="leisureHeader"
                                        value={data.leisureHeader}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="leisureBody">Description</Label>
                                    <Textarea
                                        id="leisureBody"
                                        name="leisureBody"
                                        value={data.leisureBody}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Leisure Image URL</Label>
                                <div className="flex gap-2 mb-2">
                                    <Input
                                        name="leisureImage"
                                        value={data.leisureImage}
                                        onChange={handleInputChange}
                                    />
                                    <Button variant="outline" size="icon" className="shrink-0"><Upload
                                        className="size-4"/></Button>
                                </div>
                                {data.leisureImage && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                        <Image src={data.leisureImage} alt="Preview" fill className="object-cover"
                                               unoptimized/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Gastronomy */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-heading text-lg">Gastronomy Section</CardTitle>
                        <CardDescription>Dining and culinary excellence highlights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="gastronomyHeader">Section Title</Label>
                                <Input
                                    id="gastronomyHeader"
                                    name="gastronomyHeader"
                                    value={data.gastronomyHeader}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gastronomyBody">Description</Label>
                                <Textarea
                                    id="gastronomyBody"
                                    name="gastronomyBody"
                                    value={data.gastronomyBody}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Gastronomy Gallery Images (URLs)</Label>
                                <Button variant="outline" size="sm" onClick={() => addArrayItem("gastronomyImage")}
                                        className="h-8">
                                    <Plus className="size-3 mr-1"/> Add Image
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.gastronomyImage.map((img, idx) => (
                                    <div key={idx} className="space-y-2 p-3 border rounded-xl bg-muted/30">
                                        <div className="flex gap-2">
                                            <Input
                                                value={img}
                                                onChange={(e) => handleArrayChange("gastronomyImage", idx, e.target.value)}
                                                placeholder="Image URL"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeArrayItem("gastronomyImage", idx)}
                                                className="text-destructive hover:text-destructive shrink-0"
                                            >
                                                <Trash2 className="size-4"/>
                                            </Button>
                                        </div>
                                        {img && (
                                            <div
                                                className="relative aspect-square rounded-lg overflow-hidden border mt-2">
                                                <Image src={img} alt={`Preview ${idx + 1}`} fill
                                                       className="object-cover" unoptimized/>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Floating Save Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <Button
                        size="lg"
                        className="h-14 px-8 shadow-2xl rounded-full bg-primary text-primary-foreground gap-2"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <Loader2 className="size-5 animate-spin"/>
                        ) : (
                            <ImageIcon className="size-5"/>
                        )}
                        Update Facilities Page
                    </Button>
                </div>

            </div>
        </DashboardFrame>
    );
}
