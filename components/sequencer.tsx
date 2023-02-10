import Track from "../components/track";
import Controls from "../components/controls";
import { emptyStep, generateTracks, TrackModel } from "../models/track";
import styles from "../styles/Sequencer.module.scss";
import { useEffect, useState } from "react";
import { Clock } from "../models/clock";
import StepIndicator from "../components/step-indicator";
import {
  getTracksFromLocalStorage,
  saveTracksInLocalStorage,
} from "../utility/ls";
import StepEditor from "./step-editor";
import { Step } from "../models/step";

export default function Sequencer() {
  const [tracks, setTracks] = useState(generateTracks());
  const clock = Clock();
  const [adding, setAdding] = useState(false);
  const [clickStepTarget, setClickStepTarget] = useState<HTMLElement | null>(
    null
  );
  const [stepTemplate, setStepTemplate] = useState<Step>(emptyStep);

  const mutedTracks = tracks.filter((t) => t.muted).reduce((acc) => acc + 1, 0);
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
    let muted = false;
    // no muted tracks, mute all.
    if (mutedTracks === 0) muted = true;
    // else unmute
    setTracks(
      tracks.map((t) => {
        t.muted = muted;
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
          mutedTracksRatio={mutatedTracksRatio}
        />
      </div>
      <StepEditor step={stepTemplate} updateStepInfo={updateStepInfo} />
    </main>
  );
}
