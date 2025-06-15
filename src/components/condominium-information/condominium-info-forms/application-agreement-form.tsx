import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01FreeIcons } from "@hugeicons/core-free-icons";
import { agreementSchema } from "@/validation/condominium-info-forms.schema";

type AgreementFormData = z.infer<typeof agreementSchema>;

type AgreementFormProps = {
  initialData?: Partial<AgreementFormData>;
  onSubmit: (data: AgreementFormData) => void;
};

export default function ApplicationAgreementForm({
  initialData,
  onSubmit,
}: AgreementFormProps) {
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const form = useForm<AgreementFormData>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      agreementFile: undefined,
      acceptApplications: initialData?.acceptApplications ?? false,
    },
  });

  const handleFileChange = (
    files: FileList | null,
    onChange: (files: FileList | null) => void
  ) => {
    if (files && files.length > 0) {
      setUploadedFileName(files[0].name);
      onChange(files);
    } else {
      setUploadedFileName("");
      onChange(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Agreement Upload Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            Application agreement (optional)
          </h3>

          <FormField
            control={form.control}
            name="agreementFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <HugeiconsIcon icon={Upload01FreeIcons} />
                  {uploadedFileName ? (
                    <div className="text-center">
                      <span className="font-medium">{uploadedFileName}</span>
                      <p className="text-sm text-gray-500 mt-1">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-gray-600">
                        Upload agreement
                      </span>
                      <span className="text-sm text-gray-500">(Pdf only)</span>
                    </>
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e.target.files, field.onChange)
                      }
                    />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Checkbox Section */}
        <FormField
          control={form.control}
          name="acceptApplications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Accept immigrant & international student application
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </form>
    </Form>
  );
}
