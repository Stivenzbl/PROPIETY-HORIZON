import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

/** Hot-reload aware router para Vite: si cambia App.tsx el navegador
 * se recargará (hot module replacement), pero re-renderiza el DOM
 * con la nueva ruta. Esto evita que el navegador pierda la conexión
 * con el servidor de desarrollo.
 */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {useRoutes(["/", "/login"], [
        { element: <App />, path: "/*" } // todo va aquí, incluido /login que no tiene layout
      ])}
    </BrowserRouter>
  </React.StrictMode>
);
