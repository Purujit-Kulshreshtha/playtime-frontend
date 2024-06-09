import React, { useEffect, useRef, useState } from "react";
import Setup from "../components/Setup";
import Container from "../elements/Container";
import CameraStream from "../components/CameraStream";
import Controlbar from "../components/Controlbar";
import { ConnectionStatus } from "../pages/Timezone";

const PreJoin = (props: {
  name: string;
  status: ConnectionStatus;
  setStatus: React.Dispatch<React.SetStateAction<ConnectionStatus>>;
}) => {
  const [buttonText, setButtonText] = useState("Ready To Join");
  const [password, setPassword] = useState("");

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setisVideoOn] = useState(true);

  let webcamStream: MediaStream | null = null;
  const stopStream = () => {
    webcamStream && webcamStream.getTracks().forEach((track) => track.stop());
  };

  const toggleMic = () => {
    setIsMicOn((isMicOn) => !isMicOn);
    getMedia(!isMicOn, isVideoOn);
  };

  const toggleVideo = () => {
    stopStream();
    setisVideoOn((isVideoOn) => !isVideoOn);
    getMedia(isMicOn, !isVideoOn);
  };

  const selfVideoRef = useRef<any>(null);

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
    getMedia(isMicOn, isVideoOn);

    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="z-0 overflow-y-hidden flex flex-col justify-center items-center min-h-screen gap-10 p-20 lg:p-0">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-5 p-8 lg:pr-32 border-b-2 lg:border-r-2 lg:border-b-0 border-gray-600">
            <CameraStream
              isSelf={true}
              videoRef={selfVideoRef}
              width="500px"
              isVideoOn={isVideoOn}
            />
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

export default PreJoin;
