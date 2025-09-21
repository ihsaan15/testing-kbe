import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const dropdownRef = useRef(null);

  // Preload logo dan aktifkan header visibility
  useEffect(() => {
    const logoImg = new Image();
    logoImg.onload = () => {
      setLogoLoaded(true);
    };
    logoImg.onerror = () => {
      // Jika logo gagal dimuat, tetap lanjutkan
      setLogoLoaded(true);
    };
    logoImg.src = "/assets/logo/logo-kbr-copy.png";

    // Aktifkan header visibility setelah mount
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  // Tutup menu mobile ketika ukuran layar berubah ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-500 ease-out ${
        headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Nama */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            {/* Logo dengan loading state */}
            <div className="relative w-10 h-10">
              {!logoLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
              )}
              <img
                src="/assets/logo/logo-kbr-copy.png"
                alt="PT. Kaltim Banua Etam"
                className={`w-10 h-10 object-contain transition-opacity duration-300 ${
                  logoLoaded ? "opacity-100" : "opacity-0"
                }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/cccccc/ffffff?text=Logo";
                  setLogoLoaded(true);
                }}
                onLoad={() => setLogoLoaded(true)}
              />
            </div>

            <span
              className={`ml-3 font-semibold text-gray-900 hidden sm:inline-block transition-all duration-500 ease-out ${
                headerVisible && logoLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              PT. KALTIM BANUA ETAM
            </span>
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className={`lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none transition-all duration-300 ${
            headerVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "300ms" }}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          <div className="relative w-6 h-6">
            {menuOpen ? (
              <svg
                className="w-6 h-6 transition-transform duration-200"
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
                className="w-6 h-6 transition-transform duration-200"
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
          </div>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 bg-white shadow-md lg:shadow-none lg:static lg:block lg:bg-transparent transition-all duration-300 ${
            headerVisible
              ? "lg:opacity-100 lg:translate-x-0"
              : "lg:opacity-0 lg:translate-x-4"
          }`}
          style={{ transitionDelay: headerVisible ? "400ms" : "0ms" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 lg:py-0">
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 text-sm font-medium text-gray-800">
              {/* Beranda */}
              <li
                className={`border-b border-gray-100 lg:border-none transition-all duration-300 ${
                  headerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <a
                  href="/"
                  className="block px-4 py-3 hover:text-green-600 transition-colors duration-200"
                >
                  Beranda
                </a>
              </li>

              {/* Tentang Kami Dropdown */}
              <li
                ref={dropdownRef}
                className={`border-b border-gray-100 lg:border-none relative transition-all duration-300 ${
                  headerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <button
                  onClick={() => setDropdownOpen((s) => !s)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:text-green-600 transition-colors duration-200"
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

                {/* Dropdown Menu */}
                <div
                  className={`${
                    dropdownOpen ? "block" : "hidden"
                  } lg:absolute lg:top-full lg:left-0 mt-1 bg-white lg:shadow-lg lg:rounded-md lg:border border-gray-200 z-40 transition-all duration-200 ${
                    dropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  <ul className="py-1 min-w-[220px]">
                    <li>
                      <a
                        href="/tentang-kami"
                        className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150"
                      >
                        Visi Misi & Struktur Organisasi
                      </a>
                    </li>
                    <li>
                      <a
                        href="/album"
                        className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150"
                      >
                        Album Dokumentasi
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Lowongan */}
              <li
                className={`border-b border-gray-100 lg:border-none transition-all duration-300 ${
                  headerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                <a
                  href="/lowongan-kerja"
                  className="block px-4 py-3 hover:text-green-600 transition-colors duration-200"
                >
                  Lowongan
                </a>
              </li>

              {/* Artikel */}
              <li
                className={`border-b border-gray-100 lg:border-none transition-all duration-300 ${
                  headerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <a
                  href="/article"
                  className="block px-4 py-3 hover:text-green-600 transition-colors duration-200"
                >
                  Artikel
                </a>
              </li>

              {/* Kontak Button */}
              <li
                className={`px-4 py-3 lg:py-0 transition-all duration-300 ${
                  headerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <a
                  href="/contact"
                  className="inline-block w-full lg:w-auto text-center rounded-md py-2 px-4 bg-green-700 text-white hover:bg-green-800 transition-all duration-200 transform hover:scale-105"
                >
                  Kontak
                </a>
              </li>

              {/* Instagram */}
              <li
                className={`px-4 py-3 lg:py-0 flex items-center transition-all duration-300 ${
                  headerVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                <a
                  href="https://instagram.com/pt.kaltimbanuaetam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram PT. Kaltim Banua Etam"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                >
                  <span className="sr-only">Instagram</span>
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
