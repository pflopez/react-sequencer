import {
  probability,
  Step,
  VolumeLevelNames,
  VolumeLevels,
} from "../models/step";
import styles from "../styles/StepInfo.module.scss";
import buttonStyles from "../styles/Buttons.module.scss";

export default function StepEditor({
  step,
  updateStepInfo,
}: {
  step: Step;
  updateStepInfo: (step: Partial<Step>) => void;
}) {
  function updateVolume(value: string) {
    updateStepInfo({ volume: value as VolumeLevelNames });
  }
  function updateProbability(prob: number) {
    updateStepInfo({ probability: prob });
  }

  function volumeCssClasses(value: string) {
    const classes = [
      buttonStyles.step,
      step.volume === value ? buttonStyles.active : "",
    ];
    return classes.join(" ");
  }

  function probabilityCssClasses(prob: number) {
    const classes = [
      buttonStyles.step,
      step.probability === prob ? buttonStyles.active : "",
    ];
    return classes.join(" ");
  }

  if (step) {
    return (
      <section className={styles.stepInfoContainer}>
        <div className={styles.stepInfo}>
          <h4>Step Volume:</h4>
          <div className={styles.infoSteps}>
            {Object.entries(VolumeLevels).map((value) => (
              <button
                key={value[0]}
                className={volumeCssClasses(value[0])}
                onClick={(_) => updateVolume(value[0])}
              >
                <span>{value[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stepInfo}>
          <h4>Step Probability</h4>
          <div className={styles.infoSteps}>
            {probability.map((prob) => (
              <button
                key={prob}
                className={probabilityCssClasses(prob)}
                onClick={(_) => updateProbability(prob)}
              >
                <span>{prob}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return <></>;
}
