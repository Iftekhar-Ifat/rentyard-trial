"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface UploadProps {
  multiple?: boolean;
  accept?: string;
  /** receives a FileList whenever the user picks files */
  onFiles: (files: FileList) => void;
  className?: string;
}

export function Upload({
  multiple = false,
  accept,
  onFiles,
  className,
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition",
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={(e) => {
          if (e.target.files) {
            onFiles(e.target.files);
          }
        }}
      />

      <div className="text-center text-muted-foreground">
        <p className="font-medium">
          {multiple ? "Upload photos" : "Upload photo"}
        </p>
        <p className="text-sm">
          {accept
            ?.split(",")
            .map((t) => t.replace("image/", ""))
            .join(", ")}{" "}
          only
        </p>
      </div>
    </div>
  );
}
