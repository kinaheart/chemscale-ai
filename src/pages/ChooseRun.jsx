import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { RUNS, molarMass } from "@/data/molecules";
import LabNote from "@/components/balance/LabNote";
import TutorSignal from "@/components/balance/TutorSignal";

export default function ChooseRun() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(RUNS[0].id);
  const [hint, setHint] = useState(
    "Stuck? I'll point your attention toward the next useful comparison — never give away the whole move."
  );
  const [loading, setLoading] = useState(false);

  const askNudge = async () => {
    setLoading(true);
    try {
      const run = RUNS.find((r) => r.id === selected);
      const res = await base44.functions.invoke("getTutorNudge", {
        targetSymbol: run.formula,
        targetName: run.name,
        targetComposition: run.composition,
        currentComposition: {},
        leftMass: 0,
        rightMass: 0,
        difference: 0,
        phase: "intro",
      });
      setHint(res.hint);
    } catch (e) {
      setHint("Start light — hydrogen is the lightest element on the table and a great first move.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-3xl mx-auto px-5 py-8 sm:py-12">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-sm tracking-label text-[#2d3e4e] font-semibold">Choose a Run</h1>
          <span className="text-xs tracking-label text-[#5d6d7e] border border-[#2d3e4e]/15 rounded-full px-3 py-1">
            {RUNS.length} total
          </span>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RUNS.map((r) => {
            const active = r.id === selected;
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                onDoubleClick={() => navigate(`/balance/${r.id}`)}
                className={`text-left rounded-2xl p-4 border transition relative overflow-hidden h-44 flex flex-col justify-between ${
                  active
                    ? "bg-[#284252] text-white border-[#284252]"
                    : "bg-[#f3efe9] text-[#2d3e4e] border-[#2d3e4e]/12 hover:border-[#2d3e4e]/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-label opacity-70">{r.id}</span>
                  {active ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
                </div>
                <div>
                  <div className="text-3xl font-bold leading-none">{r.formula}</div>
                  <div className="text-xs mt-1 opacity-80">{r.tagline}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-label opacity-70">{r.level}</span>
                  <span className="text-[10px] opacity-60 tabular-nums">{molarMass(r.composition).toFixed(3)} g/mol</span>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-current opacity-10" />
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigate(`/balance/${selected}`)}
            className="flex-1 rounded-xl bg-[#d4f26a] text-[#284252] font-semibold py-3"
          >
            Begin run
          </button>
          <button
            onClick={() => navigate("/balance")}
            className="rounded-xl border border-[#2d3e4e]/15 text-[#2d3e4e] px-4 py-3 text-sm font-medium"
          >
            Skip — free balance
          </button>
        </div>

        <LabNote />
        <TutorSignal hint={hint} loading={loading} onAsk={askNudge} />
      </div>
    </div>
  );
}