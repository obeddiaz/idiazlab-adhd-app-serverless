import type { ProblemOption, TaskTemplate } from "./types";

export const problems: ProblemOption[] = [
  { id: "mental_stuck", title: "🧠 I'm mentally stuck" },
  { id: "cant_start", title: "🧹 I have something to do but can’t start" },
  { id: "too_many", title: "😵 Too many things in my head" },
];

export const tasks: TaskTemplate[] = [
  { id: "clean_kitchen", title: "Clean the kitchen", category: "cleaning", problemIds: ["cant_start", "too_many"] },
  { id: "tidy_room", title: "Tidy my room", category: "cleaning", problemIds: ["cant_start", "mental_stuck"] },
  { id: "start_studying", title: "Start studying", category: "study", problemIds: ["mental_stuck", "cant_start"] },
  { id: "check_email", title: "Check my email", category: "admin", problemIds: ["cant_start", "too_many"] },
  { id: "something_else", title: "Something else", category: "generic", problemIds: ["mental_stuck", "cant_start", "too_many"] },
];
