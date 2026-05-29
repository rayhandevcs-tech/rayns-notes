"use client";

import { useTheme } from "./ThemeProvider";
import Link from "next/link";

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
            Rayn's Notes
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            thoughts · feelings · reality
          </span>
        </Link>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>

      </div>
    </nav>
  );
}