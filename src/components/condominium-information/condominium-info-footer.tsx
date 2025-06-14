import Link from "next/link";
import { Button } from "../ui/button";
import MaxWidthWrapper from "../shared/max-width-wrapper";

export default function CondominiumInfoFooter() {
  return (
    <div className="w-full flex-grow content-end">
      <div className="flex w-full">
        <div className="w-full h-1 bg-black rounded-xs"></div>
        <div className="w-4 bg-white"></div>
        <div className="w-full bg-muted rounded-xs"></div>
      </div>
      <MaxWidthWrapper>
        <div className="container flex h-24 items-center justify-between">
          <Link href="/" className="underline">
            Back
          </Link>
          <Button>Next</Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
