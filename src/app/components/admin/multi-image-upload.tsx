// components/multi-image-upload.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface ImageUploadProps {
  value: { url: string; altText: string }[];
  onChange: (value: { url: string; altText: string }[]) => void;
}

export const MultiImageUpload = ({
  value = [],
  onChange,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);

    try {
      // In a real app, you would upload to a cloud service like Cloudinary
      // This is a mock implementation
      const newImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          return new Promise<{ url: string; altText: string }>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                url: reader.result as string,
                altText: file.name,
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );

      onChange([...value, ...newImages]);
      toast.success("Images uploaded successfully");
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 10,
    onDrop,
  });

  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop images here, or click to select
          </p>
          <p className="text-xs text-muted-foreground">
            JPEG, JPG, PNG, WEBP up to 10MB
          </p>
        </div>
      </div>

      {isUploading && (
        <div className="text-sm text-muted-foreground">Uploading...</div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square overflow-hidden rounded-md">
                <Image
                  src={image.url}
                  alt={image.altText}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
