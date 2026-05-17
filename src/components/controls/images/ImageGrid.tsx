import type { ReactNode } from "react";
import type { ImageCell } from "@/core";

type ImageGridProps = {
  results: ImageCell[];
  onClick?: (image: ImageCell) => void;
  children?: (image: ImageCell) => ReactNode;
};

export const ImageGrid = ({ results, onClick, children }: ImageGridProps) => {
  return (
    <div className="grid w-full grid-cols-5 gap-5">
      {results.map((result) => (
        <div
          className={`relative overflow-hidden rounded-lg bg-gray-800 ${onClick ? "cursor-pointer transition hover:scale-[1.02]" : ""}`}
          key={result.id}
          onClick={() => onClick?.(result)}
        >
          {children?.(result)}
          {result.imageUrl ? (
            <img alt={result.primaryText} className="aspect-2/3 w-full object-cover" src={result.imageUrl} />
          ) : (
            <div className="flex aspect-2/3 w-full items-center justify-center bg-gray-700">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="p-3 text-center">
            <p className="truncate font-semibold text-[#f0f4ef] text-sm">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
