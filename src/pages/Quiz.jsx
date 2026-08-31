import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, ChevronRight, SkipForward, Sparkles, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { base44 } from "@/api/base44Client";
import { generateQuestions } from "@/data/quiz";

export default function Quiz() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("select");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [plan, setPlan] = useState("");
  const [planLoading, setPlanLoading] = useState(false);

  const start = (n) => {
    setQuestions(generateQuestions(n));
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setCorrectCount(0);
    setPlan("");
    setStage("playing");
  };

  const q = questions[current];

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correctIndex) {
      setCorrectCount((c) => c + 1);
      confetti({ particleCount: 90, spread: 65, origin: { y: 0.5 } });
    }
  };

  const next = () => {
    if (current + 1 >= questions.length) setStage("results");
    else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const recommend = async () => {
    setPlanLoading(true);
    try {
      const res = await base44.functions.invoke("getTutorNudge", {
        phase: "studyplan",
        correct: correctCount,
        total: questions.length,
      });
      setPlan(res?.data?.hint ?? res?.hint ?? "");
    } catch (e) {
      setPlan("Focus on the elements and molecules you missed, then re-take the quiz to lock in the atomic weights.");
    }
    setPlanLoading(false);
  };

  const header = (
    <header className="flex items-center justify-between mb-6">
      <button onClick={() => navigate(-1)} className="text-[#2c3e50]">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <span className="text-xs tracking-label text-[#2c3e50] font-semibold">Quiz</span>
      <span className="w-4" />
    </header>
  );

  if (stage === "select") {
    return (
      <div className="min-h-screen grid-bg">
        <div className="max-w-2xl mx-auto px-5 py-8">
          {header}
          <h1 className="text-2xl font-bold text-[#2c3e50] mb-1">Test your knowledge</h1>
          <p className="text-sm text-[#5d6d7e] mb-6">Choose how many questions you'd like to answer.</p>
          <div className="grid grid-cols-3 gap-3">
            {[5, 10, 20].map((n) => (
              <button
                key={n}
                onClick={() => start(n)}
                className="rounded-2xl p-4 border h-32 flex flex-col items-center justify-center bg-[#f3efe9] text-[#2c3e50] border-[#2d3e4e]/12 hover:border-[#2d3e4e]/30"
              >
                <span className="text-3xl font-bold">{n}</span>
                <span className="text-[10px] tracking-label opacity-70 mt-1">Questions</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === "playing" && q) {
    return (
      <div className="min-h-screen grid-bg">
        <div className="max-w-2xl mx-auto px-5 py-8">
          <header className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="text-[#2c3e50]">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs tracking-label text-[#5d6d7e]">
              Question {current + 1} of {questions.length}
            </span>
            <span className="text-[10px] tracking-label text-[#5d6d7e]">Score {correctCount}</span>
          </header>
          <div className="rounded-2xl border border-[#2c3e50]/12 bg-white/50 p-6">
            <div className="text-[10px] tracking-label text-[#5d6d7e] mb-2">Question {current + 1}</div>
            <h2 className="text-xl font-bold text-[#2c3e50] mb-5">{q.prompt}</h2>
            <div className="space-y-2">
              {q.choices.map((c, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = i === selected;
                let cls = "border-[#2c3e50]/15 bg-[#f3efe9] text-[#2c3e50] hover:border-[#2c3e50]/30";
                if (answered) {
                  if (isCorrect) cls = "border-[#c8d6a3] bg-[#c8d6a3]/40 text-[#2c3e50]";
                  else if (isSelected) cls = "border-red-400 bg-red-50 text-[#2c3e50]";
                  else cls = "border-[#2c3e50]/10 bg-[#f3efe9] text-[#5d6d7e] opacity-70";
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={`w-full text-left rounded-xl border px-4 py-3 flex items-center justify-between ${cls}`}
                  >
                    <span className="font-medium">{c}</span>
                    {answered && isCorrect && <Check className="w-5 h-5 text-[#2c3e50]" />}
                    {answered && !isCorrect && isSelected && <X className="w-5 h-5 text-red-500" />}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-5">
              {!answered ? (
                <button
                  onClick={next}
                  className="text-xs flex items-center gap-1 text-[#5d6d7e] border border-[#2c3e50]/15 rounded-full px-4 py-2"
                >
                  <SkipForward className="w-3 h-3" /> Skip
                </button>
              ) : (
                <span className="text-xs text-[#5d6d7e]">
                  {selected === q.correctIndex ? "Correct!" : "Not quite — see the green answer."}
                </span>
              )}
              {answered && (
                <button
                  onClick={next}
                  className="text-sm flex items-center gap-1 bg-[#d4f26a] text-[#284252] font-semibold rounded-full px-5 py-2"
                >
                  {current + 1 >= questions.length ? "See results" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // results
  const total = questions.length;
  const pct = total ? Math.round((correctCount / total) * 100) : 0;
  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-2xl mx-auto px-5 py-10">
        {header}
        <div className="rounded-2xl border border-[#2c3e50]/12 bg-white/50 p-8 text-center">
          <div className="text-[10px] tracking-label text-[#5d6d7e]">Your score</div>
          <div className="text-5xl font-bold text-[#2c3e50] my-2 tabular-nums">
            {correctCount}/{total}
          </div>
          <div className="text-sm text-[#5d6d7e]">
            {pct === 100 ? "Perfect run!" : pct >= 50 ? "Nicely done." : "Keep practicing — you've got this."}
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-[#284252] text-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#d4f26a]" />
            <span className="text-[10px] tracking-label">Study plan</span>
          </div>
          {plan ? (
            <p className="text-sm opacity-90 leading-relaxed">{plan}</p>
          ) : (
            <button
              onClick={recommend}
              disabled={planLoading}
              className="w-full rounded-xl bg-[#d4f26a] text-[#284252] font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {planLoading ? "Thinking…" : "Recommend study plan"}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setStage("select")}
          className="mt-4 w-full rounded-xl border border-[#2d3e4e]/15 text-[#2d3e4e] py-3 text-sm font-medium flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Play again
        </button>
      </div>
    </div>
  );
}