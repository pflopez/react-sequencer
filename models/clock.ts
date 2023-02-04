import { useState } from "react";
import { getActiveStep, intervalFromBpm } from "../utility/music.utility";

export function Clock() {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  function startPlaying() {
    setActiveStep(1);
    let intervalId = setInterval(() => {
      setActiveStep((activeStep) => getActiveStep(activeStep + 1, 16));
    }, intervalFromBpm(bpm, 16));
    setIntervalId(intervalId as any);
  }

  function stop() {
    clearInterval(intervalId);
    setActiveStep(0);
  }

  function togglePlay() {
    if (!playing) {
      startPlaying();
    } else {
      stop();
    }
    setPlaying(!playing);
  }

  return {
    activeStep,
    startPlaying,
    stop,
    togglePlay,
    playing,
    bpm,
    setBpm,
  };
}
