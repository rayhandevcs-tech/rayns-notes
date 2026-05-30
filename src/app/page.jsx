"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import FeaturedNote from "./components/FeaturedNote";


const CATEGORIES = ["All", "Thoughts", "Feelings", "Reality", "Life", "Philosophy"];

export default function Home() {

  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchNotes = async (page, searchVal, categoryVal) => {

    try {

      setLoading(true);

      let url = `${process.env.NEXT_PUBLIC_API_URL}/notes?page=${page}&limit=6`;

      if (searchVal) url += `&search=${encodeURIComponent(searchVal)}`;

      if (categoryVal && categoryVal !== "all") url += `&category=${categoryVal}`;

      const res = await fetch(url);
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
    fetchNotes(1, "", "all");
  }, []);

  const searchTimeout = useRef(null);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchNotes(1, val, category);
    }, 500);
  };

  const handleCategory = (cat) => {

    const val = cat.toLowerCase();
    setCategory(val);
    setCurrentPage(1);
    fetchNotes(1, search, val);

  };

  const handlePageChange = (page) => {
    fetchNotes(page, search, category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (

    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      <Navbar/>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            My Notes 📓
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Thoughts, feelings, reality — <i>words of affirmation</i>
          </p>

        </div>

        {/* Featured note */}
          <FeaturedNote />

        {/* Search bar */}
        <div className="relative mb-4">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search notes..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 dark:focus:border-violet-500 transition-colors"
          />

        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">

          {CATEGORIES.map((cat) => (

            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                category === cat.toLowerCase()
                  ? "bg-violet-500 text-white"
                  : "border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-500 dark:hover:border-violet-500 dark:hover:text-violet-400"
              }`}
            >
              {cat}
            </button>

          ))}

        </div>


        {/* Loading */}
        {loading && (

          <div className="grid gap-4 sm:grid-cols-2">

            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}

          </div>

        )}

        {/* Empty state */}
        {!loading && notes.length === 0 && (

          <div className="text-center py-20">

            <p className="text-5xl mb-4">🌙</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No notes found.
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