"use client";

import { useState, useEffect } from "react";

const REACTIONS = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "fire", emoji: "🔥", label: "Fire" },
];

export default function Reactions({ slug, initialReactions }) {
  const [reactions, setReactions] = useState(initialReactions || { like: 0, love: 0, fire: 0 });
  const [reacted, setReacted] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(`reactions-${slug}`);
    if (saved) setReacted(JSON.parse(saved));
  }, [slug]);

  const handleReact = async (type) => {
    const alreadyReacted = reacted[type];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${slug}/react`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, undo: alreadyReacted }),
        }
      );
      const data = await res.json();
      setReactions(data);

      const newReacted = { ...reacted, [type]: !alreadyReacted };
      setReacted(newReacted);
      localStorage.setItem(`reactions-${slug}`, JSON.stringify(newReacted));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 text-center mb-4 uppercase tracking-widest">
        Did this resonate?
      </p>
      <div className="flex items-center justify-center gap-4">
        {REACTIONS.map(({ type, emoji }) => (
          <button
            key={type}
            onClick={() => handleReact(type)}
            className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl border transition-all duration-200 ${
              reacted[type]
                ? "border-violet-400 bg-violet-50 dark:bg-violet-950 scale-105"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-violet-400 hover:scale-105"
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {reactions[type] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}