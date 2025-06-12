"use client";

import type React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Key02Icon,
  ManagerIcon,
  PermanentJobIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { RoleType } from "../../../types/property.type";

type RoleOption = {
  id: RoleType;
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
    description: "Manage property on behalf on owner",
    icon: ManagerIcon,
  },
  {
    id: "property-management",
    title: "Property management company",
    description: "For management company",
    icon: PermanentJobIcon,
  },
];

type RoleTypeSelectorProps = {
  value: RoleType | null;
  onValueChange: (value: RoleType) => void;
};

export function RoleTypeSelector({
  value,
  onValueChange,
}: RoleTypeSelectorProps) {
  return (
    <div className="my-4">
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {roles.map((type) => {
          return (
            <div key={type.id} className="relative">
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className="sr-only"
              />
              <Label
                htmlFor={type.id}
                className={`flex items-start gap-3 p-6 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                  value === type.id
                    ? "border-primary bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="h-14 w-14 rounded-lg p-2 transition-colors place-items-center content-center bg-accent">
                  <HugeiconsIcon icon={type.icon} />
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-medium">{type.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {type.description}
                  </div>
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
