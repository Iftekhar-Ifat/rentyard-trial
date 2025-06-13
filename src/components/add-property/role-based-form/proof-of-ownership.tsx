/* "use client";

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
import { proofOfOwnershipSchema } from "@/validation/add-property-form.schema";

type ProofOfOwnershipFormData = z.infer<typeof proofOfOwnershipSchema>;

export default function ProofOfOwnership() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ProofOfOwnershipFormData>({
    resolver: zodResolver(proofOfOwnershipSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("ownershipDoc", file);
      form.clearErrors("ownershipDoc");
    }
  };

  const onSubmit = (data: ProofOfOwnershipFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="w-full py-2 gap-0.5">
          <CardHeader className="bg-muted/50 h-10 border-b px-4 py-2">
            <CardTitle className="text-muted-foreground font-medium">
              Proof of ownership
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <FormField
              control={form.control}
              name="ownershipDoc"
              render={() => (
                <FormItem>
                  <FormLabel className="font-medium">Ownership doc*</FormLabel>
                  <FormControl>
                    <div>
                      <Label
                        htmlFor="ownership-doc"
                        className="flex items-center w-md justify-center py-2 bg-muted/20 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <HugeiconsIcon icon={Upload02Icon} />
                          <span>
                            {selectedFile
                              ? selectedFile.name
                              : "Upload PDF (PDF only)"}
                          </span>
                        </div>
                        <Input
                          id="ownership-doc"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </Label>
                      {selectedFile && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          Selected file: {selectedFile.name} (
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </form>
    </Form>
  );
}
 */
