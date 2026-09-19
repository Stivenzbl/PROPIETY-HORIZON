import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon, MenuIcon, XIcon, UserIcon, SearchIcon, BellIcon } from "react-icons/md";

/**
 * Navbar component
 * - Header fijo superior con navegación global
 * - Botones: tema (dark/light), buscar, notificaciones, móvil, perfil
 */
function Navbar() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") as "light" | "dark" | "system"
  );

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "system") {
      html.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
    } else {
      html.classList.toggle("dark", theme === "dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navigate = useNavigate();

  return (
    {/* --- GLOBAL HEADER FLOTANTE --- */}
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      {/* CONTAINER */}
      <nav className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16" id="drawer">
        {/* LOGO (visible only on mobile) */}
        <div className="md:hidden flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 group">
            {/* Logo icono de casa */}
            <svg width="28" height="26" viewBox="0 0 38 34" fill="none">
              {/* Base: edificio gris */}
              <path d="M6 4v24h9V12l7 8z" fill="#6366f1" />
              <path d="M23.5 2h0.5v12H23.5zM31.5 2h0.5v12h-.5V40v-10h-.5v-6h8v.5h-8z" fill="#3b82f6" />
              {/* Puerta central */}
              <path d="M16.5 16h3V4h4v12h3l-7-8z" fill="#e2e8f0" />
            </svg>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-gray-900 via-white via-gray-700 to-purple-700 bg-clip-text text-transparent">
              PROPIETY-HORIZON
            </span>
          </a>

          {/* BOTÓN MENU (móvil) */}
          {/* <button
            onClick={() => document.getElementById("drawer")?.classList.toggle("hidden")}
            className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {location.pathname === "/dashboard" ? (
              <MenuIcon className="w-5 h-5 text-gray-700 dark:text-white" />
            ) : (
              <XIcon className="w-5 h-5 text-gray-700 dark:text-white" />
            )}
          </button> */}
        </div>

        {/* ACTION BUTTONS (desktop + mobile) */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Botón cambiar tema */}
          <a href="#" onClick={(e) => { e.preventDefault(); const newTheme = theme === "light" ? "dark" : (theme === "dark" ? "system" : "light"); setTheme(newTheme); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </a>

          {/* Botón búsqueda */}
          <a href="#" onClick={(e) => e.preventDefault()} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            <SearchIcon />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] text-white font-medium">!</span>
          </a>

          {/* Botón notificaciones */}
          <a href="#" onClick={(e) => e.preventDefault()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            <BellIcon />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-medium border-2 border-white dark:border-gray-900">3</span>
          </a>

          {/* Botón perfil */}
          <button className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors pl-2 pr-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
              S
            </div>
          </button>
        </div>

        {/* MOBILE MENU (visible en móvil) */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
          <a href="#" onClick={(e) => {"use client" || null; // e.preventDefault(); setTheme(theme === "light" ? "dark" : "light") }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </a>

          {/* Botón búsqueda en móvil (oculto, activado por JS) */}
          <div className="relative hidden md:block">
            <input type="text" placeholder="Buscar..." className="pl-8 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 transition-all" />
            {/* <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" /> */}
          </div>

          {/* Botón menú (móvil) */}
          <button onClick={() => { const el = document.getElementById("drawer"); el?.classList.toggle("hidden", false); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-white">
            <MenuIcon />
          </button>
        </div>

        {/* SPACER para empujar el botón de perfil a la izquierda */}
        <div className="md:hidden w-16" />
      </nav>

      {/* MENÚ DE PROFIL (dropdown) */}
      {null && (
        <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 w-64 opacity-0 invisible cursor-pointer">
          <p className="text-sm font-medium text-gray-700 dark:text-white mb-1">Admin</p>
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
            <a href="/me" className="block px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">📄 Mi perfil</a>
            <a href="/me/configuracion" className="block px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">⚙️ Ajustes</a>
            <a href="/login" className="block px-2 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-sm font-medium text-red-600 dark:text-red-400">🚪 Cerrar sesión</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
