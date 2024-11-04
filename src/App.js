import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header/Header";
import Body from "./components/header/body/Body";
import "./App.css";

const App = () => (
  <>
    <Header />
    <Body />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
