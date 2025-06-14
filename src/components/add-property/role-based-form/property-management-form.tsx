"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { propertyManagementSchema } from "@/validation/role-based-form.schema";

type PropertyManagementFormData = z.infer<typeof propertyManagementSchema>;

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
];

export default function PropertyManagementForm() {
  const [agreementFile, setAgreementFile] = useState<File | null>(null);

  const form = useForm<PropertyManagementFormData>({
    resolver: zodResolver(propertyManagementSchema),
    defaultValues: {
      companyName: "",
      companyIdentifier: "",
      jobTitle: "",
      countryRegion: "",
      streetAddress: "",
      aptSuitUnit: "",
      phoneNumber: "",
      contactEmail: "",
      cityTown: "",
      stateTerritory: "",
      zipCode: "",
      acceptTerms: false,
    },
  });

  const handleAgreementFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setAgreementFile(file);
      form.setValue("agreementDocument", file);
      form.clearErrors("agreementDocument");
    }
  };

  const onSubmit = (data: PropertyManagementFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-grow justify-between mx-auto"
      >
        <div className="flex-1 space-y-6">
          <Card className="w-full py-0 gap-0.5">
            <CardHeader className="h-12 bg-muted/50 border-b px-4 py-4">
              <CardTitle className="text-muted-foreground font-medium">
                Company & office info
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6 p-4 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Row 1 */}
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Company name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Runyan trade center"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyIdentifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Company Identifier(EIN/TIN)*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Your job title*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Manager"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreementDocument"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Agreement with landlord/owner*
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Label
                            htmlFor="agreement-doc"
                            className="flex items-center w-full justify-center py-2.5 bg-muted/20 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <HugeiconsIcon
                                icon={Upload02Icon}
                                className="h-4 w-4"
                              />
                              <span className="text-xs">
                                {agreementFile
                                  ? agreementFile.name
                                  : "(Pdf only)"}
                              </span>
                            </div>
                            <Input
                              id="agreement-doc"
                              type="file"
                              accept=".pdf"
                              className="sr-only"
                              onChange={handleAgreementFileChange}
                            />
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Row 2 */}
                <FormField
                  control={form.control}
                  name="countryRegion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Country/Region*
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        Street address*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="111 Austin Ave"
                          {...field}
                          className="w-full"
                        />
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        Apt, suit, unit (if applicable)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="3050"
                          {...field}
                          className="w-full"
                        />
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        Phone number*
                      </FormLabel>
                      <FormControl>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                            <span className="w-4 h-3 rounded-sm mr-2"></span>
                            <span className="text-sm">+880</span>
                          </div>
                          <Input
                            placeholder="+880"
                            {...field}
                            className="rounded-l-none border-l-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Row 3 */}
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Contact email*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="majarul2025@gmail.com"
                          type="email"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cityTown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        City/Town*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dallas"
                          {...field}
                          className="w-full"
                        />
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        State/Territory*
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        Zip code*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="75061"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal leading-tight">
                    Accept RentYard property adding terms & condition
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <div className="container flex h-24 items-center justify-between">
            <Link href="/" className="underline">
              Back
            </Link>
            <Button type="submit">Get Started</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
