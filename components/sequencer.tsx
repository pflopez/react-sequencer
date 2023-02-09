import Track from "../components/track";
import Controls from "../components/controls";
import { generateTracks, TrackModel } from "../models/track";
import styles from "../styles/Sequencer.module.scss";
import { useEffect, useState } from "react";
import { Clock } from "../models/clock";
import StepIndicator from "../components/step-indicator";
import {
  getTracksFromLocalStorage,
  saveTracksInLocalStorage,
} from "../utility/ls";
import StepEditor from "./step-editor";
import { Step, VolumeLevelNames } from "../models/step";

const emptyStep = new Step(false, "mid", 100);

export default function Sequencer() {
  const [tracks, setTracks] = useState(generateTracks());
  const clock = Clock();
  const [adding, setAdding] = useState(false);
  const [clickStepTarget, setClickStepTarget] = useState<HTMLElement | null>(
    null
  );
  const [stepTemplate, setStepTemplate] = useState<Step>(emptyStep);

  const mutedTracks = tracks.filter((t) => t.mute).reduce((acc) => acc + 1, 0);
  const mutatedTracksRatio = mutedTracks / tracks.length;

  useEffect(() => {
    const data = getTracksFromLocalStorage();
    if (data) {
      setTracks(data);
    }
  }, []);

  function onUpdateBpm(userBpm: string) {
    userBpm = userBpm || "0";
    clock.setBpm(parseInt(userBpm, 10));
  }

  function onUpdateTrack(track: TrackModel) {
    setTracks(
      tracks.map((t) => {
        if (t.id === track.id) {
          return track;
        }
        return t;
      })
    );
  }

  function onSaveTracks() {
    saveTracksInLocalStorage(tracks);
  }

  function onClearTracks() {
    setTracks(generateTracks());
  }

  function updateStepInfo(value: Partial<Step>) {
    setStepTemplate({
      ...stepTemplate,
      ...{
        volume: value.volume || stepTemplate.volume,
        probability: value.probability || stepTemplate.probability,
      },
    });
  }

  function onAllTrackMute() {
    let mute = false;
    if (mutedTracks === 0) {
      // mute all.
      mute = true;
    }
    // else unmute
    setTracks(
      tracks.map((t) => {
        t.mute = mute;
        return t;
      })
    );
  }

  return (
    <main className={styles.sequencer}>
      <Controls
        playing={clock.playing}
        bpm={clock.bpm}
        onTogglePlay={clock.togglePlay}
        onUpdateBpm={onUpdateBpm}
        onSaveTracks={onSaveTracks}
        onClearTracks={onClearTracks}
      />
      <div className={styles.tracks}>
        {tracks.map((track) => (
          <Track
            key={track.name}
            trackModel={track}
            onUpdateTrack={onUpdateTrack}
            activeStep={clock.activeStep}
            adding={adding}
            setAdding={setAdding}
            clickStepTarget={clickStepTarget}
            setClickStepTarget={setClickStepTarget}
            stepTemplate={stepTemplate}
          />
        ))}
        <StepIndicator
          steps={tracks[0].steps}
          activeStep={clock.activeStep}
          onAllTrackMute={onAllTrackMute}
          mutedTracks={mutatedTracksRatio}
        />
      </div>
      <StepEditor step={stepTemplate} updateStepInfo={updateStepInfo} />
    </main>
  );
}
