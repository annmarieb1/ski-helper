/*
 * NavBar Component
 */

import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="text-3xl font-bold">
          Ski Finder
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600">
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium hover:text-blue-600"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
