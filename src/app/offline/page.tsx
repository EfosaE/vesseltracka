"use client";

import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex flex-col items-center justify-center  bg-gray-50 text-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md">
        <WifiOff className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          You’re Offline
        </h1>
        <p className="text-gray-600 mb-6">
          It seems you’ve lost your internet connection. Don’t worry — you can
          still browse saved pages or try again later.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-light text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Retry
          </button>

          <Link
            href="/"
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
