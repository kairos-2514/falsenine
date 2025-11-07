"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/navigation";

export default function LostThePlayPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: integrate API here
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <div>
      <h1 className="mb-2 font-montserrat text-3xl font-semibold tracking-tight">
        Reset your password
      </h1>
      <p className="mb-8 max-w-prose font-montserrat text-sm text-night/60">
        Enter your email. We’ll send a reset link if there’s an account.
      </p>

      {sent ? (
        <div className="rounded-md bg-white/5 p-6 ring-1 ring-white/10">
          <p className="font-montserrat text-iron">
            If an account exists for <span className="text-white">{email}</span>
            , a reset link is on the way.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href={ROUTES.JOIN_SQUAD}
              className="underline-offset-2 hover:underline"
            >
              Back to login
            </Link>
            <Link
              href={ROUTES.ENTER_PITCH}
              className="underline-offset-2 hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="space-y-4"
          aria-label="Forgot password form"
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-night/10 bg-white px-4 py-3 font-montserrat text-night outline-none transition focus:border-night/30"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-night px-5 py-3 font-montserrat text-white transition hover:bg-black disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}
    </div>
  );
}
