import React, { useState } from "react";
import { IoIosMic, IoIosMicOff } from "react-icons/io";
import { FiCamera, FiCameraOff } from "react-icons/fi";

const Controlbar = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setisVideoOn] = useState(false);

  const toggleMic = () => {
    setIsMicOn((isMicOn) => !isMicOn);
  };

  const toggleVideo = () => {
    setisVideoOn((isVideoOn) => !isVideoOn);
  };

  const enabledClass =
    "bg-gray-500 p-3 rounded-full text-3xl hover:bg-gray-600";
  const disabledClass = "bg-red-500 p-3 rounded-full text-3xl hover:bg-red-600";
  return (
    <div className="flex flex-row justify-center gap-12">
      {isMicOn ? (
        <button className={enabledClass} onClick={toggleMic}>
          <IoIosMic />
        </button>
      ) : (
        <button className={disabledClass} onClick={toggleMic}>
          <IoIosMicOff />
        </button>
      )}

      {isVideoOn ? (
        <button className={enabledClass} onClick={toggleVideo}>
          <FiCamera />
        </button>
      ) : (
        <button className={disabledClass} onClick={toggleVideo}>
          <FiCameraOff />
        </button>
      )}
    </div>
  );
};

export default Controlbar;
