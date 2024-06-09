import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreJoin from "../components/Prejoin";
import Meeting from "../components/Meeting";

export enum ConnectionStatus {
  IS_NOT_READY_TO_JOIN,
  JOINING,
  JOINED,
}

const Timezone = () => {
  const { name } = useParams();
  const [status, setStatus] = useState(ConnectionStatus.IS_NOT_READY_TO_JOIN);

  useEffect(() => {
    if (status === ConnectionStatus.JOINING) {
      //emit join event here
      console.log("Join event emited");
      setTimeout(() => {
        setStatus(ConnectionStatus.JOINED);
      }, 100);
    }

    return () => {};
  }, [status]);

  const getMeetingArea = () => {
    if (
      status === ConnectionStatus.IS_NOT_READY_TO_JOIN ||
      status === ConnectionStatus.JOINING
    )
      return (
        <PreJoin name={name || ""} status={status} setStatus={setStatus} />
      );

    if (status === ConnectionStatus.JOINED) {
      return <Meeting />;
    }

    return <h1>Something went wrong...</h1>;
  };

  return (
    <div className="z-0">
      <div className="fixed text-2xl top-4 left-0 z-10 bg-gradient-to-br from-teal-600 to-teal-900 px-4 shadow-md shadow-black rounded-r-xl">
        <h1>{name}</h1>
      </div>
      {getMeetingArea()}
    </div>
  );
};

export default Timezone;
