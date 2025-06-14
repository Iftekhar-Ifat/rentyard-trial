"use client";

import { CondoInfoFieldKey, CondoInfoFieldState } from "../condominium-info";
import ItemCard from "./item-card";
import * as forms from "../condominium-info-forms/forms";

export type ItemsProps = {
  fields: Record<CondoInfoFieldKey, CondoInfoFieldState>;
  onAdd: (key: CondoInfoFieldKey, data: unknown) => void;
};

const ITEM_DATA: {
  left: Array<{
    key: CondoInfoFieldKey;
    label: string;
    note: string;
    form: keyof typeof forms;
  }>;
  right: Array<{
    key: CondoInfoFieldKey;
    label: string;
    note: string;
    form: keyof typeof forms;
  }>;
} = {
  left: [
    {
      key: "propertyAddress",
      label: "Property address",
      note: "(Required)",
      form: "PropertyAddressForm" as const,
    },
    {
      key: "leasingInfo",
      label: "Leasing info",
      note: "(Required)",
      form: "LeasingInfoForm",
    },
    {
      key: "charges",
      label: "Charges",
      note: "(Required)",
      form: "ChargesForm",
    },
    {
      key: "rentFrequency",
      label: "Rent frequency & payment reminder",
      note: "(Required)",
      form: "RentFrequencyForm",
    },
    {
      key: "applicationAgreement",
      label: "Application agreement",
      note: "(Optional)",
      form: "ApplicationAgreementForm",
    },
    {
      key: "aboutProperty",
      label: "About the property",
      note: "(Optional)",
      form: "AboutPropertyForm",
    },
    {
      key: "communityAmenities",
      label: "Community’s amenity/features",
      note: "(Optional but recommended)",
      form: "CommunityAmenitiesForm",
    },
  ],
  right: [
    {
      key: "petFees",
      label: "Pet fees",
      note: "(Optional, add fees if you allow pet)",
      form: "PetFeesForm",
    },
    {
      key: "parking",
      label: "Parking",
      note: "(Optional)",
      form: "ParkingForm",
    },
    {
      key: "nearestEducational",
      label: "Nearest educational institution",
      note: "(Optional but recommended)",
      form: "NearestEducationalForm",
    },
    {
      key: "nearestStations",
      label: "Nearest stations",
      note: "(Optional but recommended)",
      form: "NearestStationsForm",
    },
    {
      key: "nearestLandmark",
      label: "Nearest landmark",
      note: "(Optional but recommended)",
      form: "NearestLandmarkForm",
    },
    {
      key: "utilitiesProvider",
      label: "Utilities provider",
      note: "(Optional but recommended)",
      form: "UtilitiesProviderForm",
    },
  ],
};

export default function InfoItems({ fields, onAdd }: ItemsProps) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* LEFT */}
      <div className="space-y-2">
        {ITEM_DATA.left.map((m) => (
          <ItemCard
            key={m.key}
            fieldKey={m.key}
            label={m.label}
            note={m.note}
            added={fields[m.key].added}
            formComponentName={m.form}
            onAdd={onAdd}
          />
        ))}
      </div>

      {/* RIGHT */}
      <div className="space-y-2">
        {ITEM_DATA.right.map((m) => (
          <ItemCard
            key={m.key}
            fieldKey={m.key}
            label={m.label}
            note={m.note}
            added={fields[m.key].added}
            formComponentName={m.form}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}
