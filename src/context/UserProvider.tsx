import { createContext, useContext, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../contants";

export type User = {
  name: string;
  audioDevice?: string;
  videoDevice?: string;
};

type UserContextType = {
  user: User | null;
  set: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  set: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props: {
  children: React.ReactElement;
}) => {
  const set = (user: User) => {
    setUser(user);
    localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
  };

  const existingUser: User = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user) || "")
    : null;

  const [user, setUser] = useState<User>(existingUser);

  return (
    <UserContext.Provider value={{ user, set }}>
      {props.children}
    </UserContext.Provider>
  );
};
