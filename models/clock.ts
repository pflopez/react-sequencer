import { useEffect, useState } from "react";
import { getActiveStep, intervalFromBpm } from "../utility/music.utility";
import { Subscription, timer } from "rxjs";

export function Clock() {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [runner, setRunner] = useState<Subscription | null>(null);

  useEffect(() => {
    if (playing) {
      setRunner(getRunner());
    } else {
      if (runner) {
        runner.unsubscribe();
        setRunner(null);
      }
    }
  }, [playing]);

  function startPlaying() {}

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

  function getRunner() {
    return timer(0, intervalFromBpm(bpm, 16)).subscribe((play) => {
      setActiveStep((prevStep) => getActiveStep(prevStep + 1, 16));
    });
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
