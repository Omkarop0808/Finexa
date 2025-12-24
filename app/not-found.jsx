import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
          404
        </h1>

        <p className="mt-4 text-xl font-semibold text-slate-800">
          Page not found
        </p>

        <p className="mt-2 text-slate-500">
          OOPS! the page you a're looking does not exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-medium hover:opacity-90 transition"
          >
            Back to Dashboard
          </Link>
          
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Finexa AI · Your Intelligent finance Partner
        </p>
      </div>
    </div>
  );
};

export default NotFound;
