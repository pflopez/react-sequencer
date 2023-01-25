import styles from '../styles/Track.module.scss'
import {TrackModel} from "../models/track";
import {Step} from "../models/step";
import {useEffect} from "react";

type Props = {
    trackModel: TrackModel,
    onUpdateTrack: Function
    activeStep: number
}

export default function Track({trackModel, onUpdateTrack, activeStep}: Props) {

    useEffect(() => {
        if (activeStep === 0) {
            return;
        }
        if (trackModel.steps[activeStep - 1].on) {
            trackModel.play();
        }
    }, [activeStep])

    function clickStep(event: React.MouseEvent<HTMLDivElement>, step: Step) {
        step.on = !step.on;
        onUpdateTrack(trackModel);
    }

    function hoverStep(event: React.MouseEvent<HTMLDivElement>, step: Step) {
        console.log('hover step');
    }

    function endClick() {
        console.log('end');
    }

    return (
        <div className={styles.track}>
            <div className={styles.trackName}>{trackModel.name}</div>
            <div className={styles.trackSteps}>
                {trackModel.steps.map((step) => (
                    <div key={step.id}
                         className={styles.step + ' ' + (step.on ? styles.active : ' ')}
                         onMouseDown={e => clickStep(e, step)}
                         onMouseEnter={e => hoverStep(e, step)}
                         onMouseUp={endClick}/>
                ))}
            </div>
        </div>
    );
}