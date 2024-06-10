import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserProvider";
import { ModalPropsProvider } from "./context/ModalPropsProvider";
import { SocketProvider } from "./context/SocketProvider";
import { ZoneProvider } from "./context/ZoneProvider";
import { PeerProvider } from "./context/PeerProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <SocketProvider>
      <UserContextProvider>
        <ZoneProvider>
          <PeerProvider>
            <ModalPropsProvider>
              <App />
            </ModalPropsProvider>
          </PeerProvider>
        </ZoneProvider>
      </UserContextProvider>
    </SocketProvider>
  </BrowserRouter>
);
