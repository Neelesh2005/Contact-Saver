import * as React from "react";
import * as ReactDOM from "react-dom/client";
import EditContact, {
  action as editAction,
} from "./routes/edit";
import Index from "./routes/index";
import { action as destroyAction } from "./routes/destroy";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";

import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
} from "./routes/contact";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader:rootLoader,
    action: rootAction,
    errorElement : <ErrorPage/>,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        errorElement:<ErrorPage/>,
        loader:contactLoader
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        errorElement:<ErrorPage/>,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);