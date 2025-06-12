import React from "react";
import PropertySelectionForm from "./property-selector/property-selection-form";
import RoleSelectionForm from "./role-selector/role-selection-form";

export default function AddProperty() {
  return (
    <div>
      <PropertySelectionForm />
      <RoleSelectionForm />
    </div>
  );
}
