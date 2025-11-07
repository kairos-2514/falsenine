"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/navigation";

export default function NewFormationPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const [formState, setFormState] = useState({ password: "", confirm: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: integrate API here with token
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 600);
  };

  return (
    <div>
      <h1 className="mb-2 font-montserrat text-3xl font-semibold tracking-tight">
        Set a new password
      </h1>
      <p className="mb-8 max-w-prose font-montserrat text-sm text-night/60">
        Keep it strong. Keep it yours.
      </p>

      {done ? (
        <div className="rounded-md bg-white/5 p-6 ring-1 ring-white/10">
          <p className="font-montserrat text-iron">
            Password updated successfully.
          </p>
          <div className="mt-6">
            <Link
              href={ROUTES.JOIN_SQUAD}
              className="underline-offset-2 hover:underline"
            >
              Continue to login
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="space-y-4"
          aria-label="Reset password form"
        >
          {token ? (
            <p className="font-montserrat text-xs text-iron/70">
              Token detected
            </p>
          ) : (
            <p className="font-montserrat text-xs text-iron/70">
              No token found. If you came from email, open the link on this
              device.
            </p>
          )}

          <div className="space-y-2">
            <label
              className="block font-montserrat text-sm text-night/60"
              htmlFor="password"
            >
              New password
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

          <div className="space-y-2">
            <label
              className="block font-montserrat text-sm text-night/60"
              htmlFor="confirm"
            >
              Confirm new password
            </label>
            <input
              id="confirm"
              type="password"
              required
              value={formState.confirm}
              onChange={(e) =>
                setFormState({ ...formState, confirm: e.target.value })
              }
              className="w-full rounded-md border border-night/10 bgwhite px-4 py-3 font-montserrat text-night outline-none transition focus:border-night/30"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-night px-5 py-3 font-montserrat text-white transition hover:bg-black disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save new password"}
          </button>
        </form>
      )}
    </div>
  );
}
