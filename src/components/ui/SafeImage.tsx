"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
  fallbackAspectRatio?: string;
}

export function SafeImage({
  fallbackLabel,
  fallbackAspectRatio = "16/9",
  alt,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <GradientPlaceholder
        aspectRatio={fallbackAspectRatio}
        label={fallbackLabel ?? alt}
        className="w-full h-full"
      />
    );
  }

  return <Image alt={alt} {...props} onError={() => setHasError(true)} />;
}
