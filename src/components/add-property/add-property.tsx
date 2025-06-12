"use client";

import { useState } from "react";
import PropertySelectionForm from "./property-selector/property-selection-form";
import RoleSelectionForm from "./role-selector/role-selection-form";
import { PropertyType, RoleType } from "@/types/property.type";
import RoleBasedFormWrapper from "./role-based-form/role-based-form-wrapper";

export default function AddProperty() {
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [roleType, setRoleType] = useState<RoleType | null>(null);
  return (
    <div>
      <PropertySelectionForm
        value={propertyType}
        onValueChange={setPropertyType}
      />
      {propertyType === "condominiums" && (
        <RoleSelectionForm value={roleType} onValueChange={setRoleType} />
      )}
      <RoleBasedFormWrapper propertyType={propertyType} roleType={roleType} />
    </div>
  );
}
