"use client";

import { PropertyType, RoleType } from "@/types/property.type";
import React from "react";
// import ProofOfOwnership from "./proof-of-ownership";

type RoleBasedFormProps = {
  propertyType: PropertyType | undefined;
  roleType: RoleType | undefined;
};

export default function RoleBasedFormWrapper({
  propertyType,
  roleType,
}: RoleBasedFormProps) {
  if (propertyType === "condominiums" && roleType === "landlord") {
    return <div>Hello</div>;
  }

  if (propertyType === "condominiums" && roleType === "property-management") {
    return <div>Property management form</div>;
  }

  if (propertyType === "condominiums" && roleType === "realtor") {
    return <div>Retailor management form</div>;
  }
  return null;
}

// This will wrap the main form component
