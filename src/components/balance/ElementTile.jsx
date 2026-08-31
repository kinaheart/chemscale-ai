import React from "react";
import { CATEGORY_CLASS } from "@/data/elements";
import { cn } from "@/lib/utils";

export default function ElementTile({ element, dim }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "new", symbol: element.symbol })
    );
    e.dataTransfer.effectAllowed = "copy";
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      title={`${element.name} — ${element.weight}`}
      className={cn(
        "group relative aspect-square rounded-md border flex flex-col items-center justify-center cursor-grab active:cursor-grabing hover:scale-[1.08] hover:z-10 transition-transform duration-150 select-none",
        CATEGORY_CLASS[element.category],
        dim && "opacity-25 hover:opacity-40 hover:scale-100"
      )}
    >
      <span className="absolute top-0.5 left-1 text-[7px] sm:text-[8px] opacity-60 tabular-nums">{element.number}</span>
      <span className="text-[11px] sm:text-sm font-bold leading-none">{element.symbol}</span>
      <span className="hidden sm:block text-[7px] opacity-70 mt-0.5 tabular-nums">{element.weight}</span>
    </div>
  );
}