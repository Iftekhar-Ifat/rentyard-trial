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
import { petFeesSchema } from "@/validation/condominium-info-forms.schema";

type PetFeesFormData = z.infer<typeof petFeesSchema>;

const petTypes = ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Hamster", "Other"];

type PetFeesFormProps = {
  initialData?: Partial<PetFeesFormData>;
  onSubmit: (data: PetFeesFormData) => void;
};

export default function PetFeesForm({
  initialData,
  onSubmit,
}: PetFeesFormProps) {
  const form = useForm<PetFeesFormData>({
    resolver: zodResolver(petFeesSchema),
    defaultValues: {
      petType: initialData?.petType ?? "",
      maxWeight: initialData?.maxWeight ?? "",
      oneTimePetFee: initialData?.oneTimePetFee ?? "",
      petSecurityDeposit: initialData?.petSecurityDeposit ?? "",
      monthlyPetRent: initialData?.monthlyPetRent ?? "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="petType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pet type<span className="text-red-500">*</span>
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
                    {petTypes.map((type) => (
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
            name="maxWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Max weight(LB)<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Fee Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="oneTimePetFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  One time pet fee<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="$100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petSecurityDeposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pet Security Deposit<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="$100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyPetRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Monthly pet rent<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="$100" {...field} />
                </FormControl>
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
