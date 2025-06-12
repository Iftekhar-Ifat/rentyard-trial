import { PropertyType, RoleType } from "@/types/property.type";
import { z } from "zod";

export const baseSchema = z.object({
  propertyType: z.enum(["single-house", "apartments", "condominiums"], {
    required_error: "Please select a property type.",
  }),
  roleType: z.enum(["landlord", "realtor", "property-management"], {
    required_error: "Please select a role.",
  }),
});

export const proofOfOwnershipSchema = z.object({
  ownershipDoc: z
    .instanceof(File, { message: "Please upload an ownership document" })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB limit
      { message: "File size must be less than 10MB" }
    ),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

// change later
const landlordExtraSchema = z.object({
  landlordLicenseNumber: z.string().min(1, "License number is required"),
});

// Change later
const realtorExtraSchema = z.object({
  realtorAgencyName: z.string().min(1, "Agency name is required"),
});

export function getDynamicSchema(
  propertyType?: PropertyType,
  roleType?: RoleType
) {
  let schema = baseSchema;

  if (propertyType === "condominiums" && roleType === "landlord") {
    schema = schema.merge(proofOfOwnershipSchema).merge(landlordExtraSchema);
  } else if (propertyType === "condominiums" && roleType === "realtor") {
    schema = schema.merge(proofOfOwnershipSchema).merge(realtorExtraSchema);
  } else if (propertyType === "single-house") {
    schema = schema.merge(proofOfOwnershipSchema);
  }
  // Add more cases as needed

  return schema;
}
