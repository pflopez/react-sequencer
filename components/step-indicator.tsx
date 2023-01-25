import styles from "../styles/Sequencer.module.scss";
import {Step} from "../models/step";

type Props = {
    steps: Step[]
    activeStep: number
}
export default function StepIndicator({steps, activeStep}: Props){
    return (
        <>
            <div className={styles.stepIndicator}>
                {steps.map((step, index) => (
                    <div key={step.id}
                         className={styles.indicator + ' ' + (index === (activeStep - 1) ? styles.active : '')}/>
                ))}
            </div>
        </>
    );
}