"use client";

import { Control } from "react-hook-form";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  Key02Icon,
  ManagerIcon,
  PermanentJobIcon,
} from "@hugeicons/core-free-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { getDynamicSchema } from "@/validation/add-property-form.schema";

type RoleOption = {
  id: z.infer<ReturnType<typeof getDynamicSchema>>["roleType"];
  title: string;
  description: string;
  icon: IconSvgElement;
};

const roles: RoleOption[] = [
  {
    id: "landlord",
    title: "Landlord",
    description: "Owner of the property",
    icon: Key02Icon,
  },
  {
    id: "realtor",
    title: "Realtor",
    description: "Manage property on behalf of owner",
    icon: ManagerIcon,
  },
  {
    id: "property-management",
    title: "Property management company",
    description: "For management company",
    icon: PermanentJobIcon,
  },
];

type RoleSelectionFormProps = {
  control: Control<z.infer<ReturnType<typeof getDynamicSchema>>>;
};

export default function RoleSelectionForm({ control }: RoleSelectionFormProps) {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold">Select your role</h2>

      <FormField
        control={control}
        name="roleType"
        render={({ field, fieldState }) => (
          <FormItem className="my-4">
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {roles.map((role) => (
                  <div key={role.id} className="relative">
                    <RadioGroupItem
                      value={role.id}
                      id={role.id}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={role.id}
                      className={`flex items-start gap-3 p-6 border rounded-lg cursor-pointer transition-colors ${
                        field.value === role.id
                          ? "border-primary bg-blue-50"
                          : fieldState.error
                          ? "border-red-500"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="h-14 w-14 rounded-lg p-2 transition-colors place-items-center content-center bg-accent">
                        <HugeiconsIcon icon={role.icon} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-medium">{role.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {role.description}
                        </div>
                      </div>
                    </Label>
                  </div>
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
