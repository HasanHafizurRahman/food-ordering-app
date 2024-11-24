import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/header/Header";
import Body from "./src/components/body/body/Body";
import "./App.css";
import About from "./src/components/about/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => (
  <>
    <Header />
    <Body />
  </>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
