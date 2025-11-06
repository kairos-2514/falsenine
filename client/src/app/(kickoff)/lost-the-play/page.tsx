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
      <h1 className="mb-2 font-thunder text-5xl tracking-tight md:text-6xl">
        Lost the Play
      </h1>
      <p className="mb-10 max-w-prose font-montserrat text-iron">
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
          className="space-y-6"
          aria-label="Forgot password form"
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-white/5 px-4 py-3 font-montserrat text-white outline-none ring-1 ring-white/10 transition focus:ring-white/30"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-white px-5 py-3 font-montserrat text-night transition hover:bg-iron disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}
    </div>
  );
}
