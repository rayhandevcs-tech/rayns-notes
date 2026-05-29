"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "rayhan123"; // পরে change করো

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Wrong password!");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-4xl mb-3">🔐</p>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Admin Access
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Rayn's Notes
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 dark:focus:border-violet-500 transition-colors"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}