import React from "react";
import ReactDOM from "react-dom/client";
import reducer, { initialState } from "./context/reducer";
import { StateProvider } from "./context/StateProvider";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider
    reducer={reducer}
    initialState={initialState}
    children={<App />}
  />
);
