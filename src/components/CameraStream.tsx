import React, { useEffect } from "react";

const CameraStream = (props: {
  videoRef: React.MutableRefObject<any>;
  width: number;
  isSelf?: boolean;
}) => {
  useEffect(() => {
    if (props.isSelf) {
      props.videoRef.current.volume = 0;
    }

    return () => {};
  }, [props.isSelf, props.videoRef]);

  return (
    <div>
      <video
        ref={props.videoRef}
        width={props.width}
        className="shadow-md shadow-[#222] rounded-2xl"
      ></video>
    </div>
  );
};

export default CameraStream;
