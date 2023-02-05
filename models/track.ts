import { Step } from "./step";
import { Player } from "../utility/player";

export interface TrackJsonFormat {
  name: string;
  sample: string;
  steps: { on: boolean; accent: boolean }[];
}

export class TrackModel {
  id: string = "";
  name: string = "";
  sample: string = "";
  steps: Step[] = [];
  player = new Player();

  constructor(name: string, sample: string, steps?: Step[]) {
    this.id = name;
    this.name = name;
    this.sample = sample;
    if (steps) {
      this.steps = steps;
    } else {
      // create steps
      for (let i = 0; i < 16; i++) {
        this.steps.push(new Step());
      }
    }

    this.player = new Player(this.sample);
  }

  play(step: Step) {
    this.player.play(step.getVolume());
  }

  toJson() {
    return {
      name: this.name,
      sample: this.sample,
      steps: this.steps.map((step) => ({ accent: step.accent, on: step.on })),
    };
  }

  static fromJson(track: TrackJsonFormat) {
    const trackSteps = track.steps.map(
      (stepInfo) => new Step(stepInfo.on, stepInfo.accent)
    );
    return new TrackModel(track.name, track.sample, trackSteps);
  }
}
