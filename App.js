import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/header/Header";
import Body from "./src/components/body/body/Body";
import "./App.css";
import About from "./src/components/about/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./src/components/contact/Contact";

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
  },
  {
    path: "/contact",
    element: <Contact />,
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = "/service-worker.js"; // Use exact filename if hashed
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}


