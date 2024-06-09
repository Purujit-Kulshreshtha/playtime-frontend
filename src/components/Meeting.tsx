import React, { useEffect, useRef, useState } from "react";
import CameraStream from "./CameraStream";
import Controlbar from "./Controlbar";
import Container from "../elements/Container";

const Meeting = () => {
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
    <div className="w-[calc(100vw-5px)] overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-600 flex justify-center items-center flex-col-reverse md:flex-col gap-6 px-20 py-8">
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
