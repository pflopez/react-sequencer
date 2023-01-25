import {string} from "prop-types";
import { v4 } from 'uuid';

export class Step {
  on = false;
  velocity = 1;
  length = 1;
  id: string = '';

  constructor(velocity: number) {
    this.on = velocity > 0 ;
    this.velocity = velocity;
    this.id = v4();
  }

  get velocityText(){
    if(this.on){
      return 'vel-'+ this.velocity;
    }
    return '';
  }
}


