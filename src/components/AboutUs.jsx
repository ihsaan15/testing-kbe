import React from "react";

// --- DATA DIREKSI ---
// Anda bisa mengganti data ini dari API atau sumber lain
const boardOfDirectors = [
  {
    name: "Ahmad Subagja",
    title: "Direktur Utama (CEO)",
    imageUrl: "https://i.pravatar.cc/300?u=ahmad",
  },
  {
    name: "Siti Aminah",
    title: "Direktur Teknologi (CTO)",
    imageUrl: "https://i.pravatar.cc/300?u=siti",
  },
  {
    name: "Budi Hartono",
    title: "Direktur Operasional (COO)",
    imageUrl: "https://i.pravatar.cc/300?u=budi",
  },
  {
    name: "Rina Wulandari",
    title: "Direktur Keuangan (CFO)",
    imageUrl: "https://i.pravatar.cc/300?u=rina",
  },
  {
    name: "Joko Prasetyo",
    title: "Direktur Pemasaran (CMO)",
    imageUrl: "https://i.pravatar.cc/300?u=joko",
  },
  {
    name: "Dewi Lestari",
    title: "Komisaris Independen",
    imageUrl: "https://i.pravatar.cc/300?u=dewi",
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-6 py-12 md:px-12">
        {/* Judul Utama */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Tentang <span className="text-indigo-600">Perusahaan Kami</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mengenal lebih dekat perjalanan, nilai, dan orang-orang di balik
            kesuksesan kami.
          </p>
        </section>

        {/* Visi & Misi */}
        <section className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Visi Kami 🚀
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Menjadi perusahaan teknologi terdepan di Asia Tenggara yang
              memberikan solusi inovatif dan berkelanjutan untuk meningkatkan
              kualitas hidup masyarakat.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Misi Kami 🎯
            </h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li>
                Mengembangkan produk digital yang mudah diakses dan bermanfaat
                bagi semua kalangan.
              </li>
              <li>
                Membangun ekosistem kerja yang kolaboratif, kreatif, dan
                inklusif.
              </li>
              <li>
                Berkomitmen pada praktik bisnis yang etis dan bertanggung jawab
                terhadap lingkungan.
              </li>
              <li>
                Memberikan pelayanan terbaik dan nilai tambah maksimal bagi
                pelanggan dan mitra kami.
              </li>
            </ul>
          </div>
        </section>

        {/* Sejarah Perusahaan */}
        <section className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Perjalanan Kami 🗺️
          </h2>
          <div className="relative border-l-4 border-indigo-200 ml-4 md:ml-0">
            {/* Titik Sejarah 1 */}
            <div className="mb-8 pl-8 relative">
              <div className="absolute -left-[18px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white"></div>
              <p className="font-bold text-indigo-600">2015 - Awal Mula</p>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">
                Pendirian Perusahaan
              </h3>
              <p className="text-gray-600 mt-2">
                Didirikan di sebuah garasi kecil dengan tim berisi 3 orang yang
                memiliki mimpi besar untuk mengubah dunia melalui teknologi.
              </p>
            </div>
            {/* Titik Sejarah 2 */}
            <div className="mb-8 pl-8 relative">
              <div className="absolute -left-[18px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white"></div>
              <p className="font-bold text-indigo-600">
                2018 - Peluncuran Produk Pertama
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">
                Aplikasi "Solusi Cepat"
              </h3>
              <p className="text-gray-600 mt-2">
                Berhasil meluncurkan produk andalan pertama kami yang
                mendapatkan sambutan positif dari pasar dan menjangkau 100.000
                pengguna di tahun pertama.
              </p>
            </div>
            {/* Titik Sejarah 3 */}
            <div className="mb-8 pl-8 relative">
              <div className="absolute -left-[18px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white"></div>
              <p className="font-bold text-indigo-600">
                2022 - Ekspansi & Pendanaan
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">
                Meraih Pendanaan Seri A
              </h3>
              <p className="text-gray-600 mt-2">
                Mendapatkan kepercayaan dari investor dan meraih pendanaan Seri
                A untuk berekspansi ke pasar regional dan merekrut talenta
                terbaik.
              </p>
            </div>
            {/* Titik Sejarah 4 */}
            <div className="pl-8 relative">
              <div className="absolute -left-[18px] top-1 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white"></div>
              <p className="font-bold text-indigo-600">
                Sekarang - Menuju Masa Depan
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-1">
                Inovasi Berkelanjutan
              </h3>
              <p className="text-gray-600 mt-2">
                Terus berinovasi dan mengembangkan solusi baru sambil
                mempersiapkan penawaran saham perdana (IPO) di masa mendatang.
              </p>
            </div>
          </div>
        </section>

        {/* Jajaran Direksi */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Tim Kepemimpinan Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardOfDirectors.map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-lg shadow-md p-6 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                  src={person.imageUrl}
                  alt={`Foto ${person.name}`}
                />
                <h3 className="text-xl font-bold text-gray-900">
                  {person.name}
                </h3>
                <p className="text-indigo-600 font-semibold">{person.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
