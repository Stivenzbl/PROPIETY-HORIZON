import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

type Theme = "light" | "dark" | "system";

/**
 * AppLayout - Layout Maestro de PROPIETY-HORIZON
 *
 * Estructura completa de la aplicación:
 * - Header fijo con navegación global
 * - Sidebar lateral de navegación por módulos
 * - Contenido principal en el centro
 */
function AppLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>((localStorage?.getItem("theme") as Theme) ?? "light");

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      {/* --- HEADER / NAVBAR --- */}
      <Navbar />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 h-screen fixed md:relative z-30 hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </aside>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* MOBILE SIDEBAR DRAWER --- Oculto en desktop, visible en móvil --- */}
        <div className="md:hidden fixed md:relative z-40 top-14 bottom-0 inset-x-0 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
          {(location.pathname === "/dashboard" && location.state?.from !== "/login") ||
            location.pathname === "/condominios" ? (
            <Sidebar />
          ) : (
            <div className="h-screen flex flex-col px-4">
              <button
                onClick={() => (document.getElementById("drawer")?.classList.add, "hidden")}
                className="text-gray-600 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                ← Cerrar
              </button>

              <div className="mt-4 px-2 space-y-3">
                <a
                  href="/dashboard"
                  className="block py-2 px-3 text-left text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </a>
                <a
                  href="/login"
                  className="block py-2 px-3 text-left text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
