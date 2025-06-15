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

export const agreementSchema = z
  .object({
    agreementFile: z
      .custom<FileList>()
      .optional()
      .refine(
        (files) =>
          !files || files.length === 0 || files[0]?.type === "application/pdf",
        {
          message: "Only PDF files are allowed",
        }
      ),
    acceptApplications: z.boolean(),
  })
  .required({
    acceptApplications: true,
  });

export const aboutPropertySchema = z.object({
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

export const petFeesSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  maxWeight: z.string().min(1, "Max weight is required"),
  oneTimePetFee: z.string().min(1, "One time pet fee is required"),
  petSecurityDeposit: z.string().min(1, "Pet security deposit is required"),
  monthlyPetRent: z.string().min(1, "Monthly pet rent is required"),
});

export const parkingSchema = z.object({
  parkingTime: z.enum(["1H", "2H", "3H", "4H", "6H", "12H", "24H"], {
    required_error: "Parking time is required",
  }),
  parkingOverview: z
    .string()
    .max(200, "Maximum 200 characters allowed")
    .optional(),
});

export const educationSchema = z.object({
  institutionType: z.enum(
    [
      "Preschool",
      "Elementary",
      "Middle school",
      "High school",
      "College",
      "University",
    ],
    { required_error: "Institution type is required" }
  ),
  distance: z.string().min(1, "Distance is required"),
  distanceUnit: z.enum(["Mile", "Km"], { required_error: "Unit is required" }),
  institutionName: z.string().min(1, "Institution name is required"),
});

export const stationSchema = z.object({
  stationType: z.enum(["Bus", "Train", "Metro", "Subway", "Tram", "Other"], {
    required_error: "Station type is required",
  }),
  distance: z.string().min(1, "Distance is required"),
  distanceUnit: z.enum(["Mile", "Km"], { required_error: "Unit is required" }),
  stationName: z.string().min(1, "Station name is required"),
});

export const landmarkSchema = z.object({
  landmarkType: z.string().min(1, "Landmark type is required"),
  distance: z.string().min(1, "Distance is required"),
  distanceUnit: z.string().min(1, "Distance unit is required"),
  landmarkName: z.string().min(1, "Landmark name is required"),
});
