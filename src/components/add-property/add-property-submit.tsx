import React from "react";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AddPropertySubmit() {
  return (
    <div className="w-full">
      <MaxWidthWrapper>
        <div className="container flex h-24 items-center justify-between">
          <Link href="/" className="underline">
            Back
          </Link>
          <Button type="submit">Get Started</Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
