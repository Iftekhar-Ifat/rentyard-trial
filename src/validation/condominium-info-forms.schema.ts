import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const propertyAddressSchema = z.object({
  propertyName: z.string().min(1, "Property name is required"),
  totalApartmentUnit: z.string().min(1, "Total apartment unit is required"),
  propertyWebsite: z.string().url("Invalid URL").optional().or(z.literal("")),
  countryRegion: z.string().min(1, "Country/Region is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  aptSuiteUnit: z.string().optional(),
  cityTown: z.string().min(1, "City/Town is required"),
  stateTerritory: z.string().min(1, "State/Territory is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

export const leasingInfoSchema = z.object({
  managerName: z.string().min(1, "Leasing manager name is required"),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  email: z.string().email("Please enter a valid email address"),
  sameAsProperty: z.boolean(),
  streetAddress: z.string().min(1, "Street address is required"),
  aptSuitUnit: z.string().optional(),
  cityTown: z.string().min(1, "City/Town is required"),
  stateTerritory: z.string().min(1, "Please select a state/territory"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
});

export const chargesSchema = z.object({
  applicationFee: z.string().min(1, "Application fee is required"),
  adminFee: z.string().min(1, "Admin fee is required"),
});

export const rentFrequencySchema = z.object({
  rentPaymentFrequency: z.string().min(1, "Rent payment frequency is required"),
  rentReminderDate: z.date({
    required_error: "Rent reminder date is required",
  }),
  rentDueDate: z.date({
    required_error: "Rent due date is required",
  }),
});
