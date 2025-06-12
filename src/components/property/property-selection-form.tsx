"use client";

import { useState } from "react";
import { PropertyTypeSelector } from "./property-type-selector";
import { PropertyType } from "../../../types/property.type";

export default function PropertySelectionForm() {
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);

  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold">Property type</h2>
      <PropertyTypeSelector
        value={propertyType}
        onValueChange={setPropertyType}
      />
    </div>
  );
}
