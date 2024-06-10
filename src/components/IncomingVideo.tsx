import React, { useRef } from "react";

const IncomingVideo = (props: { stream: any; width: string }) => {
  const videoRef = useRef<any>(null);

  videoRef.current.srcObject = props.stream;
  videoRef.current.addEventListener("loadedmetadata", () => {
    videoRef.current.play();
  });
  return (
    <div className="shadow-md shadow-[#222] rounded-2xl w-fit flex justify-center items-center">
      <video
        ref={videoRef}
        width={props.width}
        height={props.width}
        className="rounded-2xl"
      ></video>
    </div>
  );
};

export default IncomingVideo;
