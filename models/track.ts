import {Step} from "./step";
import {Player} from "../utility/player";

export class TrackModel {
    id: string  = ''
    name: string = ''
    sample: string = '';
    volume: number = 1;
    steps: Step[] = [];
    player = new Player();

    constructor(name: string, sample: string) {
        this.id = name;
        this.name = name;
        this.sample = sample
        // create steps
        for (let i = 0; i < 16; i++) {
            const val = 0 ;
            this.steps.push(new Step(val));
        }
        this.player = new Player(this.sample);
    }

    play(){
        this.player.play(1,1);
    }


}