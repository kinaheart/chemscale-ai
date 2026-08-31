import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown, RotateCcw, FlaskConical } from "lucide-react";
import confetti from "canvas-confetti";
import { base44 } from "@/api/base44Client";
import { ELEMENTS } from "@/data/elements";
import { RUNS, compositionFromItems, matchMolecule, molarMass, compositionsEqual } from "@/data/molecules";
import BalanceScale from "@/components/balance/BalanceScale";
import PeriodicTable from "@/components/balance/PeriodicTable";
import TelemetryBar from "@/components/balance/TelemetryBar";
import TutorSignal from "@/components/balance/TutorSignal";

let uid = 0;

const FUN_PHRASES = [
  "Are you having fun with ChemScale AI? Because I am!",
  "Chemistry is super fun, am I right?",
  "Keep stacking those atoms — every combination tells a story!",
  "Two pans, endless molecules — what will you build next?",
  "I love watching the scale tip. Try something surprising!",
];

export default function LiveBalance() {
  const { runId } = useParams();
  const navigate = useNavigate();
  const run = useMemo(() => RUNS.find((r) => r.id === runId) || null, [runId]);

  const [leftPan, setLeftPan] = useState([]);
  const [rightPan, setRightPan] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [won, setWon] = useState(false);
  const [hint, setHint] = useState(
    "Stuck? I'll point your attention toward the next useful comparison — never give away the whole move."
  );
  const [loading, setLoading] = useState(false);

  const leftMass = leftPan.reduce((s, i) => s + i.weight, 0);
  const rightMass = rightPan.reduce((s, i) => s + i.weight, 0);
  const leftComp = compositionFromItems(leftPan);
  const rightComp = compositionFromItems(rightPan);
  const leftMol = matchMolecule(leftComp);
  const rightMol = matchMolecule(rightComp);
  const targetMass = run ? molarMass(run.composition) : 0;

  useEffect(() => {
    if (!run) return;
    const isWon = compositionsEqual(leftComp, run.composition);
    if (isWon && !won) {
      setWon(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.4 } });
      setHint(`Nicely done — ${run.formula} balanced at ${targetMass.toFixed(3)} g/mol. Try the next comparison.`);
    }
    if (!isWon && won) setWon(false);
  }, [leftComp, run, won, targetMass]);

  const addElement = (side, symbol) => {
    const el = ELEMENTS.find((e) => e.symbol === symbol);
    if (!el) return;
    const item = { uid: ++uid, symbol: el.symbol, weight: el.weight };
    if (side === "left") setLeftPan((p) => [...p, item]);else
    setRightPan((p) => [...p, item]);
  };

  const moveItem = (toSide, fromUid) => {
    const item = leftPan.find((x) => x.uid === fromUid) || rightPan.find((x) => x.uid === fromUid);
    if (!item) return;
    if (leftPan.find((x) => x.uid === fromUid)) setLeftPan((p) => p.filter((x) => x.uid !== fromUid));else
    setRightPan((p) => p.filter((x) => x.uid !== fromUid));
    if (toSide === "left") setLeftPan((p) => [...p, item]);else
    setRightPan((p) => [...p, item]);
  };

  const handleDrop = (side, data) => {
    if (!data) return;
    if (data.type === "new") addElement(side, data.symbol);else
    if (data.type === "move" && data.from !== side) moveItem(side, data.uid);
  };

  const onRemove = (side, itemUid) => {
    if (side === "left") setLeftPan((p) => p.filter((x) => x.uid !== itemUid));else
    setRightPan((p) => p.filter((x) => x.uid !== itemUid));
  };
  const onClear = (side) => {
    if (side === "left") setLeftPan([]);else
    setRightPan([]);
  };

  const reset = () => {
    setLeftPan([]);
    setRightPan([]);
    setWon(false);
    setHint("Fresh pans. Drag an element to either side to begin.");
  };

  const askNudge = async () => {
    if (!run) {
      setHint(FUN_PHRASES[Math.floor(Math.random() * FUN_PHRASES.length)]);
      return;
    }
    setLoading(true);
    try {
      const res = await base44.functions.invoke("getTutorNudge", {
        targetSymbol: run.formula,
        targetName: run.name,
        targetComposition: run.composition,
        currentComposition: leftComp,
        leftMass,
        rightMass,
        difference: rightMass - leftMass,
        phase: "build",
        level: run.level
      });
      setHint(res?.data?.hint ?? res?.hint);
    } catch (e) {
      setHint("Compare the left pan to your target. Which element is missing — or overcounted?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid-bg flex flex-col">
      <header className="flex items-center justify-between px-5 py-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[#2c3e50]">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c8d6a3]" />
          <span className="text-[10px] tracking-label text-[#5d6d7e] hidden sm:inline">Reading the balance</span>
        </div>
      </header>

      <div className="px-5">
        {run ?
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#2c3e50]/12 bg-white/50 p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-label text-[#5d6d7e]">{run.level} · Target</div>
              <div className="text-2xl font-bold text-[#2c3e50]">
                {run.formula} <span className="text-sm font-normal text-[#5d6d7e]">{run.name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-label text-[#5d6d7e]">Target mass</div>
              <div className="text-lg font-bold text-[#2c3e50] tabular-nums">{targetMass.toFixed(3)} g/mol</div>
            </div>
          </div> :

        <div className="max-w-3xl mx-auto rounded-2xl border border-[#2c3e50]/12 bg-white/50 p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-label text-[#5d6d7e]">Sandbox</div>
              <div className="text-2xl font-bold text-[#2c3e50]">Free balance</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-label text-[#5d6d7e]">No target</div>
              <div className="text-sm text-[#5d6d7e]">Build any molecule</div>
            </div>
          </div>
        }
      </div>

      <div className="px-5 mt-3 max-w-3xl mx-auto w-full flex flex-wrap gap-2">
        {run && won ?
        <div className="rounded-xl bg-[#c8d6a3] text-[#2c3e50] px-4 py-2 text-sm font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" /> {run.formula} formed — {leftMass.toFixed(3)} g
          </div> :
        <>
          {leftMol &&
          <div className="rounded-xl bg-[#284252] text-white px-4 py-2 text-sm flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#d4f26a]" /> Left: <b>{leftMol.formula}</b> — {leftMol.name}
          </div>}
          {rightMol &&
          <div className="rounded-xl bg-[#284252] text-white px-4 py-2 text-sm flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#d4f26a]" /> Right: <b>{rightMol.formula}</b> — {rightMol.name}
          </div>}
        </>}
      </div>

      <div className="flex-1 px-5 py-4">
        <BalanceScale
          leftPan={leftPan}
          rightPan={rightPan}
          leftMass={leftMass}
          rightMass={rightMass}
          onDrop={handleDrop}
          onRemove={onRemove}
          onClear={onClear} />
        
        <div className="flex justify-center mt-1">
          <span className="rounded-full border border-[#2c3e50]/15 bg-white/60 px-4 py-1.5 text-[10px] tracking-label text-[#5d6d7e]">
            Drag an element to either pan
          </span>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={reset}
            className="text-xs flex items-center gap-1 text-[#5d6d7e] border border-[#2c3e50]/15 rounded-full px-3 py-1.5">
            
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button
            onClick={() => setShowTable((s) => !s)}
            className="text-xs flex items-center gap-1 text-[#2c3e50] border border-[#2c3e50]/15 rounded-full px-3 py-1.5">
            
            Periodic table
            <ChevronDown className={`w-3 h-3 transition-transform ${showTable ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {showTable &&
      <div className="px-5 pb-4 max-w-4xl mx-auto w-full">
          <PeriodicTable />
        </div>
      }

      <div className="px-5 pb-4 max-w-3xl mx-auto w-full">
        <TutorSignal hint={hint} loading={loading} onAsk={askNudge} onQuiz={() => navigate("/quiz")} />
      </div>

      <TelemetryBar leftMass={leftMass} rightMass={rightMass} />
    </div>);

}