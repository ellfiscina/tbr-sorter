'use client';
import { signIn } from "next-auth/react";

const LoginOverlay = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 pointer-events-auto">
        <button
          onClick={() => signIn("google")}
          className="cursor-pointer px-6 py-3 bg-accent text-white hover:bg-accent/90 active:scale-95 rounded-2xl flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginOverlay;