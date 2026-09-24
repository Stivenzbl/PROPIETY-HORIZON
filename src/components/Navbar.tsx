import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon, MenuIcon, XIcon, UserIcon, SearchIcon, BellIcon } from "react-icons/md";

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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16" id="drawer">
        <div className="md:hidden flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 group">
            <svg width="28" height="26" viewBox="0 0 38 34" fill="none">
              <path d="M6 4v24h9V12l7 8z" fill="#6366f1" />
              <path d="M23.5 2h0.5v12H23.5zM31.5 2h0.5v12h-.5V40v-10h-.5v-6h8v.5h-8z" fill="#3b82f6" />
              <path d="M16.5 16h3V4h4v12h3l-7-8z" fill="#e2e8f0" />
            </svg>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-gray-900 via-white via-gray-700 to-purple-700 bg-clip-text text-transparent">
              PROPIETY-HORIZON
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <a href="#" onClick={(e) => { e.preventDefault(); const newTheme = theme === "light" ? "dark" : (theme === "dark" ? "system" : "light"); setTheme(newTheme); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            <SearchIcon />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] text-white font-medium">!</span>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            <BellIcon />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-medium border-2 border-white dark:border-gray-900">3</span>
          </a>

          <button className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors pl-2 pr-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
              S
            </div>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2 ml-auto">
          <a href="#" onClick={() => setTheme(theme === "light" ? "dark" : "light") } className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </a>
        </div>

        <div className="relative hidden md:block">
          <input type="text" placeholder="Buscar..." className="pl-8 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 transition-all" />
        </div>

        <button onClick={() => document.getElementById("drawer")?.classList.toggle("hidden", false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-white">
          <MenuIcon />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;