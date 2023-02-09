import styles from "../styles/Track.module.scss";
import buttonStyles from "../styles/Buttons.module.scss";
import { TrackModel } from "../models/track";
import { Step } from "../models/step";
import { useEffect } from "react";
import MuteButton from "./mute-button";

type Props = {
  trackModel: TrackModel;
  onUpdateTrack: (trackModel: TrackModel) => void;
  activeStep: number;
  adding: boolean;
  setAdding: (adding: boolean) => void;
  clickStepTarget: any;
  setClickStepTarget: (parent: HTMLElement | null) => void;
  stepTemplate: Step;
};

export default function Track({
  trackModel,
  onUpdateTrack,
  activeStep,
  adding,
  setAdding,
  clickStepTarget,
  setClickStepTarget,
  stepTemplate,
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
      stepTemplate.volume !== step.volume ||
      stepTemplate.probability !== step.probability;

    updateStep(step, on);

    setAdding(step.on);
    const target = event.target as HTMLElement;

    if (target.parentElement) {
      setClickStepTarget(target.parentElement);
    }
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
    step.volume = stepTemplate.volume;
    step.probability = stepTemplate.probability;
    onUpdateTrack(trackModel);
  }

  function toggleMuteTrack(): void {
    trackModel.mute = !trackModel.mute;
    // This seems to work?
    onUpdateTrack(trackModel);
    // but shouldn't I be doing this instead: ?
    // onUpdateTrack({ ...trackModel, ...{ mute: trackModel.mute } });
  }

  function getStepClassNames(step: Step) {
    let classes = [
      buttonStyles.step,
      buttonStyles.grouped,
      step.on ? buttonStyles.active : " ",
      step.id === stepTemplate.id ? buttonStyles.accent : "",
      buttonStyles[step.volume],
    ];
    return classes.join(" ");
  }

  return (
    <div className={styles.track}>
      <div className={styles.trackName}>{trackModel.name}</div>
      <MuteButton muted={trackModel.mute} onToggle={toggleMuteTrack} />
      <div className={styles.trackSteps}>
        {trackModel.steps.map((step) => (
          <div
            key={step.id}
            className={getStepClassNames(step)}
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
