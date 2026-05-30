"use client";

import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";

export default function RelatedNotes({ slug, tags }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!tags?.length) return;

    const fetchRelated = async () => {
      try {
        const tag = tags[0];
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notes?category=${tag}&limit=3`
        );
        const data = await res.json();
        const filtered = data.notes.filter((n) => n.slug !== slug);
        setRelated(filtered.slice(0, 2));
      } catch (err) {
        console.error(err);
      }
    };

    fetchRelated();
  }, [slug, tags]);

  if (!related.length) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
        Related Notes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}