"use client";

import { useState } from "react";
import CondominiumInfoFooter from "./condominium-info-footer";
import InfoItems from "./condominium-info-items/info-items";

export type CondoInfoFieldKey =
  | "propertyAddress"
  | "leasingInfo"
  | "charges"
  | "rentFrequency"
  | "applicationAgreement"
  | "aboutProperty"
  | "communityAmenities"
  | "petFees"
  | "parking"
  | "nearestEducational"
  | "nearestStations"
  | "nearestLandmark"
  | "utilitiesProvider";

export type CondoInfoFieldState = {
  added: boolean;
  data?: unknown;
};

export default function CondominiumInfo() {
  const [fields, setFields] = useState<
    Record<CondoInfoFieldKey, CondoInfoFieldState>
  >(
    Object.fromEntries(
      [
        "propertyAddress",
        "leasingInfo",
        "charges",
        "rentFrequency",
        "applicationAgreement",
        "aboutProperty",
        "communityAmenities",
        "petFees",
        "parking",
        "nearestEducational",
        "nearestStations",
        "nearestLandmark",
        "utilitiesProvider",
      ].map((k) => [k, { added: false }])
    ) as Record<CondoInfoFieldKey, CondoInfoFieldState>
  );

  const markAdded = (key: CondoInfoFieldKey, data: unknown) =>
    setFields((prev) => ({ ...prev, [key]: { added: true, data } }));

  return (
    <div className="flex flex-col flex-grow">
      <div className="my-10">
        <h2 className="text-3xl font-semibold">Condominiums information</h2>
        <InfoItems fields={fields} onAdd={markAdded} />
      </div>
      <CondominiumInfoFooter />
    </div>
  );
}
