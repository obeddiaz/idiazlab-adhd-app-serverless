import type { SessionPlan, SessionPlanRequest, SessionStep } from "./types";
import { stepBanks } from "./stepBanks";

const id = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export function generatePlan(req: SessionPlanRequest): SessionPlan {
  const bank = stepBanks[req.taskId] ?? [];
  const stepsCount = Math.max(1, Math.min(req.stepsCount ?? 5, bank.length || 5));

  const selected = bank.length
    ? bank.slice(0, stepsCount)
    : [
        {
          id: "generic_start",
          title: "Do the smallest possible start",
          instructions: "Put one item where it belongs.",
          durationSec: 120,
        },
      ];

  const steps: SessionStep[] = selected.map((s) => ({
    instanceId: id("step"),
    templateId: s.id,
    title: s.title,
    instructions: s.instructions,
    durationSec: s.durationSec,
    status: "pending",
  }));

  return {
    planId: id("plan"),
    deviceId: req.deviceId,
    problemId: req.problemId,
    taskId: req.taskId,
    createdAt: Date.now(),
    steps,
  };
}
