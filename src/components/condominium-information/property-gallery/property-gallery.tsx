"use client";

import React, { useState, useRef, useEffect, type DragEvent } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GalleryData } from "../condominium-info";

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

interface PropertyGalleryProps {
  added: boolean;
  initialData?: GalleryData;
  required: boolean;
  error?: boolean;
  onAdd: (data: GalleryData) => void;
}

export default function PropertyGallery({
  added,
  initialData,
  required,
  error,
  onAdd,
}: PropertyGalleryProps) {
  const [coverPhoto, setCoverPhoto] = useState<UploadedFile | null>(
    initialData?.cover
      ? {
          file: initialData.cover,
          preview: URL.createObjectURL(initialData.cover),
          id: "initial",
        }
      : null
  );
  const [additionalPhotos, setAdditionalPhotos] = useState<UploadedFile[]>(
    (initialData?.more ?? []).map((f, i) => ({
      file: f,
      preview: URL.createObjectURL(f),
      id: `initial-${i}`,
    }))
  );

  useEffect(() => {
    onAdd({
      cover: coverPhoto?.file ?? null,
      more: additionalPhotos.map((u) => u.file),
    });
  }, [coverPhoto, additionalPhotos]);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!validTypes.includes(file.type)) {
      alert("Please upload only JPG or PNG files");
      return false;
    }
    if (file.size > maxSize) {
      alert("File size should be less than 10MB");
      return false;
    }
    return true;
  };

  const makeUploaded = (file: File): UploadedFile => ({
    file,
    preview: URL.createObjectURL(file),
    id: Math.random().toString(36).slice(2),
  });

  const handleCover = (files: FileList | null) => {
    if (!files?.[0]) return;
    const f = files[0];
    if (!validateFile(f)) return;
    if (coverPhoto) URL.revokeObjectURL(coverPhoto.preview);
    setCoverPhoto(makeUploaded(f));
    setError(false);
  };

  const handleAdditional = (files: FileList | null) => {
    if (!files) return;
    const slotsLeft = 6 - additionalPhotos.length;
    const toAdd: UploadedFile[] = [];
    for (let i = 0; i < files.length && toAdd.length < slotsLeft; i++) {
      const f = files[i];
      if (validateFile(f)) toAdd.push(makeUploaded(f));
    }
    setAdditionalPhotos((prev) => [...prev, ...toAdd]);
  };

  const removeCover = () => {
    if (coverPhoto) {
      URL.revokeObjectURL(coverPhoto.preview);
      setCoverPhoto(null);
    }
  };

  const removeAdditional = (id: string) => {
    setAdditionalPhotos((prev) => {
      const removed = prev.find((u) => u.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((u) => u.id !== id);
    });
  };

  const prevent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const Slot = ({
    file,
    placeholder,
    onClick,
    onDrop,
    inputRef,
    multiple = false,
    className = "",
  }: {
    file: UploadedFile | null;
    placeholder: React.ReactNode;
    onClick: () => void;
    onDrop: (e: DragEvent) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    multiple?: boolean;
    className?: string;
  }) => (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors overflow-hidden",
        "flex items-center justify-center",
        multiple ? "aspect-square" : "h-64 w-full",
        className
      )}
      onClick={onClick}
      onDragOver={prevent}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        multiple={multiple}
        onChange={(e) =>
          multiple
            ? handleAdditional(e.target.files)
            : handleCover(e.target.files)
        }
      />

      {file ? (
        <div className="w-full h-full relative">
          <Image
            src={file.preview}
            alt="preview"
            fill
            className="object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              multiple ? removeAdditional(file.id) : removeCover();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="text-center text-gray-500">{placeholder}</div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium ">
        Property gallery
        {required && <span className="text-red-500 ml-1">*</span>}
        <span className="text-sm font-normal text-muted-foreground ml-2">
          (It’s not unit photo)
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cover */}
        <div>
          <h3 className="text-base font-medium mb-4">
            Featured photos
            <span className="text-red-500 ml-1">*</span>
          </h3>

          <Slot
            file={coverPhoto}
            placeholder={
              <>
                <Upload className="h-8 w-8 mb-2 text-primary" />
                <p className="font-medium">Upload cover photo</p>
                <p className="text-sm">(jpg, png only)</p>
              </>
            }
            onClick={() => coverInputRef.current?.click()}
            onDrop={(e) => {
              prevent(e);
              handleCover(e.dataTransfer.files);
            }}
            className={cn(
              error && !coverPhoto ? "border-red-500" : "border-primary"
            )}
            inputRef={coverInputRef}
          />
        </div>

        {/* Additional */}
        <div>
          <h3 className="text-base font-medium mb-4">
            More photos
            <span className="text-muted-foreground ml-1">(optional)</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Slot
                key={i}
                file={additionalPhotos[i] ?? null}
                placeholder={<Upload className="h-6 w-6 text-primary" />}
                onClick={() => {
                  if (!additionalPhotos[i]) additionalInputRef.current?.click();
                }}
                onDrop={(e) => {
                  prevent(e);
                  handleAdditional(e.dataTransfer.files);
                }}
                inputRef={additionalInputRef}
                multiple
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
