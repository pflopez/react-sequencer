import {Step} from "./step";
import {Player} from "../utility/player";

export class TrackModel {
    id: string  = ''
    name: string = ''
    sample: string = '';
    steps: Step[] = [];
    player = new Player();

    constructor(name: string, sample: string) {
        this.id = name;
        this.name = name;
        this.sample = sample
        // create steps
        for (let i = 0; i < 16; i++) {
            this.steps.push(new Step());
        }
        this.player = new Player(this.sample);
    }

    play(step:Step){
        this.player.play(step.getVolume());
    }


}