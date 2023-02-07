import styles from "../styles/StepIndicator.module.scss";
import { Step } from "../models/step";
import buttonStyles from "../styles/Buttons.module.scss";

type Props = {
  steps: Step[];
  activeStep: number;
  mutedTracks: number;
  onAllTrackMute: Function;
};
export default function StepIndicator({
  steps,
  activeStep,
  mutedTracks,
  onAllTrackMute,
}: Props) {
  function cssForMute() {
    if (mutedTracks === 0) return;
    if (mutedTracks === 1) return buttonStyles.mutedAll;
    if (mutedTracks > 0) return buttonStyles.mutedSome;
  }

  return (
    <>
      <div className={styles.stepIndicator}>
        <button
          className={buttonStyles.mute + " " + cssForMute()}
          title="mute track"
          onClick={(_) => onAllTrackMute()}
        >
          M
        </button>
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
