import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01FreeIcons } from "@hugeicons/core-free-icons";

const amenitiesSchema = z.object({
  selectedAmenities: z.array(z.string()).min(0, "Select at least one amenity"),
});

type AmenitiesFormData = z.infer<typeof amenitiesSchema>;

const availableAmenities = [
  { id: "air-conditioning", name: "Air conditioning", icon: "❄️" },
  { id: "cable-ready", name: "Cable ready", icon: "📺" },
  { id: "ceiling-fan", name: "Ceiling fan", icon: "🌀" },
  { id: "high-ceilings", name: "High ceilings", icon: "🏢" },
  { id: "private-balcony", name: "Private balcony", icon: "🏠" },
  { id: "refrigerator", name: "Refrigerator", icon: "🧊" },
  { id: "wooded-views", name: "Wooded views", icon: "🌲" },
  { id: "wd-hookup", name: "W/D hookup", icon: "🔌" },
  { id: "hardwood-floor-home", name: "Hardwood Floor (home)", icon: "🪵" },
  { id: "hardwood-floor-home-alt", name: "Hardwood Floor (home)", icon: "🪵" },
  { id: "fireplace-home", name: "Fireplace (home)", icon: "🔥" },
  { id: "first-aid-kit", name: "First aid kit", icon: "🩹" },
  { id: "carbon-monoxide-alarm", name: "Carbon monoxide alarm", icon: "⚠️" },
  { id: "expanded-patios-home", name: "Expanded patios (home)", icon: "🏡" },
  { id: "free-parking-premises", name: "Free parking on premises", icon: "🅿️" },
  { id: "fire-extinguisher", name: "Fire extinguisher", icon: "🧯" },
];

type AmenitiesFormProps = {
  initialData?: Partial<AmenitiesFormData>;
  onSubmit: (data: AmenitiesFormData) => void;
};

export default function CommunityAmenitiesForm({
  initialData,
  onSubmit,
}: AmenitiesFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialData?.selectedAmenities ?? []
  );

  const form = useForm<AmenitiesFormData>({
    resolver: zodResolver(amenitiesSchema),
    defaultValues: {
      selectedAmenities: initialData?.selectedAmenities ?? [],
    },
  });

  // Filter amenities based on search term
  const filteredAmenities = useMemo(() => {
    return availableAmenities.filter((amenity) =>
      amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleAmenityToggle = (amenityId: string) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter((id) => id !== amenityId)
      : [...selectedAmenities, amenityId];

    setSelectedAmenities(updatedAmenities);
    form.setValue("selectedAmenities", updatedAmenities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <HugeiconsIcon
            icon={Search01FreeIcons}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          />
          <Input
            type="text"
            placeholder="Search amenities"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Amenities Grid */}
        <FormField
          control={form.control}
          name="selectedAmenities"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredAmenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                        selectedAmenities.includes(amenity.id)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span className="text-lg">{amenity.icon}</span>
                      <span className="text-sm font-medium">
                        {amenity.name}
                      </span>
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </form>
    </Form>
  );
}
