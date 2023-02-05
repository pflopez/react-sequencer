import { v4 } from "uuid";

export class Step {
  on = false;
  accent = false;
  id: string = "";

  getVolume() {
    return this.accent ? 1 : 0.5;
  }

  constructor(on?: boolean, accent?: boolean) {
    this.id = v4();
    this.on = on || false;
    this.accent = accent || false;
  }
}
