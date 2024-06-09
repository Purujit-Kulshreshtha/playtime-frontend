import React, { useEffect } from "react";

const CameraStream = (props: {
  videoRef: React.MutableRefObject<any>;
  width: string;
  isVideoOn: boolean;
  isSelf?: boolean;
}) => {
  useEffect(() => {
    if (props.isSelf) {
      try {
        props.videoRef.current.volume = 0;
      } catch (error) {
        console.error(error);
      }
    }

    return () => {};
  }, [props.isSelf, props.videoRef, props.isVideoOn]);

  return (
    <div className="shadow-md shadow-[#222] rounded-2xl w-fit flex justify-center items-center">
      {props.isVideoOn ? (
        <video
          ref={props.videoRef}
          width={props.width}
          height={props.width}
          className="rounded-2xl"
        ></video>
      ) : (
        <div
          className={`w-[300px] h-[300px] bg-[#333] flex justify-center items-center rounded-2xl text-6xl`}
        >
          <h1>No video</h1>
        </div>
      )}
    </div>
  );
};

export default CameraStream;
