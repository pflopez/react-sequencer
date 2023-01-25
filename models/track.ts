import {Step} from "./step";

export class TrackModel {
    id: string  = ''
    name: string = ''
    sample: string = '';
    volume: number = 1;
    steps: Step[] = [];

    constructor(name: string) {
        this.id = name;
        this.name = name;
        // create steps
        for (let i = 0; i < 16; i++) {
            const val = 0 ;
            this.steps.push(new Step(val));
        }
    }
}