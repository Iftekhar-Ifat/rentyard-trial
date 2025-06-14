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
import { CondoInfoFieldKey } from "../condominium-info";
import * as forms from "../condominium-info-forms/forms";
import { cn } from "@/lib/utils";

type ItemCardProps = {
  fieldKey: CondoInfoFieldKey;
  label: string;
  note: string;
  added: boolean;
  formComponentName: keyof typeof forms;
  onAdd: (key: CondoInfoFieldKey, data: unknown) => void;
};

export default function ItemCard({
  fieldKey,
  label,
  note,
  added,
  formComponentName,
  onAdd,
}: ItemCardProps) {
  const [open, setOpen] = useState(false);
  const FormComponent = forms[formComponentName];

  return (
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
        {/* trigger */}
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-primary" size="sm">
            {added ? (
              <Button size="icon" variant="ghost">
                Edit
              </Button>
            ) : (
              <Button size="icon" variant="ghost">
                Add
              </Button>
            )}
          </Button>
        </DialogTrigger>

        {/* dialog content */}
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

          {/* the actual form */}
          <FormComponent
            initialData={added ? forms[fieldKey] : undefined}
            onSubmit={(data: unknown) => {
              onAdd(fieldKey, data);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
