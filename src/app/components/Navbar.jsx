"use client";

import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav suppressHydrationWarning className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left: Profile pic + Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/profile_pic.png"
            alt="Rayhan"
            width={34}
            height={34}
            className="rounded-full object-cover ring-2 ring-violet-400 dark:ring-violet-500 shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-gray-900 dark:text-white leading-none">
              Rayn's Notes
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
              thoughts · feelings · reality
            </span>
          </div>
        </a>

        {/* Right */}
        <div suppressHydrationWarning className="flex items-center gap-2 shrink-0">

          <a
            href="https://rayhancsdev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-500 dark:hover:border-violet-500 dark:hover:text-violet-400 transition-all duration-200 whitespace-nowrap"
          >
            {"← Portfolio"}
          </a>

          <button
            suppressHydrationWarning
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 transition-all duration-200 shrink-0"
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>

        </div>
      </div>
    </nav>
  );
}