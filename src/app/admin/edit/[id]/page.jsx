"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditNote() {
  const router = useRouter();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    mood: "",
    coverImage: "",
    tags: "",
    status: "draft",
    publishedAt: "",
    readingTime: "",
  });

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) router.push("/admin");
    else fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/id/${id}`
      );
      const data = await res.json();
      setForm({
        ...data,
        tags: data.tags?.join(", ") || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "content") {
        const words = value.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        updated.readingTime = `${minutes} min read`;
      }

      return updated;
    });
  };

  const handleSubmit = async (status) => {
    try {
      setSaving(true);
      const payload = {
        ...form,
        status,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="text-sm text-gray-500 hover:text-violet-500 transition-colors"
          >
            ← Dashboard
          </Link>
          <h1 className="text-lg font-black text-gray-900 dark:text-white">
            Edit Note
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmit("draft")}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-violet-400 hover:text-violet-500 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit("published")}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update"}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Title *</label>
          <input name="title" value={form.title} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors font-mono text-sm" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Excerpt *</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Content *</label>
          <textarea name="content" value={form.content} onChange={handleChange} rows={12}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Mood (emoji)</label>
            <input name="mood" value={form.mood} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Reading Time</label>
            <input name="readingTime" value={form.readingTime} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Cover Image URL</label>
          <input name="coverImage" value={form.coverImage} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Published Date</label>
          <input name="publishedAt" value={form.publishedAt} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors" />
        </div>
      </div>
    </main>
  );
}