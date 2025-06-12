import PropertySelectionForm from "@/components/property-selector/property-selection-form";
import RoleSelectionForm from "@/components/role-selector/role-selection-form";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <PropertySelectionForm />
      <RoleSelectionForm />
    </MaxWidthWrapper>
  );
}
