import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-50 w-full">
      <MaxWidthWrapper>
        <div className="container flex h-24 items-center justify-between">
          <Link href="/" className="underline">
            Back
          </Link>
          <Button>Get Started</Button>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
