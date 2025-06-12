"use client";

import type React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Building03Icon,
  Building06Icon,
  Home03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { PropertyType } from "../../../types/property.type";

type PropertyTypeOption = {
  id: PropertyType;
  title: string;
  description: string;
  icon: IconSvgElement;
};

// might come from db/api
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

type PropertyTypeSelectorProps = {
  value: PropertyType | null;
  onValueChange?: (value: PropertyType) => void;
};

export function PropertyTypeSelector({
  value,
  onValueChange,
}: PropertyTypeSelectorProps) {
  return (
    <div className="my-4">
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {propertyTypes.map((type) => {
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
