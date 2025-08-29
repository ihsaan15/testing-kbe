import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tutup menu mobile ketika ukuran layar berubah ke desktop (opsional tapi berguna)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Nama */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img
              src="/assets/logo/logo-kbr-copy.png" // ganti sesuai path logo kamu
              alt="PT. Kaltim Banua Etam"
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/40x40/cccccc/ffffff?text=Logo";
              }}
            />
            <span className="ml-3 font-semibold text-gray-900 hidden sm:inline-block">
              PT. KALTIM BANUA ETAM
            </span>
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 bg-white shadow-md lg:shadow-none lg:static lg:block lg:bg-transparent`}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 lg:py-0">
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 text-sm font-medium text-gray-800">
              <li className="border-b border-gray-100 lg:border-none">
                <a
                  href="/"
                  className="block px-4 py-3 hover:text-green-600 transition"
                >
                  Beranda
                </a>
              </li>

              <li
                ref={dropdownRef}
                className="border-b border-gray-100 lg:border-none relative"
              >
                <button
                  onClick={() => setDropdownOpen((s) => !s)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:text-green-600 transition"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <span>Tentang Kami</span>
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`${
                    dropdownOpen ? "block" : "hidden"
                  } lg:absolute lg:top-full lg:left-0 mt-1 bg-white lg:shadow-lg lg:rounded-md lg:border border-gray-200 z-40`}
                >
                  <ul className="py-1 min-w-[220px]">
                    <li>
                      <a
                        href="/tentang-kami"
                        className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                      >
                        Visi Misi & Struktur Organisasi
                      </a>
                    </li>
                    <li>
                      <a
                        href="/album"
                        className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                      >
                        Album Dokumentasi
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="border-b border-gray-100 lg:border-none">
                <a
                  href="/lowongan-kerja"
                  className="block px-4 py-3 hover:text-green-600 transition"
                >
                  Lowongan
                </a>
              </li>

              <li className="border-b border-gray-100 lg:border-none">
                <a
                  href="/article"
                  className="block px-4 py-3 hover:text-green-600 transition"
                >
                  Artikel
                </a>
              </li>

              {/* Kontak */}
              <li className="px-4 py-3 lg:py-0">
                <a
                  href="/contact"
                  className="inline-block w-full lg:w-auto text-center rounded-md py-2 px-4 bg-green-700 text-white hover:bg-green-800 transition"
                >
                  Kontak
                </a>
              </li>

              {/* Instagram (setelah Kontak) */}
              <li className="px-4 py-3 lg:py-0 flex items-center">
                <a
                  href="https://instagram.com/pt.kaltimbanuaetam" // Ganti yourhandle dengan username IG yang benar
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram PT. Kaltim Banua Etam"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  {/* sr-only untuk screen readers */}
                  <span className="sr-only">Instagram</span>
                  {/* Icon Instagram sederhana */}
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      ry="5"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16 11.37a4 4 0 1 1-7.999.001 4 4 0 0 1 7.999-.001z"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
