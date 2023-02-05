import {
  probability,
  Step,
  VolumeLevelNames,
  VolumeLevels,
} from "../models/step";
import styles from "../styles/Track.module.scss";

export default function StepInfo({
  step,
  updateStepInfo,
}: {
  step: Step;
  updateStepInfo: Function;
}) {
  function updateVolume(value: VolumeLevelNames) {
    updateStepInfo(step, { volume: value });
  }
  function updateProbability(prob: number) {
    updateStepInfo(step, { probability: prob });
  }

  function volumeCssClasses(value: string) {
    const classes = [styles.step, step.volume === value ? styles.active : ""];
    return classes.join(" ");
  }

  function probabilityCssClasses(prob: number) {
    const classes = [
      styles.step,
      step.probability === prob ? styles.active : "",
    ];
    return classes.join(" ");
  }

  if (step) {
    return (
      <section>
        <div className={styles.stepInfo}>
          <h4>Step Volume:</h4>
          <div className={styles.trackSteps}>
            {Object.entries(VolumeLevels).map((value) => (
              <div
                key={value[0]}
                className={volumeCssClasses(value[0])}
                onClick={(_) => updateVolume(value[0] as VolumeLevelNames)}
              >
                <span>{value[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.stepInfo}>
          <h4>Step Probability</h4>
          <div className={styles.trackSteps}>
            {probability.map((prob) => (
              <div
                key={prob}
                className={probabilityCssClasses(prob)}
                onClick={(_) => updateProbability(prob)}
              >
                <span>{prob}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return <></>;
}
