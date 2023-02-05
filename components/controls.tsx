import styles from "../styles/Controls.module.scss";

type Props = {
  playing: boolean;
  bpm: number;
  onTogglePlay: Function;
  onUpdateBpm: Function;
  onSaveTracks: Function;
  onClearTracks: Function;
};

export default function Controls({
  playing,
  bpm,
  onTogglePlay,
  onUpdateBpm,
  onSaveTracks,
  onClearTracks,
}: Props) {
  function togglePlay() {
    onTogglePlay();
  }

  return (
    <div className={styles.controls}>
      <h1 className={styles.logo}>Sequencer</h1>
      <div className={styles.helper}>
        Click steps to toggle on or off.
        <br />
        Right click steps to add accent.
      </div>
      <div className={styles.center}>
        <div className={styles.bpmText}>bpm</div>
        <input
          value={bpm}
          onChange={(e) => onUpdateBpm(e.target.value)}
          className={styles.bpm}
        />
      </div>
      <button className={styles.button} onClick={(e) => onSaveTracks(e)}>Save</button>
      <button className={styles.button} onClick={(e) => onClearTracks(e)}>Clear</button>

      <button
        onClick={togglePlay}
        className={
          styles.togglePlay + " " + styles.button + " " + (playing ? styles.playing : styles.stopped)
        }
      />
    </div>
  );
}
