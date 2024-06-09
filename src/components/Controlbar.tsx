import { IoIosMic, IoIosMicOff } from "react-icons/io";
import { FiCamera, FiCameraOff } from "react-icons/fi";

type ControlbarProps = {
  isMicOn: boolean;
  isVideoOn: boolean;
  toggleMic: () => void;
  toggleVideo: () => void;
};

const Controlbar = (props: ControlbarProps) => {
  const enabledClass =
    "bg-gray-500 p-2 rounded-full text-3xl hover:bg-gray-600";
  const disabledClass = "bg-red-500 p-2 rounded-full text-3xl hover:bg-red-600";
  return (
    <div className="flex flex-row justify-center gap-12">
      {props.isMicOn ? (
        <button className={enabledClass} onClick={props.toggleMic}>
          <IoIosMic />
        </button>
      ) : (
        <button className={disabledClass} onClick={props.toggleMic}>
          <IoIosMicOff />
        </button>
      )}

      {props.isVideoOn ? (
        <button className={enabledClass} onClick={props.toggleVideo}>
          <FiCamera />
        </button>
      ) : (
        <button className={disabledClass} onClick={props.toggleVideo}>
          <FiCameraOff />
        </button>
      )}
    </div>
  );
};

export default Controlbar;
