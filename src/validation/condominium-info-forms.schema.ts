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
