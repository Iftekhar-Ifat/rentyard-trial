import { z } from "zod";

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

export const realtorManagementSchema = z.object({
  licenseNumber: z
    .string()
    .min(1, "License number is required")
    .regex(/^\d+$/, { message: "License number must contain only digits" })
    .trim(),
  additionalRealtorDoc: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
  landlordAgreement: z
    .instanceof(File)
    .refine((file) => file !== undefined, "Landlord agreement is required")
    .refine((file) => file?.type === "application/pdf", {
      message: "File must be a PDF",
    }),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const propertyManagementSchema = z.object({
  companyName: z.string().min(1, "Company name is required").trim(),
  companyIdentifier: z.string().min(1, "Company identifier is required").trim(),
  jobTitle: z.string().min(1, "Job title is required").trim(),
  agreementDocument: z
    .instanceof(File)
    .refine((file) => file !== undefined, "Agreement document is required")
    .refine((file) => file?.type === "application/pdf", "File must be a PDF"),
  countryRegion: z.string().min(1, "Country/Region is required"),
  streetAddress: z.string().min(1, "Street address is required").trim(),
  aptSuitUnit: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required").trim(),
  contactEmail: z
    .string()
    .min(1, "Contact email is required")
    .email("Please enter a valid email address"),
  cityTown: z.string().min(1, "City/Town is required").trim(),
  stateTerritory: z.string().min(1, "State/Territory is required"),
  zipCode: z.string().min(1, "Zip code is required").trim(),
  acceptTerms: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the terms and conditions"
    ),
});
