import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white opacity-90 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <a href="/">
            <img
              src="src/assets/image 6.png"
              alt="PT Kaltim Banua Etam Logo"
              className="w-10 h-10 object-contain"
            />
          </a>
          <span className="font-semibold text-gray-900">
            <a href="/">PT. KALTIM BANUA ETAM</a>
          </span>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          )}
        </button>

        {/* Navigation */}
        <nav>
          <ul
            className={`text-black font-medium text-sm lg:flex lg:space-x-8 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Beranda
              </a>
            </li>
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/struktur-organisasi"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Tentang Kami
              </a>
            </li>
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/lowongan-kerja"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Lowongan
              </a>
            </li>
            {/* <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/#layanankami"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Layanan
              </a>
            </li> */}
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/article"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Artikel
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="inline-block rounded-md py-3 px-5 border-green-600 bg-green-800 text-white hover:text-green-600 transition mx-4 lg:mx-0"
              >
                Kontak
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
