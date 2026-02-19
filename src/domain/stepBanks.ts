import type { StepTemplate } from "./types";

export const stepBanks: Record<string, StepTemplate[]> = {
  clean_kitchen: [
    { id: "trash", title: "Grab a trash bag", instructions: "Collect visible trash only.", durationSec: 120 },
    { id: "dishes", title: "Move dishes to the sink", instructions: "Just move them. No washing yet.", durationSec: 180 },
    { id: "surface", title: "Clear one small surface", instructions: "One counter corner is enough.", durationSec: 300 },
    { id: "wipe", title: "Wipe one surface", instructions: "One quick pass.", durationSec: 180 },
    { id: "floor10", title: "Pick up 10 items", instructions: "Stop at 10. Seriously.", durationSec: 240 },
  ],
  tidy_room: [
    { id: "laundry", title: "Pick up clothes", instructions: "Only clothes. One pile.", durationSec: 240 },
    { id: "bed", title: "Make the bed (quick)", instructions: "Just pull sheets + place pillow.", durationSec: 180 },
    { id: "trash", title: "Collect trash", instructions: "Visible trash only.", durationSec: 120 },
    { id: "shoes", title: "Shoes to one spot", instructions: "Put shoes in a single place.", durationSec: 120 },
    { id: "surface", title: "Clear one surface", instructions: "Desk corner or nightstand.", durationSec: 300 },
  ],
  start_studying: [
    { id: "setup", title: "Open your materials", instructions: "Laptop/book + one needed item.", durationSec: 120 },
    { id: "timer", title: "Set a 5-minute timer", instructions: "Only 5 minutes. That’s it.", durationSec: 300 },
    { id: "bullets", title: "Write 3 bullet points", instructions: "What will you do in 5 minutes?", durationSec: 180 },
    { id: "start", title: "Do the first tiny action", instructions: "Read 1 paragraph or solve 1 problem.", durationSec: 300 },
    { id: "next", title: "Pick the next step", instructions: "Choose the easiest next action.", durationSec: 120 },
  ],
};
