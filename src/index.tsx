import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserProvider";
import { ModalPropsProvider } from "./context/ModalPropsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ModalPropsProvider>
        <App />
      </ModalPropsProvider>
    </UserContextProvider>
  </BrowserRouter>
);
