import Head from 'next/head'
import Track from "../components/track";
import Controls from "../components/controls";
import {TrackModel} from "../models/track";
import styles from '../styles/Sequencer.module.scss'
import {useState} from "react";
import {Clock} from "./clock";
import StepIndicator from "../components/step-indicator";

function generateTracks(): TrackModel[] {
    return [new TrackModel('kick'), new TrackModel('snare'), new TrackModel('tom')];
}

export default function Home() {


    const [tracks, setTracks] = useState(generateTracks());
    const clock = Clock();


    function onUpdateBpm(userBpm: string) {
        userBpm = userBpm || '0';
        clock.setBpm(parseInt(userBpm, 10));
    }

    function onUpdateTrack(track: TrackModel) {
        setTracks(tracks.map(t => {
            if (t.id === track.id) {
                return track;
            }
            return t;
        }));
    }

    return (
        <>
            <Head>
                <title>Sequencer</title>
                <meta name="description" content="Sequencer on react"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.sequencer}>
                <Controls
                    playing={clock.playing}
                    bpm={clock.bpm}
                    onTogglePlay={clock.togglePlay}
                    onUpdateBpm={onUpdateBpm}
                />
                <div className={styles.tracks}>
                    {tracks.map((track) => (
                        <Track key={track.name} trackModel={track} onUpdateTrack={onUpdateTrack}/>
                    ))}
                    <StepIndicator steps={tracks[0].steps} activeStep={clock.activeStep}/>
                </div>
            </main>
        </>
    )
}
