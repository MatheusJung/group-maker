import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

// Definição das rotas usando a sintaxe moderna de objetos
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />, // Captura erros e páginas 404 automaticamente
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
