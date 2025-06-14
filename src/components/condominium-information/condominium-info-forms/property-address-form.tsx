import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyAddressSchema } from "@/validation/condominium-info-forms.schema";

type PropertyAddressFormData = z.infer<typeof propertyAddressSchema>;

// Sample data for dropdowns
const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

const states = [
  { value: "tx", label: "Texas" },
  { value: "ca", label: "California" },
  { value: "ny", label: "New York" },
  { value: "fl", label: "Florida" },
  { value: "il", label: "Illinois" },
];

export default function PropertyAddressForm() {
  const form = useForm<PropertyAddressFormData>({
    resolver: zodResolver(propertyAddressSchema),
    defaultValues: {
      propertyName: "",
      totalApartmentUnit: "",
      propertyWebsite: "",
      countryRegion: "",
      streetAddress: "",
      aptSuiteUnit: "",
      cityTown: "",
      stateTerritory: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: PropertyAddressFormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <div className="space-y-6" onSubmit={handleSubmit}>
        {/* First row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="propertyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Property name as identifier
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter property name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalApartmentUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  Total apartment unit
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter total units" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  Property website
                  <span className="text-gray-400 ml-1">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="countryRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  Country/Region
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  Street address
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aptSuiteUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  Apt, suite, unit
                  <span className="text-gray-400 ml-1">(if applicable)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter apt/suite/unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="cityTown"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  City/Town
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter city/town" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stateTerritory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  State/Territory
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium ">
                  Zip code
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter zip code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </Form>
  );
}
