import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

function PlacedChip({ item, side, onRemove }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "move", uid: item.uid, from: side })
    );
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="relative flex items-center justify-center rounded-md bg-[#284252] text-white text-xs font-bold px-2 py-1 cursor-grab active:cursor-grabing shadow-sm"
    >
      {item.symbol}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-[#284252] border border-[#284252] flex items-center justify-center"
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}

export default function PanDropZone({ side, items, mass, onDrop, onRemove, onClear }) {
  const [over, setOver] = useState(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const raw = e.dataTransfer.getData("application/json");
    if (raw) onDrop(side, JSON.parse(raw));
  };
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={cn(
        "w-[26vw] sm:w-[150px] min-w-[96px] rounded-xl border-2 border-dashed p-2.5 flex flex-col bg-white/55 backdrop-blur-sm transition-colors",
        over ? "border-[#c8d6a3] bg-[#c8d6a3]/25" : "border-[#aeb6bf]"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] tracking-label text-[#5d6d7e]">{side} PAN</span>
        {items.length > 0 && (
          <button onClick={() => onClear(side)} className="text-[#5d6d7e] hover:text-[#2c3e50]">
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-1 text-[#5d6d7e] py-3">
          <Plus className="w-4 h-4" />
          <span className="text-[10px] tracking-wide">DROP HERE</span>
        </div>
      ) : (
        <div className="flex-1 flex flex-wrap gap-1 content-start py-1">
          {items.map((it) => (
            <PlacedChip key={it.uid} item={it} side={side} onRemove={() => onRemove(side, it.uid)} />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-[9px] text-[#5d6d7e] mt-1 tabular-nums">
        <span>{mass.toFixed(3)} g</span>
        <span>{items.length} {items.length === 1 ? "atom" : "atoms"}</span>
      </div>
    </div>
  );
}