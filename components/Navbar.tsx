import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold text-sm px-2 py-1 rounded">MSP</div>
          <span className="font-semibold text-gray-900 text-lg">Directory.io</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/directory" className="hover:text-blue-600 transition-colors">
            Browse MSPs
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link
            href="/directory"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Find an MSP
          </Link>
        </div>
      </div>
    </nav>
  );
}
