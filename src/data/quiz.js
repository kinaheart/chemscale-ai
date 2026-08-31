import { ELEMENTS } from "./elements";
import { MOLECULES, molarMass } from "./molecules";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function uniquePick(arr, n) {
  return shuffle(arr).slice(0, n);
}

function weightChoices(correct) {
  const target = parseFloat(correct.toFixed(3));
  const opts = new Set([target]);
  let guard = 0;
  while (opts.size < 3 && guard++ < 50) {
    const delta = correct * (0.05 + Math.random() * 0.25) * (Math.random() < 0.5 ? 1 : -1);
    opts.add(parseFloat(Math.max(0.1, correct + delta).toFixed(3)));
  }
  const arr = shuffle([...opts]);
  return { choices: arr.map((c) => c.toFixed(3) + " g/mol"), correctIndex: arr.indexOf(target) };
}

const lightElems = ELEMENTS.filter((e) => e.weight < 210);
const simpleMols = MOLECULES.filter((m) => Object.keys(m.composition).length <= 2);

export function generateQuestions(count) {
  const types = ["elemWeight", "molMass", "elemByWeight", "molByComp"];
  const questions = [];
  const usedElems = new Set();
  const usedMols = new Set();
  let attempts = 0;
  while (questions.length < count && attempts++ < count * 30) {
    const type = pick(types);
    if (type === "elemWeight") {
      const pool = lightElems.filter((e) => !usedElems.has(e.symbol));
      const el = pick(pool.length ? pool : lightElems);
      if (!el) continue;
      usedElems.add(el.symbol);
      const { choices, correctIndex } = weightChoices(el.weight);
      questions.push({ prompt: `What is the atomic weight of ${el.name}?`, choices, correctIndex });
    } else if (type === "molMass") {
      const pool = simpleMols.filter((m) => !usedMols.has(m.formula));
      const m = pick(pool.length ? pool : simpleMols);
      if (!m) continue;
      usedMols.add(m.formula);
      const { choices, correctIndex } = weightChoices(molarMass(m.composition));
      questions.push({ prompt: `What is the molar mass of ${m.formula}?`, choices, correctIndex });
    } else if (type === "elemByWeight") {
      const pool = lightElems.filter((e) => !usedElems.has(e.symbol));
      const el = pick(pool.length ? pool : lightElems);
      if (!el) continue;
      usedElems.add(el.symbol);
      const correctSym = el.symbol;
      const opts = uniquePick(lightElems.filter((e) => e.symbol !== correctSym), 2);
      opts.push(ELEMENTS.find((e) => e.symbol === correctSym));
      const shuffled = shuffle(opts);
      questions.push({
        prompt: `Which element has an atomic weight of about ${el.weight.toFixed(3)} g/mol?`,
        choices: shuffled.map((e) => e.symbol),
        correctIndex: shuffled.findIndex((e) => e.symbol === correctSym),
      });
    } else {
      const pool = simpleMols.filter((m) => !usedMols.has(m.formula));
      const m = pick(pool.length ? pool : simpleMols);
      if (!m) continue;
      usedMols.add(m.formula);
      const compStr = Object.entries(m.composition).map(([el, n]) => `${el}${n}`).join(" + ");
      const distractors = uniquePick(MOLECULES.filter((x) => x.formula !== m.formula), 2);
      const opts = shuffle([m, ...distractors]);
      questions.push({
        prompt: `Which molecule is formed by ${compStr}?`,
        choices: opts.map((x) => x.formula),
        correctIndex: opts.findIndex((x) => x.formula === m.formula),
      });
    }
  }
  return questions;
}