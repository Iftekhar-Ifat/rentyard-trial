import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Notification03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div>Hello</div>
      <Button>Hello</Button>
      <HugeiconsIcon icon={Notification03Icon} size={24} />
    </MaxWidthWrapper>
  );
}
