import React from "react";
import PanDropZone from "./PanDropZone";

// Hanging-pan balance: the beam rotates around the fulcrum, the pans counter-
// rotate to stay vertical as the beam tilts.
export default function BalanceScale({ leftPan, rightPan, leftMass, rightMass, onDrop, onRemove, onClear }) {
  const sensitivity = 2.0;
  const diff = rightMass - leftMass;
  const angle = Math.max(-22, Math.min(22, diff * sensitivity));
  const beamWidth = "min(60vw, 500px)";

  const Pan = ({ side, items, mass, anchor }) => (
    <div className="absolute top-1/2 w-0 h-0" style={anchor}>
      <div className="absolute left-0 top-0" style={{ transform: `rotate(${-angle}deg)`, transformOrigin: "0 0" }}>
        <div className="absolute left-0 top-0 w-px h-6 bg-[#263845]/40" />
        <div className="absolute left-0 top-6 -translate-x-1/2">
          <PanDropZone side={side} items={items} mass={mass} onDrop={onDrop} onRemove={onRemove} onClear={onClear} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full mx-auto h-[300px] sm:h-[360px] select-none">
      {/* beam (light-grey arms) */}
      <div
        className="absolute left-1/2 top-[64px]"
        style={{ width: beamWidth, transform: "translateX(-50%)", transformOrigin: "center" }}
      >
        <div
          className="relative h-[6px] rounded-full bg-[#D1D3CE] transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${angle}deg)`, transformOrigin: "center" }}
        >
          {/* pale-yellow end caps marking the drop-zone centers */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D9F060] border-2 border-[#263845]" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D9F060] border-2 border-[#263845]" />
          <Pan side="left" items={leftPan} mass={leftMass} anchor={{ left: 0 }} />
          <Pan side="right" items={rightPan} mass={rightMass} anchor={{ right: 0, left: "auto" }} />
        </div>
      </div>

      {/* pillar */}
      <div className="absolute left-1/2 top-[64px] -translate-x-1/2 w-3 h-[176px] sm:h-[206px] bg-[#263845] rounded-full" />

      {/* fulcrum housing with glowing lime pivot light */}
      <div className="absolute left-1/2 top-[64px] -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-11 h-11 rounded-full bg-[#263845] flex items-center justify-center shadow-md">
          <div className="w-4 h-4 rounded-full bg-[#D9F060] shadow-[0_0_8px_2px_rgba(217,240,96,0.6)]" />
        </div>
      </div>

      {/* base */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center">
        <div className="w-36 sm:w-48 h-5 rounded-t-md bg-[#263845]" />
        <div className="w-52 sm:w-72 h-2.5 rounded-full bg-[#263845]" />
      </div>
    </div>
  );
}