import React from "react";

const TrustedExpertisePage = () => {
  const backgroundUrl = "src/assets/bg-darkgreenc.jpg";
  return (
    <div
      className="min-w-screen max-w-7xl mx-auto p-6 md:p-12 font-sans text-white-900"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Title and Intro */}
      <div className=" text-white text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Pengalaman dan Keahlian yang Terpercaya
        </h1>
        <p className="text-sm md:text-base py-9 text-white">
          Sebagai Perusahaan jasa pertambangan PT. Kaltim Banua Etam bisa
          membuktikan diri sebagai salah satu perusahaan yang mampu bersaing
          dengan inovatif. Semenjak berdiri tahun 1999 PT. Kaltim Banua Etam
          terus mengembangkan layanan jasa pertambangan sehingga sekarang telah
          memiliki kurang lebih 1200 orang karyawan. Berkat kerjasama tim yang
          solid yang memiliki keahlian di bidangnya, PT Kaltim Banua Etam bisa
          diterima sebagai salah satu kontraktor di salah satu perusahaan
          tambang batu bara terbesar di Indonesia
        </p>
      </div>

      {/* Content section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        {/* Left Image */}
        <div className="mt-1 ml-40 flex-1 max-w-md md:max-w-lg max-h-full">
          <img
            src="/src/assets/fotokbe1.jpg" // Ganti path ini sesuai lokasi gambar kamu
            alt="Pekerja pertambangan"
            className="rounded-lg object-cover w-full h-full shadow-md"
          />
        </div>

        {/* Right text content */}
        <div className="flex-1 max-w-lg text-white">
          <h2 className="text-xl font-semibold mb-6">
            Komitmen Terhadap Kualitas dan Keselamatan
          </h2>
          <p className="mb-8">
            Kami memahami bahwa industri membutuhkan tenaga kerja yang tidak
            hanya terampil, tetapi juga memiliki komitmen tinggi terhadap
            keselamatan kerja. Setiap pekerja yang kami sediakan telah melalui
            pelatihan intensif dan sertifikasi yang sesuai dengan standar
            industri.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
            <FeatureItem
              title="Sertifikasi Lengkap"
              description="Semua pekerja bersertifikat K3 dan kompetensi teknis"
            />
            <FeatureItem
              title="Pengalaman"
              description="Track record 20+ tahun di industri"
            />
            <FeatureItem
              title="24/7"
              description="Dukungan teknis dan operasional sepanjang waktu"
            />
            <FeatureItem
              title="Fleksibilitas"
              description="Solusi yang disesuaikan dengan kebutuhan proyek"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ title, description }) => (
  <div className="flex items-start space-x-3">
    {/* Icon checkmark */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-check-big-icon lucide-circle-check-big"
    >
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
    <div>
      <h3 className="font-medium text-white-900">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

export default TrustedExpertisePage;
