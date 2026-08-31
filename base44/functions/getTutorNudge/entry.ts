import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Builds a Socratic, non-spoiler hint for the periodic-table balance app.
// Uses the Core InvokeLLM integration via the service role.
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const targetSymbol = String(body.targetSymbol || "");
    const targetName = String(body.targetName || "");
    const targetComposition = body.targetComposition || {};
    const currentComposition = body.currentComposition || {};
    const leftMass = Number(body.leftMass || 0);
    const rightMass = Number(body.rightMass || 0);
    const difference = Number(body.difference || 0);
    const phase = String(body.phase || "build");
    const level = String(body.level || "");

    const targetCounts = Object.entries(targetComposition)
      .map(([el, n]) => `${el}:${n}`)
      .join(", ");
    const currentCounts = Object.entries(currentComposition)
      .map(([el, n]) => `${el}:${n}`)
      .join(", ") || "empty";

    let prompt;
    if (phase === "studyplan") {
      const correct = Number(body.correct || 0);
      const total = Number(body.total || 0);
      const accuracy = total ? Math.round((correct / total) * 100) : 0;
      prompt =
        "You are a supportive chemistry tutor. A student just finished a quiz of " + total +
        " questions and got " + correct + " correct (" + accuracy + "%). " +
        "Write a recommended study plan in exactly 3 sentences. Be encouraging, specific and practical. No preamble, no bullet points.";
    } else {
      const systemPrompt =
        "You are a Socratic chemistry tutor for a balance-scale app where students drag elements onto pans to build a target molecule. " +
        "Give ONE short, non-spoiler nudge (max 2 sentences, ~30 words). Never state the answer or exact counts. " +
        "Ask a guiding question or point to the next useful comparison (which element is missing/overcounted, or how the mass compares). " +
        "Be warm, curious, and concrete. No preamble.";
      let userPrompt;
      if (phase === "free") {
        userPrompt =
          `Free-play sandbox — no target. Student's left-pan composition: ${currentCounts}. ` +
          `Left mass: ${leftMass.toFixed(3)} g, right mass: ${rightMass.toFixed(3)} g, difference: ${difference.toFixed(3)} g. ` +
          "Give a curious nudge: ask what molecule they might be building, or suggest comparing the two pans.";
      } else {
        userPrompt =
          `Target molecule: ${targetSymbol} (${targetName}). Target composition: ${targetCounts}. ` +
          `Student's left-pan composition: ${currentCounts}. Left mass: ${leftMass.toFixed(3)} g, right mass: ${rightMass.toFixed(3)} g, difference: ${difference.toFixed(3)} g. ` +
          (level ? `This is a ${level} run, so calibrate the nudge to that level. ` : "") +
          (phase === "intro"
            ? "Give a friendly opening nudge to help them start, mentioning the lightest element they might begin with."
            : "Help them notice what to compare next without revealing the answer.");
      }
      prompt = `${systemPrompt}\n\n${userPrompt}`;
    }

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt });

    const hint = typeof result === "string" ? result : result?.response || result?.text || JSON.stringify(result);
    return Response.json({ hint });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}