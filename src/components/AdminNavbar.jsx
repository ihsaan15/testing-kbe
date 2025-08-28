import React, { useState } from "react";

export default function AdminNavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown user menu
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Title */}
          <div className="flex-shrink-0 text-2xl font-semibold text-black">
            PT. KBE
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-black font-medium">Admin User</span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profil
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pengaturan
                </a>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
