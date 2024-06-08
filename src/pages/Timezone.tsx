import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CameraStream from "../components/CameraStream";
import Setup from "../components/Setup";
import Controlbar from "../components/Controlbar";
import Container from "../elements/Container";

const Timezone = () => {
  const { name } = useParams();
  const [isReadyToJoin, setisReadyToJoin] = useState(false);
  const [buttonText, setButtonText] = useState("Ready To Join");
  const selfVideoRef = useRef<any>(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = selfVideoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getVideo();

    return () => {};
  }, [selfVideoRef]);

  return (
    <div className="z-0 flex flex-col justify-start items-center min-h-screen gap-10">
      <h1 className="text-6xl">Timezone {name}</h1>
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
          <div className="flex flex-col gap-5 p-8 lg:pr-32 border-b-2 lg:border-r-2 lg:border-b-0 border-gray-600">
            <CameraStream videoRef={selfVideoRef} width={500} />
            <Controlbar />
            <button
              disabled={isReadyToJoin}
              onClick={() => {
                setisReadyToJoin(true);
                setButtonText("Joining...");
              }}
              className="bg-zinc-300 w-full uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
            >
              {buttonText}
            </button>
          </div>
          <Setup isJoining={true} />
        </div>
      </Container>
    </div>
  );
};

export default Timezone;
