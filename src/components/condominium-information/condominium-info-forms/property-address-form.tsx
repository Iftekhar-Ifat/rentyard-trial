"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const propertyAddressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postalCode: z
    .string()
    .regex(/^\d{4,6}$/, "Postal code must be 4–6 digits")
    .optional(),
});

export type PropertyAddressFormValues = z.infer<typeof propertyAddressSchema>;

type PropertyAddressFormProps = {
  initialData?: Partial<PropertyAddressFormValues>;
  onSubmit: (data: PropertyAddressFormValues) => void;
};

export default function PropertyAddressForm({
  initialData,
  onSubmit,
}: PropertyAddressFormProps) {
  const form = useForm<PropertyAddressFormValues>({
    resolver: zodResolver(propertyAddressSchema),
    defaultValues: {
      address: initialData?.address ?? "",
      city: initialData?.city ?? "",
      postalCode: initialData?.postalCode ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="PropertyAddressForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Street Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Bangkok" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Postal Code */}
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code (optional)</FormLabel>
              <FormControl>
                <Input placeholder="10110" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
  );
}
