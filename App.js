import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/header/Header";
import Body from "./src/components/body/body/Body";
import "./App.css";
import About from "./src/components/about/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./src/components/contact/Contact";
import Error from "./src/components/error/Error";
import RestaurantsMenu from "./src/components/RestaurantsMenu/RestaurantsMenu";

const App = () => (
  <>
    <Header />
    <Outlet />  
  </>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:id",
        element: <RestaurantsMenu />,
      }
    ],
    errorElement: <Error />,  
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


