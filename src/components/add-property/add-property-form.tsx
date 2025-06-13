"use client";

import PropertySelectionForm from "./property-selector/property-selection-form";
import RoleSelectionForm from "./role-selector/role-selection-form";
import RoleBasedFormWrapper from "./role-based-form/role-based-form-wrapper";
import AddPropertySubmit from "./add-property-submit";
import { getDynamicSchema } from "@/validation/add-property-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";

export default function AddPropertyForm() {
  const dynamicSchema = getDynamicSchema();

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      propertyType: undefined,
      roleType: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof dynamicSchema>) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between h-[calc(100vh-4.1rem)]">
          <div>
            <PropertySelectionForm control={form.control} />
            {form.watch("propertyType") === "condominiums" && (
              <RoleSelectionForm control={form.control} />
            )}
            <RoleBasedFormWrapper
              propertyType={form.watch("propertyType")}
              roleType={form.watch("roleType")}
            />
          </div>
          <AddPropertySubmit />
        </div>
      </form>
    </Form>
  );
}
