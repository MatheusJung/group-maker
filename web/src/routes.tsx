import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import { Registro } from "./pages/registro";
import Home from "./pages/home";
import { LayoutProtegido } from "./components/layoutProtegido";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    element: <LayoutProtegido />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
