import React from "react";
import { Info } from "lucide-react";

export default function LabNote() {
  return (
    <div className="mt-4 rounded-xl border border-[#2d3e4e]/12 bg-[#f3efe9] p-4 flex gap-3">
      <Info className="w-4 h-4 text-[#5d6d7e] shrink-0 mt-0.5" />
      <div>
        <div className="text-[10px] tracking-label text-[#5d6d7e] mb-1">Lab note</div>
        <p className="text-sm text-[#2d3e4e]">
          Atomic weights are averages from naturally occurring isotopes. Keep three decimals for a fair comparison.
        </p>
      </div>
    </div>
  );
}