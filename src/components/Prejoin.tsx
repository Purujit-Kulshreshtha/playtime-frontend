import React, { useEffect, useRef, useState } from "react";
import Setup from "../components/Setup";
import Container from "../elements/Container";
import CameraStream from "../components/CameraStream";
import Controlbar from "../components/Controlbar";
import { ConnectionStatus } from "../pages/Timezone";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";
import { useParams } from "react-router-dom";
import { useZone } from "../context/ZoneProvider";
import { usePeer } from "../context/PeerProvider";

const PreJoin = (props: {
  name: string;
  status: ConnectionStatus;
  setStatus: React.Dispatch<React.SetStateAction<ConnectionStatus>>;
}) => {
  const [buttonText, setButtonText] = useState("Ready To Join");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setisVideoOn] = useState(true);

  const socket = useSocket();
  const user = useUser();
  const { zone } = useZone();
  const { name: zoneName } = useParams();
  const peer = usePeer();

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

  const create = (id: string) => {
    socket.emit(
      "create-zone",
      zoneName,
      password,
      {
        username: user.user?.name,
        id: id,
      },

      (response: any) => {
        if (response.status === 403) {
          setErrorMessage("Cannot create, zone already exists.");
          props.setStatus(ConnectionStatus.IS_NOT_READY_TO_JOIN);
          setButtonText("Try Again");
          return;
        }
        if (response.status === 200) {
          props.setStatus(ConnectionStatus.JOINED);
          return;
        }
        setErrorMessage("Something went wrong");
        console.log(response);
      }
    );
  };

  const join = (id: string) => {
    socket.emit(
      "join-zone",
      zoneName,
      password,
      {
        username: user.user?.name,
        id: id,
      },

      (response: any) => {
        if (response.status === 404) {
          setErrorMessage("Zone not found.");
          props.setStatus(ConnectionStatus.IS_NOT_READY_TO_JOIN);
          setButtonText("Try Again");
          return;
        }
        if (response.status === 403) {
          setErrorMessage("Wrong password.");
          props.setStatus(ConnectionStatus.IS_NOT_READY_TO_JOIN);
          setButtonText("Try Again");
          return;
        }
        if (response.status === 200) {
          props.setStatus(ConnectionStatus.JOINED);
          return;
        }
        setErrorMessage("Something went wrong");
      }
    );
  };

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setStatus(ConnectionStatus.JOINING);
    setButtonText("Joining...");

    if (zone.isCreate) {
      create(peer._id);
    } else {
      join(peer._id);
    }
  };

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
            <form
              className="flex flex-col justify-center items-center gap-4"
              onSubmit={handleJoin}
            >
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
                className="bg-zinc-300 w-full uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
              >
                {buttonText}
              </button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
          </div>
          <Setup isJoining={true} />
        </div>
      </Container>
    </div>
  );
};

export default PreJoin;
