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
import { chargesSchema } from "@/validation/condominium-info-forms.schema";

type ChargesFormData = z.infer<typeof chargesSchema>;

const applicationFeeOptions = [
  "All 18+ applicant",
  "Per applicant",
  "Per application",
  "Flat rate",
];

type ChargesFormProps = {
  initialData?: Partial<ChargesFormData>;
  onSubmit: (data: ChargesFormData) => void;
};

export default function ChargesForm({
  initialData,
  onSubmit,
}: ChargesFormProps) {
  const form = useForm<ChargesFormData>({
    resolver: zodResolver(chargesSchema),
    defaultValues: {
      applicationFee: initialData?.applicationFee ?? "",
      adminFee: initialData?.adminFee ?? "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Application Fee and Admin Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="applicationFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Application fee (one-time)
                  <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="All 18+ Applicant" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {applicationFeeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
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
            name="adminFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Admin fee (one-time)<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Info Message */}
        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
            i
          </div>
          <p>Type 0 if charges not applicable</p>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </form>
    </Form>
  );
}
