import styles from "../styles/Track.module.scss";
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
};

export default function Track({
  trackModel,
  onUpdateTrack,
  activeStep,
  adding,
  setAdding,
  clickStepTarget,
  setClickStepTarget,
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
    if (event.button === 2 && step.on) {
      event.preventDefault();
      return false;
    }
    updateStep(step, !step.on);
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
    onUpdateTrack(trackModel);
  }

  function onContextMenu(event: React.MouseEvent<HTMLDivElement>, step: Step) {
    event.preventDefault();
    step.accent = !step.accent;
    onUpdateTrack(trackModel);
    return false;
  }

  return (
    <div className={styles.track}>
      <div className={styles.trackName}>{trackModel.name}</div>
      <div className={styles.trackSteps}>
        {trackModel.steps.map((step) => (
          <div
            key={step.id}
            onContextMenu={(e) => onContextMenu(e, step)}
            className={
              styles.step +
              " " +
              (step.on ? styles.active : " ") +
              " " +
              (step.accent ? styles.accent : "")
            }
            onMouseDown={(e) => clickStep(e, step)}
            onMouseEnter={(e) => hoverStep(e, step)}
            onMouseUp={endClick}
          />
        ))}
      </div>
    </div>
  );
}
