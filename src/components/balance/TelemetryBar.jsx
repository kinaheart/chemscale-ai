import React from "react";

function Cell({ label, value, accent }) {
  return (
    <div className={`px-4 sm:px-6 py-4 ${accent ? "border-x border-[#2c3e50]/10" : ""}`}>
      <div className="text-[10px] tracking-label text-[#5d6d7e]">{label}</div>
      <div className="text-xl sm:text-3xl font-bold text-[#2c3e50] tabular-nums leading-tight">{value}</div>
    </div>
  );
}

export default function TelemetryBar({ leftMass, rightMass }) {
  const diff = Math.abs(rightMass - leftMass);
  return (
    <div className="border-t border-[#2c3e50]/15 bg-[#f3efe9] grid grid-cols-3">
      <Cell label="Left pan" value={`${leftMass.toFixed(3)} g`} />
      <Cell label="Difference" value={`${diff.toFixed(3)} g`} accent />
      <Cell label="Right pan" value={`${rightMass.toFixed(3)} g`} />
    </div>
  );
}