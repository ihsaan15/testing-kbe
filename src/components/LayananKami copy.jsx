import React from "react";

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
  return (
    <div
      className="max-w-7xl mx-auto p-6 md:p-12 font-sans text-gray-900 bg-gray-100 min-h-screen min-w-screen"
      id="layanankami"
    >
      <h2 className="text-3xl font-bold text-center mb-2 mt-7">Layanan Kami</h2>
      <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
        Kami menyediakan berbagai jenis tenaga kerja spesialis untuk memenuhi
        kebutuhan operasional pertambangan Anda dengan pengaturan pasokan yang
        fleksibel.
      </p>

      <div className=" ml-64 justify-center grid w-4xl grid-cols-1 md:grid-cols-2 gap-8">
        {services.map(({ imgSrc, description }, idx) => (
          <div
            key={idx}
            className="flex bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={imgSrc}
              alt="service"
              className="w-32 object-cover"
              loading="lazy"
            />
            <p className="p-4 text-gray-800 flex items-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayananKami;
