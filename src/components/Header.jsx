import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown jika klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    // Menambahkan event listener saat komponen dimuat
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Menghapus event listener saat komponen akan di-unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full bg-white opacity-95 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <a href="/">
            <img
              src="src\assets\logo\logo-kbr-copy.png" // Placeholder logo
              alt="PT Kaltim Banua Etam Logo"
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/40x40/cccccc/ffffff?text=Error";
              }}
            />
          </a>
          <span className="font-semibold text-gray-900 hidden sm:block">
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* --- Navigation --- */}
        {/* Container untuk mobile dan desktop */}
        <nav
          className={`absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none ${
            menuOpen ? "block" : "hidden"
          } lg:flex`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 text-black font-medium text-sm">
            {/* Beranda */}
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Beranda
              </a>
            </li>

            {/* --- Tentang Kami (Dropdown) --- */}
            <li
              ref={dropdownRef}
              className="relative border-b border-gray-200 lg:border-none"
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full border-white flex justify-between items-center py-3 px-4 hover:text-green-600 transition"
              >
                <span>Tentang Kami</span>
                {/* Ikon panah dropdown */}
                <svg
                  className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Menu Dropdown */}
              <div
                className={`lg:absolute lg:top-full lg:left-0 mt-1 w-full lg:w-56 bg-white lg:shadow-lg lg:rounded-md lg:border border-gray-200 transition-all duration-300 ease-in-out ${
                  dropdownOpen ? "block" : "hidden"
                }`}
              >
                <ul className="py-1">
                  <li>
                    <a
                      href="/tentang-kami"
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                    >
                      Visi Misi & Struktur Organisasi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/album"
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                    >
                      Album Dokumentasi
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            {/* Lowongan */}
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/lowongan-kerja"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Lowongan
              </a>
            </li>

            {/* Artikel */}
            <li className="border-b border-gray-200 lg:border-none">
              <a
                href="/article"
                className="block py-3 px-4 hover:text-green-600 transition"
              >
                Artikel
              </a>
            </li>

            {/* Kontak */}
            <li className="p-4 lg:p-0">
              <a
                href="/contact"
                className="inline-block w-full text-center rounded-md py-3 px-5 bg-green-700 text-white hover:bg-green-800 transition"
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
