import { cn } from "@/lib/utils";
import { X, ZoomIn } from "lucide-react";
import { useState } from "react";

interface ImageBlockProps {
  url: string;
  caption?: string;
  alt?: string;
  className?: string;
}

export function ImageBlock({ url, caption, alt, className }: ImageBlockProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const label = alt ?? caption ?? "image";

  return (
    <>
      <figure className={cn("my-6", className)}>
        <button
          type="button"
          className="relative group w-full cursor-zoom-in rounded-lg overflow-hidden border border-border p-0 bg-transparent"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View full size: ${label}`}
          data-ocid="image_block"
        >
          <img
            src={url}
            alt={label}
            className="w-full h-auto object-contain max-h-[600px] bg-card"
            loading="lazy"
            style={{ aspectRatio: "auto" }}
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </button>
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground font-body italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {lightboxOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 m-0 max-w-none max-h-none w-full h-full border-0"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxOpen(false)}
          aria-label="Image lightbox"
          data-ocid="image_lightbox"
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-card border border-border text-foreground hover:bg-muted transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
            data-ocid="image_lightbox.close_button"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={url}
            alt={label}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
          />
          {caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground bg-card/80 px-4 py-1.5 rounded-full">
              {caption}
            </p>
          )}
        </dialog>
      )}
    </>
  );
}
