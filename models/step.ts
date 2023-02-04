import { v4 } from "uuid";

export class Step {
  on = false;
  accent = false;
  id: string = "";

  getVolume() {
    return this.accent ? 1 : 0.5;
  }

  constructor() {
    this.id = v4();
  }
}
