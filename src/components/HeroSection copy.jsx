import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "src/assets/hero/lapangan1.jpg",
  "src/assets/hero/rekrutmen.jpg",
  "src/assets/hero/fotokbe3.jpg",
  "src/assets/hero/lapangan2.jpg",
  "src/assets/fotokbe4.jpg",
];

const HeroSection = () => {
  const backgroundUrl = "src/assets/img1.jpg";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="bg-cover bg-center min-w-screen bg-green-50 min-h-screen flex items-center px-4 sm:px-8 py-12 sm:py-16"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-8">
        {/* Left Content */}
        <div className="flex-1 max-w-full sm:max-w-md lg:max-w-lg space-y-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
            <img
              src="src/assets/logo/logo-kbr-copy.png"
              alt="PT Kaltim Banua Etam Logo"
              className="w-12 h-12 object-contain border-2 rounded-md bg-white"
            />
            <span className="font-semibold text-white text-sm sm:text-base">
              PT. KALTIM BANUA ETAM
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-snug max-w-full sm:max-w-xl">
            Partner Terpercaya untuk{" "}
            <span className="text-green-600">Tenaga Kerja</span> Profesional
          </h1>

          <p className="text-white max-w-full sm:max-w-md mx-auto lg:mx-0">
            Kami menyediakan tenaga kerja berkualitas tinggi untuk industri
            dengan standar keselamatan internasional dan pengalaman lebih dari
            20 tahun.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="inline-block bg-green-700 text-white py-2 px-6 rounded-md shadow duration-300 hover:bg-green-800"
            >
              Hubungi
            </Link>
            <Link
              to="/album"
              className="bg-white border-green-600 text-green-700 py-2 px-6 rounded-md hover:bg-gray-400 hover:text-white transition duration-300"
            >
              Lihat Dokumentasi
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10 mt-8 sm:mt-12 justify-center lg:justify-start">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-semibold text-white">1200+</div>
              <div className="text-white text-sm">Tenaga Kerja Aktif</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-semibold text-white">500+</div>
              <div className="text-white text-sm">Proyek Selesai</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-semibold text-white">17+</div>
              <div className="text-white text-sm">Rekan Kerja</div>
            </div>
          </div>
        </div>

        {/* Right Content - Slider */}
        <div className="flex-1 relative max-w-full sm:max-w-lg mt-12 lg:mt-0">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`rounded-lg shadow-lg w-full object-cover aspect-[4/3] absolute top-0 left-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100 relative" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md p-3 flex items-center space-x-3 w-max max-w-xs">
            <img src="src/assets/tmng.svg" alt="Logo" className="w-6 h-6" />
            <div>
              <div className="font-semibold text-sm text-gray-900">
                100 % Safety Certified
              </div>
              <div className="text-xs text-gray-600">
                Standar Keselamatan Internasional
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
