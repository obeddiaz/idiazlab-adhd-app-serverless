export type ProblemOption = { id: string; title: string; subtitle?: string };

export type TaskTemplate = {
  id: string;
  title: string;
  category: "cleaning" | "study" | "admin" | "self_care" | "generic";
  problemIds: string[];
};

export type StepTemplate = {
  id: string;
  title: string;
  instructions: string;
  durationSec: number;
};

export type SessionPlanRequest = {
  deviceId: string;
  problemId: string;
  taskId: string;
  stepsCount?: number;
};

export type SessionStep = {
  instanceId: string;
  templateId: string;
  title: string;
  instructions: string;
  durationSec: number;
  status: "pending" | "done" | "skipped";
};

export type SessionPlan = {
  planId: string;
  deviceId: string;
  problemId: string;
  taskId: string;
  createdAt: number;
  steps: SessionStep[];
};

export type SessionOutcome = {
  deviceId: string;
  endedAt: number; // sort key
  outcomeId: string;
  planId: string;
  felt: "some" | "good" | "not_today";
  stepsDone: number;
  stepsTotal: number;
};
