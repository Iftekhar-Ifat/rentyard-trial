"use client";

import { useState } from "react";
import CondominiumInfoFooter from "./condominium-info-footer";
import InfoItems from "./condominium-info-items/info-items";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import PropertyGallery from "./property-gallery/property-gallery";

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
  | "utilitiesProvider"
  | "propertyGallery";

export type CondoInfoFieldState = {
  added: boolean;
  data?: unknown;
  required?: boolean;
};

export type GalleryData = {
  cover: File | null;
  more: File[];
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
  { key: "applicationAgreement", required: false },
  { key: "aboutProperty", required: false },
  { key: "communityAmenities", required: false },
  { key: "petFees", required: false },
  { key: "parking", required: false },
  { key: "nearestEducational", required: false },
  { key: "nearestStations", required: false },
  { key: "nearestLandmark", required: false },
  { key: "utilitiesProvider", required: false },
  { key: "propertyGallery", required: true },
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
  const [errors, setErrors] = useState<CondoInfoFieldKey[]>([]);

  const markAdded = (key: CondoInfoFieldKey, data: unknown) =>
    setFields((prev) => ({
      ...prev,
      [key]: { ...prev[key], added: true, data },
    }));

  const handleNext = () => {
    const missing: CondoInfoFieldKey[] = [];

    for (const [key, state] of Object.entries(fields) as [
      CondoInfoFieldKey,
      CondoInfoFieldState
    ][]) {
      if (!state.required) continue;

      if (key === "propertyGallery") {
        const data = state.data as GalleryData | undefined;
        if (!data?.cover) {
          missing.push(key);
        }
        continue;
      }

      if (!state.added) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      setErrors(missing);
      return;
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <MaxWidthWrapper>
        <div className="my-10">
          <h2 className="text-3xl font-semibold">Condominiums information</h2>
          <InfoItems fields={fields} onAdd={markAdded} errors={errors} />
          <PropertyGallery
            added={fields.propertyGallery.added}
            initialData={fields.propertyGallery.data as GalleryData}
            required={!!fields.propertyGallery.required}
            error={errors.includes("propertyGallery")}
            onAdd={(data) => markAdded("propertyGallery", data)}
          />
        </div>
      </MaxWidthWrapper>
      <CondominiumInfoFooter onNext={handleNext} />
    </div>
  );
}
