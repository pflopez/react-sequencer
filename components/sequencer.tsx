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
import StepInfo from "./step-info";
import { Step, VolumeLevelNames } from "../models/step";

const emptyStep = new Step(false, "mid", 100);

export default function Sequencer() {
  const [tracks, setTracks] = useState(generateTracks());
  const clock = Clock();
  const [adding, setAdding] = useState(false);
  const [clickStepTarget, setClickStepTarget] = useState(null);
  const [selectedStep, setSelectedStep] = useState<Step>(emptyStep);
  const [selectedTrack, setSelectedTrack] = useState<TrackModel | null>(null);

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

  function updateStepInfo(
    step: Step,
    value: { volume: VolumeLevelNames; probability: number }
  ) {
    if (value.volume) {
      step.volume = value.volume;
    }
    if (value.probability) {
      step.probability = value.probability;
    }

    if (selectedTrack) {
      setSelectedStep(step);
      onUpdateTrack(selectedTrack);
    } else {
      setSelectedStep({
        ...selectedStep,
        ...{
          volume: value.volume || selectedStep.volume,
          probability: value.probability || selectedStep.probability,
        },
      });
    }
  }

  function updateSelectedStep(step: Step, track: TrackModel) {
    if (step.id === selectedStep.id) {
      // remove selected state
      setSelectedStep(emptyStep);
      setSelectedTrack(null);
    } else {
      setSelectedStep(step);
      setSelectedTrack(track);
    }
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
            onSelectedStep={updateSelectedStep}
            selectedStep={selectedStep}
          />
        ))}
        <StepIndicator
          steps={tracks[0].steps}
          activeStep={clock.activeStep}
          onAllTrackMute={onAllTrackMute}
          mutedTracks={mutatedTracksRatio}
        />
      </div>
      <StepInfo
        step={selectedStep}
        updateStepInfo={updateStepInfo}
        emptyStep={selectedStep.id === emptyStep.id}
      />
    </main>
  );
}
