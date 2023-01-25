import styles from '../styles/Controls.module.scss';

type Props = {
    playing: boolean;
    bpm: number;
    onTogglePlay: Function,
    onUpdateBpm: Function
}


export default function Controls({playing, bpm, onTogglePlay, onUpdateBpm}: Props) {

    function togglePlay(){
        onTogglePlay();
    }
    return (
        <>
            <button onClick={togglePlay} className={playing ? styles.playing : styles.stopped}>{playing ? 'Stop' : 'Play'}</button>
            <input value={bpm} onChange={ e => onUpdateBpm(e.target.value)}/>
        </>
    );
}