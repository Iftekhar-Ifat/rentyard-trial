"use client";

import { useState } from "react";
import PropertySelectionForm from "./property-selector/property-selection-form";
import RoleSelectionForm from "./role-selector/role-selection-form";
import { PropertyType, RoleType } from "@/types/property.type";
import RoleBasedFormWrapper from "./role-based-form/role-based-form-wrapper";
import AddPropertySubmit from "./add-property-submit";

export default function AddProperty() {
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [roleType, setRoleType] = useState<RoleType | null>(null);
  return (
    <div className="flex flex-col flex-grow">
      <div>
        <PropertySelectionForm
          value={propertyType}
          onValueChange={setPropertyType}
        />
        {propertyType === "condominiums" && (
          <RoleSelectionForm value={roleType} onValueChange={setRoleType} />
        )}
      </div>
      <RoleBasedFormWrapper propertyType={propertyType} roleType={roleType} />
      {propertyType && roleType ? null : <AddPropertySubmit />}
    </div>
  );
}
