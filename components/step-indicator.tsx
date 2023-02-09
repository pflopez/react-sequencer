import styles from "../styles/StepIndicator.module.scss";
import { Step } from "../models/step";
import buttonStyles from "../styles/Buttons.module.scss";
import MuteButton from "./mute-button";

type Props = {
  steps: Step[];
  activeStep: number;
  mutedTracks: number;
  onAllTrackMute: () => void;
};
export default function StepIndicator({
  steps,
  activeStep,
  mutedTracks,
  onAllTrackMute,
}: Props) {
  return (
    <>
      <div className={styles.stepIndicator}>
        <MuteButton muted={mutedTracks} onToggle={onAllTrackMute} />
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
