import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./src/components/error/Error";
import "./App.css";
import ShimmerLoading from "./src/components/loading/ShimmerLoading";

// Lazy load components
const Body = lazy(() => import("./src/components/body/body/Body"));
const About = lazy(() => import("./src/components/about/About"));
const Contact = lazy(() => import("./src/components/contact/Contact"));
const RestaurantsMenu = lazy(() => import("./src/components/RestaurantsMenu/RestaurantsMenu"));

const App = () => (
  <>
    <Header />
    <Suspense fallback={<ShimmerLoading />}>
      <Outlet />
    </Suspense>
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
