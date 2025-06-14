"use client";

import { Button } from "@/components/ui/button";

const REQUIRED_FIELDS = [
  { label: "Property address", required: true },
  { label: "Leasing info", required: true },
  { label: "Charges", required: true },
  { label: "Rent frequency & payment reminder", required: true },
];

const OPTIONAL_FIELDS = [
  { label: "Application agreement", recommended: false },
  { label: "About the property", recommended: false },
  { label: "Community’s amenity/features", recommended: true },
];

const RIGHT_FIELDS = [
  { label: "Pet fees", note: "(Optional, add fees if you allow pet)" },
  { label: "Parking", note: "(Optional)" },
  {
    label: "Nearest educational institution",
    note: "(Optional but recommended)",
  },
  { label: "Nearest stations", note: "(Optional but recommended)" },
  { label: "Nearest landmark", note: "(Optional but recommended)" },
  { label: "Utilities provider", note: "(Optional but recommended)" },
];

export default function CondominiumInformationItems() {
  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-2">
          {REQUIRED_FIELDS.map((item) => (
            <div
              key={item.label}
              className="bg-card text-card-foreground flex gap-6 rounded-xl border shadow-sm items-center justify-between px-4 py-3"
            >
              <span>
                {item.label}
                <span className="ml-1 text-red-500">(Required)</span>
              </span>
              <Button variant="ghost" className="text-primary" size="sm">
                + Add
              </Button>
            </div>
          ))}

          {OPTIONAL_FIELDS.map((item) => (
            <div
              key={item.label}
              className="bg-card text-card-foreground flex gap-6 rounded-xl border shadow-sm items-center justify-between px-4 py-3"
            >
              <span>
                {item.label}
                <span className="text-muted-foreground text-sm ml-1">
                  {item.recommended
                    ? "(Optional but recommended)"
                    : "(Optional)"}
                </span>
              </span>
              <Button variant="ghost" className="text-primary" size="sm">
                + Add
              </Button>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          {RIGHT_FIELDS.map((item) => (
            <div
              key={item.label}
              className="bg-card text-card-foreground flex gap-6 rounded-xl border shadow-sm items-center justify-between px-4 py-3"
            >
              <span>
                {item.label}
                <span className="text-muted-foreground text-sm ml-1">
                  {item.note}
                </span>
              </span>
              <Button variant="ghost" className="text-primary" size="sm">
                + Add
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
