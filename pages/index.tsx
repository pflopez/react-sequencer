import Head from "next/head";
import Sequencer from "../components/sequencer";

export default function Index() {
  return (
    <>
      <Head>
        <title>Sequencer</title>
        <meta name="description" content="Sequencer on react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sequencer />
    </>
  );
}
