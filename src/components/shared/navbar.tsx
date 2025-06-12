import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/assets/logo.png";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <MaxWidthWrapper>
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Image src={Logo} alt="logo" />
            <span className="sr-only">Rentyard Trial</span>
          </Link>
          <Button variant="outline">Save & Exit</Button>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
