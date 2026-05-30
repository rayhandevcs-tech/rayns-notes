"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewNote() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
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
  const [dateInput, setDateInput] = useState("");

  // Auth check + load draft
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) router.push("/admin");

    const saved = localStorage.getItem("draft-new");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed);
      setLastSaved("Restored from draft");
    }
  }, []);

  // Auto save
  useEffect(() => {
    if (!form.title && !form.content) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("draft-new", JSON.stringify(form));
      setLastSaved("Auto saved " + new Date().toLocaleTimeString());
    }, 1000);
    return () => clearTimeout(timeout);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "title") {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim();
      }

      if (name === "content") {
        const words = value.trim().split(/\s+/).filter(Boolean).length;
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        localStorage.removeItem("draft-new");
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem("draft-new");
    setForm({
      title: "", slug: "", excerpt: "", content: "",
      mood: "", coverImage: "", tags: "", status: "draft",
      publishedAt: "", readingTime: "",
    });
    setLastSaved(null);
  };

  const wordCount = form.content.trim()
    ? form.content.trim().split(/\s+/).filter(Boolean).length
    : 0;

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
            New Note
          </h1>

          <div className="flex gap-2">

            <button
              onClick={handleClearDraft}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 text-xs font-medium hover:border-red-300 hover:text-red-400 transition-colors"
            >
              Clear
            </button>

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
              {saving ? "Publishing..." : "Publish"}
            </button>

          </div>

        </div>


        {/* Auto save indicator */}
        {lastSaved && (
          <div className="max-w-3xl mx-auto px-4 pb-2">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              ✓ {lastSaved}
            </p>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Slug
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="auto-generated-from-title"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Excerpt *
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="A short summary..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors resize-none"
          />
        </div>

        <div>

          <div className="flex items-center justify-between mb-1">
            
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Content *
            </label>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              {wordCount} words · {form.readingTime || "0 min read"}
            </span>

          </div>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your thoughts here..."
            rows={14}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors resize-none"
          />
        </div>


        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Mood (emoji)
            </label>

            <input
              name="mood"
              value={form.mood}
              onChange={handleChange}
              placeholder="🌙"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
            />
          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Reading Time
            </label>

            <input
              name="readingTime"
              value={form.readingTime}
              onChange={handleChange}
              placeholder="2 min read"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
            />
          </div>

        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Cover Image URL
          </label>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="thoughts, feelings, life"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Published Date
          </label>
          
          <input
            type="date"
            value={dateInput}
            onChange={(e) => {
              const val = e.target.value;
              setDateInput(val);
              if (val) {
                const date = new Date(val + "T00:00:00");
                const formatted = date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
                setForm((prev) => ({ ...prev, publishedAt: formatted }));
              }
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-violet-400 transition-colors"
          />
          {form.publishedAt && (
            <p className="text-xs text-gray-400 mt-1">{form.publishedAt}</p>
          )}
        </div>

      </div>
    </main>
  );
}