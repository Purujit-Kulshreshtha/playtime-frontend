import React from "react";

const CameraStream = (props: {
  videoRef: React.MutableRefObject<any>;
  width: number;
}) => {
  return (
    <div>
      <video
        ref={props.videoRef}
        width={props.width}
        className="rounded-2xl"
      ></video>
    </div>
  );
};

export default CameraStream;
