import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { rentFrequencySchema } from "@/validation/condominium-info-forms.schema";

type RentFrequencyFormData = z.infer<typeof rentFrequencySchema>;

const paymentFrequencies = [
  "Monthly",
  "Weekly",
  "Bi-weekly",
  "Quarterly",
  "Annually",
];

type RentFrequencyFormProps = {
  initialData?: Partial<RentFrequencyFormData>;
  onSubmit: (data: RentFrequencyFormData) => void;
};

export default function RentFrequencyForm({
  initialData,
  onSubmit,
}: RentFrequencyFormProps) {
  const form = useForm<RentFrequencyFormData>({
    resolver: zodResolver(rentFrequencySchema),
    defaultValues: {
      rentPaymentFrequency: initialData?.rentPaymentFrequency ?? "",
      rentReminderDate: initialData?.rentReminderDate ?? undefined,
      rentDueDate: initialData?.rentDueDate ?? undefined,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Frequency */}
        <FormField
          control={form.control}
          name="rentPaymentFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Rent payment frequency<span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Monthly" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentFrequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reminder Date and Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rentReminderDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Rent Reminder/Statement date
                  <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "do 'Every month'")
                        ) : (
                          <span>25th Every month</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rentDueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Rent due date<span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "do 'Every month'")
                        ) : (
                          <span>5th Every month</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </form>
    </Form>
  );
}
