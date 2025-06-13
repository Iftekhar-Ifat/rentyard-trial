"use client";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building03Icon,
  Building06Icon,
  Home03Icon,
} from "@hugeicons/core-free-icons";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getDynamicSchema } from "@/validation/add-property-form.schema";
import { z } from "zod";

type PropertyTypeOption = {
  id: z.infer<ReturnType<typeof getDynamicSchema>>["propertyType"];
  title: string;
  description: string;
  icon: IconSvgElement;
};

const propertyTypes: PropertyTypeOption[] = [
  {
    id: "single-house",
    title: "Single House Property",
    description: "Single unit house for single family",
    icon: Home03Icon,
  },
  {
    id: "apartments",
    title: "Apartments complex",
    description: "Multiple unit house for families",
    icon: Building03Icon,
  },
  {
    id: "condominiums",
    title: "Condominiums",
    description: "Multiple unit house for families",
    icon: Building06Icon,
  },
];

type PropertySelectionFormProps = {
  control: Control<z.infer<ReturnType<typeof getDynamicSchema>>>;
};

export default function PropertySelectionForm({
  control,
}: PropertySelectionFormProps) {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold">Property type</h2>

      <FormField
        control={control}
        name="propertyType"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4"
              >
                {propertyTypes.map((type) => (
                  <Label
                    key={type.id}
                    htmlFor={type.id}
                    className={cn(
                      "flex items-start gap-3 p-6 border rounded-lg cursor-pointer transition-colors",
                      field.value === type.id
                        ? "border-primary bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50",
                      fieldState.invalid && !field.value && "border-red-500"
                    )}
                  >
                    <RadioGroupItem
                      value={type.id}
                      id={type.id}
                      className="sr-only"
                    />
                    <div className="h-14 w-14 rounded-lg p-2 bg-accent grid place-items-center">
                      <HugeiconsIcon icon={type.icon} />
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="text-lg font-medium">{type.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
