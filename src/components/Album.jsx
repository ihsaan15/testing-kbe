import React, { useEffect, useRef, useState } from "react";

/*
  Saran path gambar:
  - Taruh gambar di folder /public/assets/... dan gunakan path "/assets/namafile.jpg"
  - Contoh di array photos saya pakai "/assets/..." agar bisa diakses langsung dari browser.
*/

const photos = [
  {
    id: 1,
    src: "/assets/Technicians_Opencut_Coal_Mine.png",
    title: "Proyek Penambangan",
    description: "Kegiatan operasional proyek penambangan tahap pertama.",
  },
  {
    id: 2,
    src: "/assets/lapangan2.jpg",
    title: "Tim Profesional",
    description: "Tim profesional kami saat meeting lapangan.",
  },
  {
    id: 3,
    src: "/assets/Agin-8-1.jpg",
    title: "Keselamatan Kerja",
    description: "Penekanan pentingnya keselamatan kerja di lapangan.",
  },
  {
    id: 4,
    src: "/assets/fotokbe3.jpg",
    title: "Peralatan Modern",
    description: "Penggunaan alat berat modern untuk efisiensi.",
  },
  {
    id: 5,
    src: "/assets/fotosampleair.jpg",
    title: "Area Tambang",
    description: "Pemandangan area tambang yang sedang beroperasi.",
  },
  {
    id: 6,
    src: "/assets/136-lakevermont-2021-approved-048-hr-jpg.jpg",
    title: "Rapat Strategi",
    description: "Rapat strategi perusahaan untuk pengembangan bisnis.",
  },
];

export default function AlbumDokumentasi() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(null); // untuk menampilkan overlay saat keyboard fokus
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const nextIdx = (index + 1) % photos.length;
    const img = new Image();
    img.src = photos[nextIdx].src;
  }, [index, isOpen]);

  const openAt = (i) => {
    setIndex(i);
    setIsOpen(true);
    setTimeout(() => lightboxRef.current?.focus(), 0);
  };
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-green-800 to-teal-600">
      <h2 className="text-3xl font-bold mb-6 mt-20 text-center text-white">
        Album Dokumentasi Perusahaan
      </h2>
      <p className="mb-10 text-white text-center max-w-3xl mx-auto px-4">
        Berikut adalah beberapa foto dokumentasi kegiatan dan proyek kami untuk
        menunjukkan profesionalisme dan progress kami.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-10 md:px-20 lg:px-40">
        {photos.map((photo, i) => (
          // menggunakan <button> agar fokus keyboard lebih natural
          <button
            key={photo.id}
            type="button"
            className="group relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-teal-600 p-0"
            onClick={() => openAt(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openAt(i);
            }}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex((fi) => (fi === i ? null : fi))}
            aria-label={`Buka ${photo.title}`}
          >
            {/* thumbnail: pakai object-cover agar mengisi area */}
            <div className="w-full h-48 bg-gray-100">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>

            {/* overlay yang muncul saat hover atau fokus */}
            <div
              className={
                `absolute inset-0 flex flex-col justify-between transition-opacity duration-200 ` +
                (focusedIndex === i ? "opacity-100 " : "opacity-0 ") +
                "group-hover:opacity-100"
              }
              aria-hidden={focusedIndex === i ? "false" : "true"}
            >
              {/* area tengah: ikon kaca pembesar */}
              <div className="flex-1 flex items-center justify-center pointer-events-none">
                <div className="bg-black bg-opacity-45 rounded-full p-3 text-white pointer-events-none">
                  {/* Icon magnifying glass (Heroicons style) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
              </div>

              {/* caption di bagian bawah */}
              <div className="px-3 pb-3">
                <div className="bg-gradient-to-t from-black/80 to-transparent text-white p-3 rounded-md">
                  <h3 className="font-semibold text-lg">{photo.title}</h3>
                  <p className="text-sm mt-1">{photo.description}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${photos[index].title} - lightbox`}
        >
          <div
            className="relative max-w-5xl w-full mx-auto outline-none"
            onClick={(e) => e.stopPropagation()}
            ref={lightboxRef}
            tabIndex={-1}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white bg-black bg-opacity-40 hover:bg-opacity-60 rounded-md p-2 focus:outline-none"
              aria-label="Tutup"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 hover:bg-opacity-60 rounded-full p-3 focus:outline-none"
              aria-label="Sebelumnya"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 hover:bg-opacity-60 rounded-full p-3 focus:outline-none"
              aria-label="Berikutnya"
            >
              ›
            </button>

            <div className="bg-gray-900 rounded-md overflow-hidden">
              {/* lightbox: object-contain supaya utuh dan tidak terpotong */}
              <img
                src={photos[index].src}
                alt={photos[index].title}
                className="w-full max-h-[75vh] object-contain bg-black"
                loading="eager"
              />
              <div className="p-4 text-white bg-gradient-to-t from-black/40 to-transparent">
                <h3 className="text-xl font-semibold">{photos[index].title}</h3>
                <p className="text-sm mt-1">{photos[index].description}</p>
                <p className="text-xs mt-2 text-gray-300">
                  Foto {index + 1} dari {photos.length}
                </p>
              </div>
            </div>

            {/* Mobile nav bottom */}
            <div className="md:hidden mt-3 flex justify-between">
              <button
                onClick={prev}
                className="flex-1 mx-1 bg-white/10 text-white py-2 rounded-md"
              >
                Sebelumnya
              </button>
              <button
                onClick={next}
                className="flex-1 mx-1 bg-white/10 text-white py-2 rounded-md"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
