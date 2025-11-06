"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/navigation";

export default function JoinTheSquadPage() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: integrate API here
    setTimeout(() => setSubmitting(false), 600);
  };

  return (
    <div>
      <h1 className="mb-2 font-thunder text-5xl tracking-tight md:text-6xl">
        Join the Squad
      </h1>
      <p className="mb-10 max-w-prose font-montserrat text-iron">
        Log in to stay in motion. Clean UI. No distractions.
      </p>

      <form onSubmit={onSubmit} className="space-y-6" aria-label="Login form">
        <div className="space-y-2">
          <label
            className="block font-montserrat text-sm text-iron"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className="w-full rounded-md bg-white/5 px-4 py-3 font-montserrat text-white outline-none ring-1 ring-white/10 transition focus:ring-white/30"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block font-montserrat text-sm text-iron"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            className="w-full rounded-md bg-white/5 px-4 py-3 font-montserrat text-white outline-none ring-1 ring-white/10 transition focus:ring-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-white px-5 py-3 font-montserrat text-night transition hover:bg-iron disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between text-sm font-montserrat text-iron">
        <Link
          href={ROUTES.LOST_PLAY}
          className="underline-offset-2 hover:underline"
        >
          Forgot password
        </Link>
        <Link
          href={ROUTES.ENTER_PITCH}
          className="underline-offset-2 hover:underline"
        >
          New here? Create account
        </Link>
      </div>
    </div>
  );
}
