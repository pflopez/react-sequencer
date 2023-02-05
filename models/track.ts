import { Step, VolumeLevelNames, VolumeLevels } from "./step";
import { Player } from "../utility/player";

export interface TrackJsonFormat {
  name: string;
  sample: string;
  steps: { on: boolean; volume: VolumeLevelNames; probability: number }[];
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
    if (step.probability >= 0 && step.probability <= 100) {
      const randomNumber = Math.random() * 100;
      if (randomNumber <= step.probability) {
        this.player.play(VolumeLevels[step.volume]);
      }
    } else {
      console.error("Invalid probability value");
    }
  }

  toJson() {
    return {
      name: this.name,
      sample: this.sample,
      steps: this.steps.map((step) => ({
        volume: step.volume,
        on: step.on,
        probability: step.probability,
      })),
    };
  }

  static fromJson(track: TrackJsonFormat) {
    const trackSteps = track.steps.map(
      (stepInfo) => new Step(stepInfo.on, stepInfo.volume, stepInfo.probability)
    );
    return new TrackModel(track.name, track.sample, trackSteps);
  }
}

export function generateTracks(): TrackModel[] {
  return [
    new TrackModel("kick", "sounds/1/kick.wav"),
    new TrackModel("snare", "sounds/1/snare.wav"),
    new TrackModel("closed hat", "sounds/1/close.wav"),
    new TrackModel("open hat", "sounds/1/lev.wav"),
    new TrackModel("Tom", "sounds/1/odd.wav"),
  ];
}
