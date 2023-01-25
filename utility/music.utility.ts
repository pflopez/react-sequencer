/**
 * calculates time in ms for intervals based on bpm and subdivison ( quarter note, half note etc)
 * @param bpm
 * @param subdivision
 */
export function intervalFromBpm(bpm: number, subdivision: number) {
  return ((60 / bpm) * 1000 / subdivision) * 4;
}

export function getActiveStep(stepNumber: number, maxLength: number) {
  const mod = stepNumber % maxLength;
  if (stepNumber === 0) {
    return 0;
  }
  if (mod === 0) {
    return maxLength;
  }
  return mod;
}
