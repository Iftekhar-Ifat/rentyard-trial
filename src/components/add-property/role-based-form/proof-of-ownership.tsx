"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProofOfOwnership() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full py-2 gap-0.5">
      <CardHeader className="bg-muted/50 h-10 border-b px-4 py-2">
        <CardTitle className="text-muted-foreground font-medium">
          Proof of ownership
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ownership-doc" className="font-medium">
            Ownership doc*
          </Label>
          <div>
            <Label
              htmlFor="ownership-doc"
              className="flex items-center w-md justify-center py-2 bg-muted/20 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <HugeiconsIcon icon={Upload02Icon} />
                <span>(PDF only)</span>
              </div>
              <input
                id="ownership-doc"
                type="file"
                accept=".pdf"
                className="sr-only"
                onChange={handleFileChange}
              />
            </Label>
            {file && (
              <div className="mt-2 text-sm">Selected file: {file.name}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
