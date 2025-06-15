import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { aboutPropertySchema } from "@/validation/condominium-info-forms.schema";

type AboutPropertyFormData = z.infer<typeof aboutPropertySchema>;

type AboutPropertyFormProps = {
  initialData?: Partial<AboutPropertyFormData>;
  onSubmit: (data: AboutPropertyFormData) => void;
};

export default function AboutPropertyForm({
  initialData,
  onSubmit,
}: AboutPropertyFormProps) {
  const form = useForm<AboutPropertyFormData>({
    resolver: zodResolver(aboutPropertySchema),
    defaultValues: {
      description: initialData?.description ?? "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the property in detail (optional)..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("description") && (
          <div className="text-sm text-muted-foreground">
            {(form.watch("description") ?? "").length}/500 characters
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </form>
    </Form>
  );
}
