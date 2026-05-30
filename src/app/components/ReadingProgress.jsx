"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = articleTop;
      const end = articleTop + articleHeight - windowHeight;
      const current = scrollY - start;

      const percentage = Math.min(Math.max((current / end) * 100, 0), 100);
      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-100 dark:bg-gray-800">
      <div
        className="h-full bg-violet-500 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}