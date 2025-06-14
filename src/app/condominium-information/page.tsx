import CondominiumInformation from "@/components/condominium-information/condominium-information";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function CondominiumInformationPage() {
  return (
    <MaxWidthWrapper className="flex flex-col flex-grow">
      <CondominiumInformation />
    </MaxWidthWrapper>
  );
}
