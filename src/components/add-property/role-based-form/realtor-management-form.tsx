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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { realtorManagementSchema } from "@/validation/role-based-form.schema";

type RealtorManagementFormData = z.infer<typeof realtorManagementSchema>;

export default function RealtorManagementForm() {
  const [additionalRealtorFile, setAdditionalRealtorFile] =
    useState<File | null>(null);
  const [landlordAgreementFile, setLandlordAgreementFile] =
    useState<File | null>(null);

  const form = useForm<RealtorManagementFormData>({
    resolver: zodResolver(realtorManagementSchema),
    defaultValues: {
      licenseNumber: "",
      acceptTerms: false,
    },
  });

  const handleAdditionalRealtorFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setAdditionalRealtorFile(file);
      form.setValue("additionalRealtorDoc", file);
      form.clearErrors("additionalRealtorDoc");
    }
  };

  const handleLandlordAgreementFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setLandlordAgreementFile(file);
      form.setValue("landlordAgreement", file);
      form.clearErrors("landlordAgreement");
    }
  };

  const onSubmit = (data: RealtorManagementFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-grow justify-between"
      >
        <div className="flex-1 space-y-4 pt-6">
          <Card className="w-full py-0 gap-0.5">
            <CardHeader className="h-12 bg-muted/50 border-b px-4 py-4">
              <CardTitle className="text-muted-foreground font-medium">
                Realtor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6 p-4">
              {/* License Number Field */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        License Number*
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Document for Realtor (Optional) */}

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="additionalRealtorDoc"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Additional Document for Realtor
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Label
                            htmlFor="additional-realtor-doc"
                            className="flex items-center justify-center py-1 bg-muted/20 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <HugeiconsIcon icon={Upload02Icon} />
                              <span>
                                {additionalRealtorFile
                                  ? additionalRealtorFile.name
                                  : "Upload PDF (Optional)"}
                              </span>
                            </div>
                            <Input
                              id="additional-realtor-doc"
                              type="file"
                              accept=".pdf"
                              className="sr-only"
                              onChange={handleAdditionalRealtorFileChange}
                            />
                          </Label>
                          {additionalRealtorFile && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              Selected file: {additionalRealtorFile.name} (
                              {(
                                additionalRealtorFile.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB)
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Agreement with Landlord (Required) */}
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="landlordAgreement"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Agreement with Landlord*
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Label
                            htmlFor="landlord-agreement"
                            className="flex items-center justify-center py-1 bg-muted/20 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <HugeiconsIcon icon={Upload02Icon} />
                              <span>
                                {landlordAgreementFile
                                  ? landlordAgreementFile.name
                                  : "Upload PDF (Required)"}
                              </span>
                            </div>
                            <Input
                              id="landlord-agreement"
                              type="file"
                              accept=".pdf"
                              className="sr-only"
                              onChange={handleLandlordAgreementFileChange}
                            />
                          </Label>
                          {landlordAgreementFile && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              Selected file: {landlordAgreementFile.name} (
                              {(
                                landlordAgreementFile.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB)
                            </div>
                          )}
                        </div>
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
