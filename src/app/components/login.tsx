'use client';

import { signIn } from "next-auth/react";

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream font-sans p-4">
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 rounded bg-primary text-white"
      >
        Sign in with Google
      </button>
    </div>
  );
}
