"use client";

import Image from "next/image";
import type { Media } from "@/payload-types";

type Props = {
  resource?: Media | null;
  className?: string;
};

export const ImageMedia = ({ resource, className }: Props) => {
  if (!resource || typeof resource !== "object") return null;

  const { url, alt, blurDataUrl } = resource;

  if (!url) return null;

  return (
    <Image
      src={url}
      alt={alt || ""}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className={className}
      placeholder={blurDataUrl ? "blur" : "empty"}
      blurDataURL={blurDataUrl || undefined}
    />
  );
};
