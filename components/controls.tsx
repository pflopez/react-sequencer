import styles from "../styles/Controls.module.scss";

export default function Controls({
  playing,
  bpm,
  onTogglePlay,
  onUpdateBpm,
  onSaveTracks,
  onClearTracks,
}: {
  playing: boolean;
  bpm: number;
  onTogglePlay: () => void;
  onUpdateBpm: (value: any) => void;
  onSaveTracks: () => void;
  onClearTracks: () => void;
}) {
  function togglePlay() {
    onTogglePlay();
  }

  function playButtonClasses() {
    const css = [
      styles.togglePlay,
      styles.button,
      playing ? styles.playing : styles.stopped,
    ];
    return css.join(" ");
  }

  return (
    <div className={styles.controls}>
      <h1 className={styles.logo}>Sequencer</h1>
      <div className={styles.center}>
        <div className={styles.bpmText}>bpm</div>
        <input
          value={bpm}
          onChange={(e) => onUpdateBpm(e.target.value)}
          className={styles.bpm}
        />
      </div>
      <button className={styles.button} onClick={onSaveTracks}>
        Save
      </button>
      <button className={styles.button} onClick={onClearTracks}>
        Clear
      </button>

      <button onClick={togglePlay} className={playButtonClasses()} />
    </div>
  );
}
