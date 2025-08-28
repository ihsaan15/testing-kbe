import React from "react";

const companies = [
  { name: "KPC", logoSrc: "/src/assets/logo/logo-kpc.png", alt: "KPC Logo" },
  { name: "PAMA", logoSrc: "/src/assets/logo/logo-pama.png", alt: "PAMA Logo" },
  {
    name: "Darma Henwa",
    logoSrc: "/src/assets/logo/logo-darmahenwa.png",
    alt: "Darma Henwa Logo",
  },
  {
    name: "Trakindo CAT",
    logoSrc: "/src/assets/logo/logo-trakindo.png",
    alt: "Trakindo CAT Logo",
  },
  {
    name: "Hexindo",
    logoSrc: "/src/assets/logo/logo-hexindo.png",
    alt: "Hexindo Logo",
  },
  {
    name: "PT United Tractors",
    logoSrc: "/src/assets/logo/logo-ut.png",
    alt: "PT United Tractors Logo",
  },
  {
    name: "PT AEL",
    logoSrc: "/src/assets/logo/logo-ael.png",
    alt: "PT AEL Logo",
  },
  {
    name: "PT Intecs",
    logoSrc: "/src/assets/logo/logo-intecs.png",
    alt: "PT Intecs Logo",
  },
];

const TrustedCompanies = () => {
  return (
    <div className="bg-gray-200">
      <div className="bg-sky-800 py-8 px-4 sm:px-8 md:px-16 text-white text-center font-semibold text-xl sm:text-3xl min-w-full">
        Telah Dipercaya Beberapa Perusahaan Tambang dan Kontraktor
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 md:px-8 flex flex-wrap justify-center gap-10 sm:gap-20">
        {companies.map(({ name, logoSrc, alt }, idx) => (
          <div
            key={idx}
            className="flex justify-center items-center w-24 sm:w-32 md:w-36 lg:w-44"
          >
            <img
              src={logoSrc}
              alt={alt}
              className="max-h-12 sm:max-h-20 md:max-h-24 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedCompanies;
