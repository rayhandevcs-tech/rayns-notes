"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes?page=${page}&limit=6`
      );
      const data = await res.json();
      setNotes(data.notes);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(1);
  }, []);

  const handlePageChange = (page) => {
    fetchNotes(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            My Notes 📓
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Thoughts, feelings, reality — written honestly.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-52 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && notes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🌙</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No notes yet. Coming soon...
            </p>
          </div>
        )}

        {/* Notes grid */}
        {!loading && notes.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
      <Footer />
    </main>
  );
}