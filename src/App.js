import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <p>Error 404</p>,
  },
]);

export default router;
