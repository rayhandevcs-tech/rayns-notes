"use client";

import { useState, useEffect } from "react";

export default function FeaturedNote() {
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/featured`
        );
        const data = await res.json();
        setNote(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  if (!note) return null;

  return (
    <a href={`/${note.slug}`} className="block mb-8 group">
      <div className="relative overflow-hidden rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 p-6 hover:shadow-lg hover:shadow-violet-100 dark:hover:shadow-violet-900 transition-all duration-300">

        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-500 text-white uppercase tracking-widest">
            ⭐ Note of the day
          </span>
        </div>

        <div className="flex gap-4">
          {/* Cover image */}
          {note.coverImage && (
            <div className="shrink-0 w-40 h-30 rounded-xl overflow-hidden">
              <img
                src={note.coverImage}
                alt={note.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{note.mood || "📝"}</span>
              <span className="text-xs text-violet-500 dark:text-violet-400 font-medium">
                {note.readingTime || "1 min read"}
              </span>
            </div>

            <h2 className="text-lg font-black text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
              {note.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {note.excerpt}
            </p>
          </div>
        </div>

        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </a>
  );
}