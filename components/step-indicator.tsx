import styles from "../styles/StepIndicator.module.scss";
import { Step } from "../models/step";
import buttonStyles from "../styles/Buttons.module.scss";
import MuteButton from "./mute-button";

export default function StepIndicator({
  steps,
  activeStep,
  mutedTracksRatio,
  onAllTrackMute,
}: {
  steps: Step[];
  activeStep: number;
  mutedTracksRatio: number;
  onAllTrackMute: () => void;
}) {
  return (
    <>
      <div className={styles.stepIndicator}>
        <MuteButton muted={mutedTracksRatio} onToggle={onAllTrackMute} />
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={
              styles.indicator +
              " " +
              (index === activeStep - 1 ? styles.active : "")
            }
          />
        ))}
      </div>
    </>
  );
}
