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
import { utilityProviderSchema } from "@/validation/condominium-info-forms.schema";

type UtilityProviderFormData = z.infer<typeof utilityProviderSchema>;

type UtilityProviderFormProps = {
  initialData?: Partial<UtilityProviderFormData>;
  onSubmit: (data: UtilityProviderFormData) => void;
};

const utilityTypes = ["Electricity", "Water", "Gas", "Internet", "Other"];

export default function UtilitiesProviderForm({
  initialData,
  onSubmit,
}: UtilityProviderFormProps) {
  const form = useForm<UtilityProviderFormData>({
    resolver: zodResolver(utilityProviderSchema),
    defaultValues: {
      utilityType: initialData?.utilityType ?? "",
      providerCompanyName: initialData?.providerCompanyName ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="utilityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Utility type<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {utilityTypes.map((type) => (
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

          <FormField
            control={form.control}
            name="providerCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Provider company name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="w-[80px]">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
