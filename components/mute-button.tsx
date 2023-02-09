import buttonStyles from "../styles/Buttons.module.scss";

export default function MuteButton({
  muted,
  onToggle,
}: {
  muted: boolean | number;
  onToggle: () => void;
}) {
  function cssForGlobalMute() {
    if (typeof muted === "boolean") return;
    if (muted === 0) return;
    if (muted === 1) return buttonStyles.mutedAll;
    if (muted > 0) return buttonStyles.mutedSome;
  }

  function getCssClasses() {
    const classes = [buttonStyles.mute];
    if (typeof muted === "boolean" && muted) {
      classes.push(buttonStyles.activeButton);
    } else {
      classes.push(cssForGlobalMute() || "");
    }
    return classes.join(" ");
  }
  return (
    <button className={getCssClasses()} onClick={onToggle} title="mute track">
      M
    </button>
  );
}
