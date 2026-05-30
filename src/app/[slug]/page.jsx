"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Reactions from "../components/Reactions";
import ReadingProgress from "../components/ReadingProgress";
import RelatedNotes from "../components/RelatedNotes";

export default function NotePage() {
  const { slug } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/${slug}`
        );
        if (res.ok) {
          const data = await res.json();
          setNote(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchNote();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950">
        
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-5xl mb-4">🌙</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Note not found
          </h2>
          <a href="/" className="text-violet-500 hover:underline font-medium">
            ← Back to notes
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <ReadingProgress />
      <Navbar />

      <article className="max-w-2xl mx-auto px-4 py-12">

        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-500 dark:hover:border-violet-500 dark:hover:text-violet-400 transition-all duration-200 mb-8"
        >
          ← Back to notes
        </a>

        {note.coverImage && (
          <div className="w-full h-64 overflow-hidden rounded-2xl mb-8 mt-6">
            <img
              src={note.coverImage}
              alt={note.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{note.mood || "📝"}</span>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {note.readingTime || "1 min read"}
          </span>
        </div>

        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
          {note.title}
        </h1>

        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          {note.publishedAt}
        </p>

        <hr className="border-gray-200 dark:border-gray-800 mb-8" />

        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
          {note.content}
        </div>

        <Reactions slug={note.slug} initialReactions={note.reactions} />
        <RelatedNotes slug={note.slug} tags={note.tags} />

      </article>
    </main>
  );
}