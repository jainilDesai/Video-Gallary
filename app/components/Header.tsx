"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, Upload } from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-purple-700 bg-black text-white">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-purple-400">
        Full Stack App
      </Link>

      {/* Right side */}
      <nav className="flex gap-4 items-center">
        {status === "loading" ? (
          <span className="text-gray-400">Loading...</span>
        ) : session ? (
          <>
            {/* Upload Video button → only visible if logged in */}
            <Link
              href="/upload"
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-700 transition"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </Link>

            {/* Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <User className="w-6 h-6 text-purple-400" />
              <span>{session.user?.email}</span>
            </div>

            {/* Logout */}
            <button
              onClick={() => signOut()}
              className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-700 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
