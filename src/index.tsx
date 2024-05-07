import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Profile from "./pages/PlayerProfile/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import ResultTable from "./component/ResultTable/ResultTable";
import Standings from "./pages/Standings/Standings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile/:playerId",
    element: <Profile />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/result",
    element: <ResultTable />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/standings",
    element: <Standings />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
