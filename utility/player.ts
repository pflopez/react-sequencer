import {Howl} from 'howler';


export class Player {
  howl: Howl | null = null;

  constructor(sample?: string) {
    if (sample) {
      this.howl = _howl(sample);
    }
  }

  play(volume: number, trackVolume: number) {
    if (this.howl) {
    //  this.howl.stop();
      this.howl.volume(trackVolume / volume)
      this.howl.play();
    }
  }

  stop() {
    if (this.howl) {
      this.howl.fade(this.howl.volume(), 0, 10);
    }
  }

  async getDuration(): Promise<number> {
    return new Promise((resolve) => {
      if (this.howl) {
        const track = this.howl;
        track.once('load', () => resolve(track.duration()))
      }
    })
  }
}

function _howl(file: string) {
  return new Howl({
    src: [file],
    volume: 1
  })
}
