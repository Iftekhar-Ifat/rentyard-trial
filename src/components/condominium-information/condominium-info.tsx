"use client";

import { useState } from "react";
import CondominiumInfoFooter from "./condominium-info-footer";
import InfoItems from "./condominium-info-items/info-items";
import MaxWidthWrapper from "../shared/max-width-wrapper";

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
  required?: boolean;
};

type FieldConfig = {
  key: CondoInfoFieldKey;
  required: boolean;
};

const FIELD_CONFIGURATIONS: FieldConfig[] = [
  { key: "propertyAddress", required: true },
  { key: "leasingInfo", required: true },
  { key: "charges", required: true },
  { key: "rentFrequency", required: true },
  { key: "applicationAgreement", required: true },
  { key: "aboutProperty", required: false },
  { key: "communityAmenities", required: false },
  { key: "petFees", required: false },
  { key: "parking", required: false },
  { key: "nearestEducational", required: false },
  { key: "nearestStations", required: false },
  { key: "nearestLandmark", required: false },
  { key: "utilitiesProvider", required: false },
];

const INITIAL_FIELDS_STATE: Record<CondoInfoFieldKey, CondoInfoFieldState> =
  Object.fromEntries(
    FIELD_CONFIGURATIONS.map(({ key, required }) => [
      key,
      { added: false, required },
    ])
  );

export default function CondominiumInfo() {
  const [fields, setFields] = useState(INITIAL_FIELDS_STATE);

  const markAdded = (key: CondoInfoFieldKey, data: unknown) =>
    setFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], added: true, data },
    }));

  return (
    <div className="flex flex-col flex-grow">
      <MaxWidthWrapper>
        <div className="my-10">
          <h2 className="text-3xl font-semibold">Condominiums information</h2>
          <InfoItems fields={fields} onAdd={markAdded} />
        </div>
      </MaxWidthWrapper>

      <CondominiumInfoFooter />
    </div>
  );
}
