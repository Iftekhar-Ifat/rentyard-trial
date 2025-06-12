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
