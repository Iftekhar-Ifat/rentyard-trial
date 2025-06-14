import CondominiumInfo from "@/components/condominium-information/condominium-info";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function CondominiumInformationPage() {
  return (
    <MaxWidthWrapper className="flex flex-col flex-grow">
      <CondominiumInfo />
    </MaxWidthWrapper>
  );
}
