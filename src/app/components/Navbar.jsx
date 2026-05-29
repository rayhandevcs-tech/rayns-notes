"use client";

import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav suppressHydrationWarning className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Left: Profile pic + Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/profile_pic.png"
            alt="Rayhan"
            width={36}
            height={36}
            className="rounded-full object-cover ring-2 ring-violet-400 dark:ring-violet-500"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
              Rayn's Notes
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              thoughts · feelings · reality
            </span>
          </div>
        </a>

        {/* Right: Portfolio button + Dark mode toggle */}
        <div suppressHydrationWarning className="flex items-center gap-3">
          <a
            href="https://rayhancsdev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-500 dark:hover:border-violet-500 dark:hover:text-violet-400 transition-all duration-200"
          >
            ← Portfolio
          </a>

          <button
            suppressHydrationWarning
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

      </div>
    </nav>
  );
}