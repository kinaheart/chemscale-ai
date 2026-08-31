import React, { useState } from "react";
import { ELEMENTS, CATEGORY_CLASS, CATEGORY_LABEL } from "@/data/elements";
import ElementTile from "./ElementTile";

const LEGEND = ["alkali", "alkaline", "transition", "post", "metalloid", "nonmetal", "halogen", "noble", "lanthanide", "actinide", "unknown"];

export default function PeriodicTable() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = (e) => !q || e.symbol.toLowerCase().includes(q) || e.name.toLowerCase().includes(q);

  return (
    <div className="w-full rounded-2xl border border-[#2c3e50]/12 bg-white/40 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 gap-3">
        <span className="text-[10px] tracking-label text-[#5d6d7e]">Periodic table · drag to a pan</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search elements"
          className="text-xs rounded-full bg-[#f3efe9] border border-[#2c3e50]/12 px-3 py-1.5 w-40 outline-none focus:border-[#2c3e50]/40"
        />
      </div>
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div
          className="grid gap-[3px] min-w-[680px]"
          style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))", gridTemplateRows: "repeat(10, auto)" }}
        >
          {ELEMENTS.map((e) => (
            <div key={e.number} style={{ gridColumn: e.col, gridRow: e.row }}>
              <ElementTile element={e} dim={!matches(e)} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3">
        {LEGEND.map((c) => (
          <span key={c} className="flex items-center gap-1.5 text-[9px] text-[#5d6d7e]">
            <span className={`w-2.5 h-2.5 rounded-sm border ${CATEGORY_CLASS[c]}`} />
            {CATEGORY_LABEL[c]}
          </span>
        ))}
      </div>
    </div>
  );
}