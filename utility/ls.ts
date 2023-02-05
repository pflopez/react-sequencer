import { TrackJsonFormat, TrackModel } from "../models/track";

const LS_KEY = "SEQUENCER_TRACKS_DATA";

export function saveTracksInLocalStorage(tracks: TrackModel[]) {
  let data = tracks.map((track) => track.toJson());
  window.localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function getTracksFromLocalStorage(): TrackModel[] | null {
  const data = window.localStorage.getItem(LS_KEY);
  if (data) {
    const parsed = JSON.parse(data);
    return parsed.map((track: TrackJsonFormat) => TrackModel.fromJson(track));
  }
  return null;
}
