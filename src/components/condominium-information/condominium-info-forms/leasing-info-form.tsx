import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { PhoneInput } from "@/components/ui/phone-input";
import { leasingInfoSchema } from "@/validation/condominium-info-forms.schema";

type LeasingInfoFormData = z.infer<typeof leasingInfoSchema>;

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
];

type LeasingInfoFormProps = {
  initialData?: Partial<LeasingInfoFormData>;
  onSubmit: (data: LeasingInfoFormData) => void;
};

export default function LeasingInfoForm({
  initialData,
  onSubmit,
}: LeasingInfoFormProps) {
  const form = useForm<LeasingInfoFormData>({
    resolver: zodResolver(leasingInfoSchema),
    defaultValues: {
      managerName: initialData?.managerName ?? "",
      phoneNumber: initialData?.phoneNumber ?? "",
      email: initialData?.email ?? "",
      sameAsProperty: initialData?.sameAsProperty ?? false,
      streetAddress: initialData?.streetAddress ?? "",
      aptSuitUnit: initialData?.aptSuitUnit ?? "",
      cityTown: initialData?.cityTown ?? "",
      stateTerritory: initialData?.stateTerritory ?? "",
      zipCode: initialData?.zipCode ?? "",
    },
  });

  const watchSameAsProperty = form.watch("sameAsProperty");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Manager Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Leasing manager name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Alex Johan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Leasing manager Phone number
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PhoneInput placeholder="Enter a phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Leasing manager email<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="leasing@rentyeard.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Same as Property Checkbox */}
        <FormField
          control={form.control}
          name="sameAsProperty"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Address (same as property)</FormLabel>
            </FormItem>
          )}
        />

        {/* Address Fields - Only show if not same as property */}
        {!watchSameAsProperty && (
          <>
            {/* Street Address and Apt/Suite */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Street address<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="111 Austin Ave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aptSuitUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apt, suite, unit</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* City and State/Territory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cityTown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City/Town<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Dallas" {...field} />
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
                    <FormLabel>
                      State/Territory<span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Choose state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Zip Code */}
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>
                    Zip code<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="75061" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </form>
    </Form>
  );
}
