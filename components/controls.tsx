import styles from '../styles/Controls.module.scss';

type Props = {
    playing: boolean;
    bpm: number;
    onTogglePlay: Function,
    onUpdateBpm: Function
}


export default function Controls({playing, bpm, onTogglePlay, onUpdateBpm}: Props) {

    function togglePlay() {
        onTogglePlay();
    }

    return (
        <div className={styles.controls}>
            <div className={styles.helper}>
                Sequencer
            </div>
            <div className={styles.center}>
                <div className={styles.bpmText}>bpm</div>
                <input value={bpm} onChange={e => onUpdateBpm(e.target.value)} className={styles.bpm}/>
            </div>

            <button onClick={togglePlay}
    className={styles.togglePlay + ' ' + (playing ? styles.playing : styles.stopped)}/>
        </div>
    );
}