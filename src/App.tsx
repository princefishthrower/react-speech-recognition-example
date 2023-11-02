import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { textToSpeech } from "./utils/textToSpeech";

export default function App() {
  const [message, setMessage] = useState("");
  const commands: Array<{ command: string; description: string, callback(): void }> = [
    {
      command: "clear",
      description: "Clears the transcript",
      callback: () => resetTranscript(),
    },
    {
      command: "stop",
      description: "Stops listing",
      callback: () => setMessage("I wasn't talking."),
    },
    {
      command: "Read",
      description: "Reads the current transcript",
      callback: () => textToSpeech(transcript),
    },
  ];
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  // log out each of the transcript states
  console.log("transcript:", transcript);
  console.log("interimTranscript:", interimTranscript);
  console.log("finalTranscript:", finalTranscript);
  console.log("resetTranscript:", resetTranscript);


  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome, maybe?"
    );
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };
  
  let finalFinalTranscript = transcript;

  // if the interimTranscript is a single word and is one of the commands remove it from the transcript
  if (interimTranscript.split(" ").length === 1 && commands.map(command => command.command).includes(interimTranscript)) {
    finalFinalTranscript = transcript.split(" ").slice(0, -1).join(" ");
  }

  return (
    <div>
      <div>
        <h1>React speech recognition!</h1>
        <h2>Available commands:</h2>
        {commands.map(command => {
          return <div><p>{command.command}</p><p>{command.description}</p></div>
        })}
        <span>listening: {listening ? "on" : "off"}</span>
        <div>
          <button type="button" onClick={resetTranscript}>
            Reset
          </button>
          <button type="button" onClick={listenContinuously}>
            Listen
          </button>
          <button type="button" onClick={SpeechRecognition.stopListening}>
            Stop
          </button>
        </div>
      </div>
      <div>{message}</div>
      <div>
        <span>{finalFinalTranscript}</span>
      </div>
    </div>
  );
}
