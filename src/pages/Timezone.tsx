import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CameraStream from "../components/CameraStream";
import Setup from "../components/Setup";
import Controlbar from "../components/Controlbar";
import Container from "../elements/Container";

enum ConnectionStatus {
  IS_NOT_READY_TO_JOIN,
  JOINING,
  JOINED,
}

const Timezone = () => {
  const { name } = useParams();
  const [status, setStatus] = useState(ConnectionStatus.IS_NOT_READY_TO_JOIN);

  useEffect(() => {
    if (status === ConnectionStatus.JOINING) {
      //emit join event here
      console.log("Join event emited");
      setTimeout(() => {
        setStatus(ConnectionStatus.JOINED);
      }, 2000);
    }

    return () => {};
  }, [status]);

  if (
    status === ConnectionStatus.IS_NOT_READY_TO_JOIN ||
    status === ConnectionStatus.JOINING
  )
    return <PreJoin name={name || ""} status={status} setStatus={setStatus} />;

  if (status === ConnectionStatus.JOINED) {
    return <Meeting />;
  }

  return <>Something went wrong... Please try again</>;
};

const Meeting = () => {
  return (
    <div>
      <h1>Meeting</h1>
    </div>
  );
};

const PreJoin = (props: {
  name: string;
  status: ConnectionStatus;
  setStatus: React.Dispatch<React.SetStateAction<ConnectionStatus>>;
}) => {
  const [buttonText, setButtonText] = useState("Ready To Join");
  const [password, setPassword] = useState("");
  let webcamStream: MediaStream | null = null;
  const selfVideoRef = useRef<any>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setisVideoOn] = useState(true);

  const toggleMic = () => {
    setIsMicOn((isMicOn) => !isMicOn);
    getMedia(!isMicOn);
  };

  const toggleVideo = () => {
    setisVideoOn((isVideoOn) => !isVideoOn);
    getMedia(!isVideoOn);
  };

  const getMedia = (audio: boolean = true, video: boolean = true) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: audio,
        video: video,
      })
      .then((stream) => {
        const video = selfVideoRef.current;
        video.srcObject = stream;
        webcamStream = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMedia();

    return () => {
      webcamStream && webcamStream.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selfVideoRef]);

  return (
    <div className="z-0 overflow-y-hidden flex flex-col justify-center items-center min-h-screen gap-10 p-20 lg:p-0">
      <div className="fixed text-2xl top-4 left-0 z-10 bg-gradient-to-br from-teal-600 to-teal-900 px-4 shadow-md shadow-black rounded-r-xl">
        <h1>{props.name}</h1>
      </div>
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
          <div className="flex flex-col gap-5 p-8 lg:pr-32 border-b-2 lg:border-r-2 lg:border-b-0 border-gray-600">
            <CameraStream isSelf={true} videoRef={selfVideoRef} width={500} />
            <Controlbar
              isMicOn={isMicOn}
              isVideoOn={isVideoOn}
              toggleMic={toggleMic}
              toggleVideo={toggleVideo}
            />
            <div className="flex justify-center items-center gap-4">
              <p className="w-full text-xs text-center text-gray-400">
                Password (leave empty if no password):
              </p>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="bg-zinc-700 w-full px-4 py-2 border-white border-[0.5px] rounded-2xl"
              />
            </div>
            <button
              disabled={props.status === ConnectionStatus.JOINING}
              onClick={() => {
                props.setStatus(ConnectionStatus.JOINING);
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
