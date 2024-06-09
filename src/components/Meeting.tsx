import React, { useEffect, useRef, useState } from "react";
import CameraStream from "./CameraStream";
import Controlbar from "./Controlbar";
import Container from "../elements/Container";
import { FaMusic } from "react-icons/fa";

const Meeting = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setisVideoOn] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [addVideoUrl, setAddVideoUrl] = useState("");

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
    <div className="w-[calc(100vw-5px)] overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-600 flex justify-center items-center flex-col-reverse md:flex-col gap-6 px-20 py-8 shadow-md shadow-black">
      <div
        data-show={showSidebar}
        className="w-[70vw] z-20 lg:w-[30vw] h-screen fixed right-0 data-[show=true]:right-[-70vw] lg:data-[show=true]:right-[-30vw] transition-all shadow-md shadow-black"
      >
        <div className="w-full h-full relative backdrop-blur-3xl backdrop-brightness-[2] flex flex-col justify-between items-center px-5 py-8">
          <button
            onClick={() => setShowSidebar((showSidebar) => !showSidebar)}
            className="absolute top-3 left-[-48px] w-12 h-12 bg-gradient-to-bl from-teal-600 to-teal-900 shadow-md shadow-black flex justify-center items-center text-2xl rounded-l-xl"
          >
            <FaMusic />
          </button>
          <div className="text-3xl font-extrabold uppercase">Current Q</div>
          <form className="w-full flex flex-col gap-4">
            <input
              value={addVideoUrl}
              onChange={(e) => {
                setAddVideoUrl(e.target.value);
              }}
              type="text"
              placeholder="Song Link"
              className="bg-zinc-700 w-full px-4 py-2 border-white border-[0.5px] rounded-2xl"
            />
            <button
              disabled={addVideoUrl === ""}
              className="bg-zinc-300 uppercase text-slate-800 px-2 py-2 rounded-lg shadow-sm shadow-gray-900 enabled:hover:bg-zinc-400 disabled:text-zinc-400 disabled:bg-zinc-500"
            >
              Add to Q
            </button>
          </form>
        </div>
      </div>
      <Container>
        <div className="w-full h-full p-5 grid grid-cols-2 md:grid-cols-3 gap-5">
          <CameraStream
            isSelf={true}
            videoRef={selfVideoRef}
            width="500px"
            isVideoOn={isVideoOn}
          />
        </div>
      </Container>
      <div className="fixed bottom-0 backdrop-blur-3xl backdrop-brightness-[4] px-10 py-4 rounded-t-xl">
        <Controlbar
          isMicOn={isMicOn}
          isVideoOn={isVideoOn}
          toggleMic={toggleMic}
          toggleVideo={toggleVideo}
        />
        {/* media controls */}
      </div>
    </div>
  );
};

export default Meeting;
