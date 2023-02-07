import styles from "../styles/Track.module.scss";
import buttonStyles from "../styles/Buttons.module.scss";
import { TrackModel } from "../models/track";
import { Step } from "../models/step";
import { useEffect } from "react";

type Props = {
  trackModel: TrackModel;
  onUpdateTrack: Function;
  activeStep: number;
  adding: boolean;
  setAdding: Function;
  clickStepTarget: any;
  setClickStepTarget: Function;
  onSelectedStep: Function;
  selectedStep: Step;
};

export default function Track({
  trackModel,
  onUpdateTrack,
  activeStep,
  adding,
  setAdding,
  clickStepTarget,
  setClickStepTarget,
  onSelectedStep,
  selectedStep,
}: Props) {
  // use effect to trigger samples.
  // This might not be  great as useEffect might be out of sync?
  useEffect(() => {
    if (activeStep === 0) {
      return;
    }
    if (trackModel.steps[activeStep - 1].on) {
      trackModel.play(trackModel.steps[activeStep - 1]);
    }
  }, [activeStep]);

  function clickStep(event: React.MouseEvent<HTMLDivElement>, step: Step) {
    if (event.button === 2) {
      event.preventDefault();
      return false;
    }
    // should be on if changing something
    const on =
      !step.on ||
      selectedStep.volume !== step.volume ||
      selectedStep.probability !== step.probability;

    updateStep(step, on);

    setAdding(step.on);
    setClickStepTarget((event.target as HTMLElement).parentElement as any);
  }

  function hoverStep(event: React.MouseEvent<HTMLDivElement>, step: Step) {
    const fromSameTarget = event.relatedTarget === clickStepTarget;
    if (event.buttons && fromSameTarget) {
      updateStep(step, adding);
    }
  }

  function endClick() {
    setClickStepTarget(null);
  }

  function updateStep(step: Step, newValue: boolean) {
    if (step.on) {
      step.accent = false;
    }
    step.on = newValue;
    step.volume = selectedStep.volume;
    step.probability = selectedStep.probability;
    onUpdateTrack(trackModel);
  }

  function toggleMute() {
    trackModel.mute = !trackModel.mute;
    // This seems to work?
    onUpdateTrack(trackModel);
    // but shoulnd't I be doing this instead: ?
    // onUpdateTrack({ ...trackModel, ...{ mute: trackModel.mute } });
  }

  function onContextMenu(event: React.MouseEvent<HTMLDivElement>, step: Step) {
    event.preventDefault();
    onSelectedStep(step, trackModel);
    return false;
  }

  function stepClass(step: Step) {
    let classes = [
      buttonStyles.step,
      buttonStyles.grouped,
      step.on ? buttonStyles.active : " ",
      step.id === selectedStep.id ? buttonStyles.accent : "",
      buttonStyles[step.volume],
    ];
    return classes.join(" ");
  }

  return (
    <div className={styles.track}>
      <div className={styles.trackName}>{trackModel.name}</div>
      <button
        className={
          buttonStyles.mute +
          " " +
          (trackModel.mute ? buttonStyles.activeButton : "")
        }
        onClick={toggleMute}
        title="mute track"
      >
        M
      </button>
      <div className={styles.trackSteps}>
        {trackModel.steps.map((step) => (
          <div
            key={step.id}
            onContextMenu={(e) => onContextMenu(e, step)}
            className={stepClass(step)}
            onMouseDown={(e) => clickStep(e, step)}
            onMouseEnter={(e) => hoverStep(e, step)}
            onMouseUp={endClick}
          >
            {step.on && step.probability !== 100 ? step.probability : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
