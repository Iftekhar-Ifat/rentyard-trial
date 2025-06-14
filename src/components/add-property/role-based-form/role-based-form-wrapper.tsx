"use client";

import { PropertyType, RoleType } from "@/types/property.type";
import React from "react";
import ProofOfOwnership from "./proof-of-ownership";
import PropertyManagementForm from "./property-management-form";
import RealtorManagementForm from "./realtor-management-form";

type RoleBasedFormProps = {
  propertyType: PropertyType | null;
  roleType: RoleType | null;
};

export default function RoleBasedFormWrapper({
  propertyType,
  roleType,
}: RoleBasedFormProps) {
  if (propertyType === "condominiums" && roleType === "landlord") {
    return <ProofOfOwnership />;
  }

  if (propertyType === "condominiums" && roleType === "realtor") {
    return <RealtorManagementForm />;
  }

  if (propertyType === "condominiums" && roleType === "property-management") {
    return <PropertyManagementForm />;
  }
  return null;
}
