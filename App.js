import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./src/components/Error";
import "./App.css";
import ShimmerLoading from "./src/components/loading/ShimmerLoading";
import { Provider } from "react-redux";
import store from "./src/utils/store";

// Lazy load components
const Body = lazy(() => import("./src/components/Body"));
const About = lazy(() => import("./src/components/About"));
const Contact = lazy(() => import("./src/components/Contact"));
const RestaurantsMenu = lazy(() => import("./src/components/RestaurantsMenu"));

const App = () => (
  <Provider store={store}>
    <Header />
    <Suspense fallback={<ShimmerLoading />}>
      <Outlet />
    </Suspense>
  </Provider>
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

