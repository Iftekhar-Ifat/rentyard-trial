"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { parkingSchema } from "@/validation/condominium-info-forms.schema";

type ParkingFormData = z.infer<typeof parkingSchema>;

type ParkingFormProps = {
  initialData?: Partial<ParkingFormData>;
  onSubmit: (data: ParkingFormData) => void;
};

const parkingTimeOptions = ["1H", "2H", "3H", "4H", "6H", "12H", "24H"];

export default function ParkingForm({
  initialData,
  onSubmit,
}: ParkingFormProps) {
  const form = useForm<ParkingFormData>({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      parkingTime: initialData?.parkingTime ?? "2H",
      parkingOverview: initialData?.parkingOverview ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 rounded-lg"
      >
        {/* Parking Time */}
        <FormField
          control={form.control}
          name="parkingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest vehicle parking time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parkingTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parking Overview */}
        <FormField
          control={form.control}
          name="parkingOverview"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write parking overview"
                  className="resize-none"
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <div className="text-right text-xs text-muted-foreground">
                {field.value?.length || 0}/200
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button type="submit" className="w-[80px]">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
