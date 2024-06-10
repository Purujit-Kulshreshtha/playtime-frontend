import Peer from "peerjs";
import React, { createContext, useMemo, useContext } from "react";

const PeerContext = createContext<any>(null);

export const usePeer = () => {
  const peer = useContext(PeerContext);
  return peer;
};

export const PeerProvider = (props: { children: React.ReactElement }) => {
  const peer = useMemo(() => {
    return new Peer("", {
      host: "/",
      port: 4001,
    });
  }, []);

  return (
    <PeerContext.Provider value={peer}>{props.children}</PeerContext.Provider>
  );
};
