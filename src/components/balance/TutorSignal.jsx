import React from "react";
import { Sparkles, Lightbulb, ChevronRight } from "lucide-react";

export default function TutorSignal({ hint, loading, onAsk }) {
  return (
    <div className="rounded-2xl bg-[#284252] text-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4f26a]" />
          <span className="text-[10px] tracking-label">Tutor signal</span>
        </div>
        <span className="text-[10px] border border-white/30 px-2 py-0.5 rounded-full">
          {loading ? "Thinking" : "Available"}
        </span>
      </div>
      <div className="mt-3 flex gap-2 items-start text-sm">
        <Lightbulb className="w-4 h-4 text-[#d4f26a] shrink-0 mt-0.5" />
        <p className="opacity-90">{loading ? "Thinking…" : hint}</p>
      </div>
      <button
        onClick={onAsk}
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-[#d4f26a] text-[#284252] font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        Ask for a nudge <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}