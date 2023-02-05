import { v4 } from "uuid";

export type VolumeLevelNames = "low" | "mid" | "high";

export const VolumeLevels: Record<VolumeLevelNames, number> = {
  low: 0.2,
  mid: 0.5,
  high: 1,
};

export const probablity = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export class Step {
  on = false;
  accent = false;
  id: string = "";
  probability = 100;
  volume: VolumeLevelNames = "mid";

  constructor(on?: boolean, volume?: VolumeLevelNames, probability?: number) {
    this.id = v4();
    this.on = on || false;
    this.volume = volume || "mid";
    this.probability = probability || 100;
  }
}
