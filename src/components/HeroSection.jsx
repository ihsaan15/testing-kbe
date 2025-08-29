import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "/assets/hero/lapangan1.jpg",
  "/assets/hero/rekrutmen.jpg",
  "/assets/hero/fotokbe3.jpg",
  "/assets/hero/lapangan2.jpg",
  "/assets/fotokbe4.jpg",
];

const HeroSection = () => {
  const backgroundUrl = "src/assets/img1.jpg";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    // aktifkan transisi konten dan foto setelah komponen mount
    setContentVisible(true);
    setTimeout(() => setImageVisible(true), 200); // delay agar sinkron dengan konten

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const baseTransitionClasses =
    "transition-all duration-1000 ease-in-out transform";

  return (
    <section
      className="bg-cover bg-center min-h-screen flex items-center px-4 sm:px-8 py-10 sm:py-16"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="container mx-auto hero-container flex flex-col lg:flex-row items-center gap-8 w-full max-w-[1200px]">
        {/* Left Content */}
        <div
          className={`flex-1 max-w-full sm:max-w-md lg:max-w-lg text-center lg:text-left px-2 sm:px-0 ${baseTransitionClasses} ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4 pt-20 md:pt-10 lg:pt-0">
            <img
              src="src/assets/logo/logo-kbr-copy.png"
              alt="Logo PT Kaltim Banua Etam"
              className={`w-12 h-12 object-contain border-2 rounded-md bg-white ${baseTransitionClasses} ${
                contentVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            />
            <span
              className={`font-semibold text-white text-sm sm:text-base ${baseTransitionClasses} ${
                contentVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              PT. KALTIM BANUA ETAM
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl hero-title font-extrabold text-white leading-snug max-w-full sm:max-w-xl mx-auto lg:mx-0 break-words ${baseTransitionClasses} ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            Partner Terpercaya untuk{" "}
            <span className="text-green-600">Tenaga Kerja</span> Profesional
          </h1>

          <p
            className={`text-white max-w-full sm:max-w-md mx-auto lg:mx-0 mt-4 text-sm sm:text-base leading-relaxed break-words ${baseTransitionClasses} ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            Kami menyediakan tenaga kerja berkualitas tinggi untuk industri
            dengan standar keselamatan internasional dan pengalaman lebih dari
            20 tahun.
          </p>

          <div
            className={`flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mt-6 max-w-xs mx-auto lg:mx-0 ${baseTransitionClasses} ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <Link
              to="/contact"
              className="bg-green-700 text-white py-2 px-6 rounded-md shadow hover:bg-green-800 transition duration-300 w-auto inline-block text-center"
            >
              Hubungi
            </Link>
            <Link
              to="/tentang-kami"
              className="bg-white border border-green-600 text-green-700 py-2 px-6 rounded-md hover:bg-gray-400 hover:text-white transition duration-300 w-auto inline-block text-center"
            >
              Tentang Kami
            </Link>
          </div>

          <div
            className={`flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10 mt-8 sm:mt-12 justify-center lg:justify-start ${baseTransitionClasses} ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="text-center sm:text-left lg:text-left">
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                1200+
              </div>
              <div className="text-white text-sm sm:text-base">
                Tenaga Kerja Aktif
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                500+
              </div>
              <div className="text-white text-sm sm:text-base">
                Proyek Selesai
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                17+
              </div>
              <div className="text-white text-sm sm:text-base">Rekan Kerja</div>
            </div>
          </div>
        </div>

        {/* Right Content - Slider */}
        <div className="flex-1 relative max-w-full sm:max-w-lg px-4 sm:px-0 lg:mt-10 lg:ml-36  ">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`rounded-lg shadow-lg w-full object-cover absolute top-0 left-0 transition-opacity duration-[1200ms]
        ${
          index === currentIndex && imageVisible
            ? "opacity-100 relative"
            : "opacity-0"
        }
      `}
              style={{
                maxHeight: "320px",
              }} /* ukuran default untuk layar kecil/menengah; min-width:1920 di index.css akan override */
            />
          ))}

          <div
            className={`absolute bottom-4 left-4 bg-white rounded-md shadow-md p-3 flex items-center space-x-3 w-max max-w-xs ${baseTransitionClasses} ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
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
