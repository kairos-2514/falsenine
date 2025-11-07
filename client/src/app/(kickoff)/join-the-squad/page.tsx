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
      <h1 className="mb-2 font-montserrat text-3xl font-semibold tracking-tight">
        Welcome back!
      </h1>
      <p className="mb-8 max-w-prose font-montserrat text-sm text-night/60">
        Your work, your team, your flow — all in one place.
      </p>

      {/* Social buttons */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-night/10 bg-white px-3 py-2 text-sm font-montserrat text-night shadow-sm transition hover:bg-night/5"
        >
          <span className="h-4 w-4 rounded-sm bg-night" />
          Sign in with Google
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-night/10 bg-white px-3 py-2 text-sm font-montserrat text-night shadow-sm transition hover:bg-night/5"
        >
          <span className="h-4 w-4 rounded-sm bg-night" />
          Sign in with Apple
        </button>
      </div>

      {/* Divider */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-night/10" />
        <span className="font-montserrat text-xs text-night/40">or</span>
        <div className="h-px flex-1 bg-night/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" aria-label="Login form">
        <div className="space-y-2">
          <label
            className="block font-montserrat text-sm text-night/60"
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
            className="w-full rounded-md border border-night/10 bg-white px-4 py-3 font-montserrat text-night outline-none transition focus:border-night/30"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block font-montserrat text-sm text-night/60"
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
            className="w-full rounded-md border border-night/10 bg-white px-4 py-3 font-montserrat text-night outline-none transition focus:border-night/30"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-night px-5 py-3 font-montserrat text-white transition hover:bg-black disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm font-montserrat text-night/60">
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
