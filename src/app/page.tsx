import AddProperty from "@/components/add-property/add-property";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col flex-grow">
      <AddProperty />
    </MaxWidthWrapper>
  );
}
