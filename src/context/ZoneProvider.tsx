import React, { createContext, useContext, useState } from "react";

type Zone = {
  name: string;
  password: string;
  isCreate: boolean;
  //add type here
};

type ZoneContextType = {
  zone: Zone;
  set: (zone: Zone) => void;
};

const ZoneContext = createContext<ZoneContextType>({
  zone: {
    name: "",
    password: "",
    isCreate: false,
  },
  set: () => {},
});

export const useZone = () => {
  const zone = useContext(ZoneContext);
  return zone;
};

export const ZoneProvider = (props: { children: React.ReactElement }) => {
  const [zone, setZone] = useState<Zone>({
    name: "",
    password: "",
    isCreate: false,
  });

  return (
    <ZoneContext.Provider value={{ zone, set: setZone }}>
      {props.children}
    </ZoneContext.Provider>
  );
};
