"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-500 dark:hover:border-violet-500 dark:hover:text-violet-400 transition-all duration-200"
    >
      {copied ? "✅ Copied!" : "🔗 Copy link"}
    </button>
  );
}