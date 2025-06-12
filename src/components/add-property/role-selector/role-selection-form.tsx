"use client";

import { useState } from "react";
import { RoleTypeSelector } from "./role-type-selector";
import { RoleType } from "@/types/property.type";

export default function RoleSelectionForm() {
  const [roleType, setRoleType] = useState<RoleType | null>(null);

  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold">Select your role</h2>
      <RoleTypeSelector value={roleType} onValueChange={setRoleType} />
    </div>
  );
}
