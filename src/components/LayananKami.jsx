import React, { useEffect, useState } from "react";

const services = [
  {
    imgSrc: "/src/assets/fotosampletenagakerja.svg",
    description:
      "Penyedia layanan jasa Tenaga Kerja ke berbagai perusahaan tambang batubara dan kontrak service",
  },
  {
    imgSrc: "/src/assets/fotosampleair.jpg",
    description:
      "Layanan pengelolaan air di kolam kolam pengendapan untuk mengendalikan",
  },
  {
    imgSrc: "/src/assets/fotosamplepermesin.svg",
    description:
      "Layanan Permesinan, Resurfacing, kroming, line boring sandblasting dan pengecatan",
  },
  {
    imgSrc: "/src/assets/fotosampletrukair.jpg",
    description:
      "Penyedia dan Pengoperasian truk untuk pengangkutan air dan sampah",
  },
  {
    imgSrc: "/src/assets/fotosampleudara.svg",
    description:
      "Menyediakan pengambilan sampel kuantitas udara ambien, pengambilan sampel emisi gas , dan analisis",
  },
  {
    imgSrc: "/src/assets/fotosamplebangunan.svg",
    description:
      "Pembangunan skala kecil & pemeliharaan bangunan seperti perbaikan lending katup, tandon,y dll.",
  },
];

const LayananKami = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Aktifkan transisi setelah mount
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // kelas dasar transisi untuk tiap elemen
  const base = "transition-all duration-700 ease-out transform";

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div
        className="max-w-7xl mx-auto p-6 md:p-12 font-sans text-gray-900"
        id="layanankami"
      >
        <h2
          className={`${base} text-3xl font-bold text-center mb-2 mt-7`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(12px)",
            transitionDelay: visible ? "100ms" : "0ms",
          }}
        >
          Layanan Kami
        </h2>

        <p
          className={`${base} text-center text-gray-700 mb-12 max-w-3xl mx-auto`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(12px)",
            transitionDelay: visible ? "180ms" : "0ms",
          }}
        >
          Kami menyediakan berbagai jenis tenaga kerja spesialis untuk memenuhi
          kebutuhan operasional pertambangan Anda dengan pengaturan pasokan yang
          fleksibel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
          {services.map(({ imgSrc, description }, idx) => {
            // stagger: setiap kartu delay bertambah ~80-100ms
            const delay = 240 + idx * 80; // ms
            return (
              <div
                key={idx}
                className={`${base} flex bg-white shadow rounded-lg overflow-hidden w-full`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0px)" : "translateY(18px)",
                  transitionDelay: visible ? `${delay}ms` : "0ms",
                }}
              >
                <img
                  src={imgSrc}
                  alt={`service-${idx}`}
                  className="w-32 object-cover"
                  loading="lazy"
                />
                <p className="p-4 text-gray-800 flex items-center">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LayananKami;
