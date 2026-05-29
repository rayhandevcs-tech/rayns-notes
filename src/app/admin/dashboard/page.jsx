"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) {
      router.push("/admin");
      return;
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes?limit=100&admin=true`
      );
      const data = await res.json();
      setNotes(data.notes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-xs text-gray-400">Rayn's Notes</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold text-sm transition-colors"
            >
              + New Note
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm hover:border-red-300 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && notes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-gray-500 dark:text-gray-400">No notes yet.</p>
          </div>
        )}

        {!loading && notes.length > 0 && (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl">{note.mood || "📝"}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {note.title}
                    </p>
                    <p className="text-xs text-gray-400">{note.publishedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    note.status === "published"
                      ? "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400"
                      : "bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400"
                  }`}>
                    {note.status}
                  </span>
                  <Link
                    href={`/admin/edit/${note._id}`}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium hover:border-violet-400 hover:text-violet-500 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium hover:border-red-400 hover:text-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}