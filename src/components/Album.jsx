import React from "react";

const photos = [
  {
    id: 1,
    src: "src/assets/Technicians_Opencut_Coal_Mine.png",
    title: "Proyek Penambangan",
    description: "Kegiatan operasional proyek penambangan tahap pertama.",
  },
  {
    id: 2,
    src: "src/assets/lapangan2.jpg",
    title: "Tim Profesional",
    description: "Tim profesional kami saat meeting lapangan.",
  },
  {
    id: 3,
    src: "src/assets/Agin-8-1.jpg",
    title: "Keselamatan Kerja",
    description: "Penekanan pentingnya keselamatan kerja di lapangan.",
  },
  {
    id: 4,
    src: "src/assets/fotokbe3.jpg",
    title: "Peralatan Modern",
    description: "Penggunaan alat berat modern untuk efisiensi.",
  },
  {
    id: 5,
    src: "src/assets/fotosampleair.jpg",
    title: "Area Tambang",
    description: "Pemandangan area tambang yang sedang beroperasi.",
  },
  {
    id: 6,
    src: "src/assets/136-lakevermont-2021-approved-048-hr-jpg.jpg",
    title: "Rapat Strategi",
    description: "Rapat strategi perusahaan untuk pengembangan bisnis.",
  },
];

export default function AlbumDokumentasi() {
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
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-teal-600"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{photo.title}</h3>
              <p className="text-black mt-1">{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
