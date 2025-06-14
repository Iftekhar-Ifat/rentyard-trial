// components/CondominiumInfo/ItemCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01FreeIcons, Edit01FreeIcons } from "@hugeicons/core-free-icons";
import { CondoInfoFieldKey } from "../condominium-info";
import * as forms from "../condominium-info-forms/forms";

type ItemCardProps = {
  fieldKey: CondoInfoFieldKey;
  label: string;
  note: string;
  added: boolean;
  data?: unknown;
  formComponentName: keyof typeof forms;
  onAdd: (key: CondoInfoFieldKey, data: unknown) => void;
};

export default function ItemCard({
  fieldKey,
  label,
  note,
  added,
  data,
  formComponentName,
  onAdd,
}: ItemCardProps) {
  const [open, setOpen] = useState(false);
  const FormComponent = forms[formComponentName];

  return (
    <div>
      <div className="bg-card text-card-foreground flex gap-6 rounded-xl border shadow-sm items-center justify-between px-4 py-3">
        <div>
          <span className={added ? "font-semibold" : ""}>{label}</span>
          <span
            className={cn("text-muted-foreground text-sm ml-1", {
              "text-red-500": note === "(Required)",
            })}
          >
            {note}
          </span>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <HugeiconsIcon
                className="text-primary"
                icon={added ? Edit01FreeIcons : Add01FreeIcons}
              />
              <span className="ml-1 text-primary">
                {added ? "Edit" : "Add"}
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {added ? `Edit ${label}` : `Add ${label}`}
              </DialogTitle>
              <DialogDescription>
                {added
                  ? "Update your information below."
                  : "Please fill out the form to add this item."}
              </DialogDescription>
            </DialogHeader>

            <FormComponent
              initialData={data}
              onSubmit={(formData: unknown) => {
                onAdd(fieldKey, formData);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Data preview */}
      {added && data && (
        <div className="mt-2 p-4 bg-muted rounded-lg text-sm">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
