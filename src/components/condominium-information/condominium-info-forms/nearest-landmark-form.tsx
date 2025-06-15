"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { landmarkSchema } from "@/validation/condominium-info-forms.schema";

type LandmarkFormData = z.infer<typeof landmarkSchema>;

type LandmarkFormProps = {
  initialData?: Partial<LandmarkFormData>;
  onSubmit: (data: LandmarkFormData) => void;
};

const landmarkTypes = ["Museum", "Park", "School", "Hospital", "Other"];

export default function NearestLandmarkForm({
  initialData,
  onSubmit,
}: LandmarkFormProps) {
  const form = useForm<LandmarkFormData>({
    resolver: zodResolver(landmarkSchema),
    defaultValues: {
      landmarkType: initialData?.landmarkType ?? "",
      distance: initialData?.distance ?? "",
      distanceUnit: initialData?.distanceUnit ?? "Mile",
      landmarkName: initialData?.landmarkName ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 rounded-lg"
      >
        {/* Landmark type & Distance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="landmarkType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Landmark type<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a landmark type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {landmarkTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Distance from property
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distanceUnit"
              render={({ field }) => (
                <FormItem className="pt-[38px]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mile">Mile</SelectItem>
                      <SelectItem value="Km">Km</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Landmark Name */}
        <FormField
          control={form.control}
          name="landmarkName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Landmark name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" className="w-[80px]">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
