"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white shadow-lg hover:shadow-violet-200 dark:hover:shadow-violet-900 hover:scale-110 transition-all duration-200"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}