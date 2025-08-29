import React, { useEffect, useRef, useState } from "react";

/**
 * AnimateOnScroll
 * Props:
 *  - children
 *  - className (opsional) -> tambahan kelas pada wrapper
 *  - threshold (default 0.2)
 *  - rootMargin (default "0px 0px -10% 0px")
 *  - once (default true) -> jika true, hanya animasi sekali
 */
const AnimateOnScroll = ({
  children,
  className = "",
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once && observer && el) {
              observer.unobserve(el);
            }
          } else {
            if (!once) {
              setVisible(false);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (observer && el) observer.unobserve(el);
    };
  }, [threshold, rootMargin, once]);

  // Tailwind classes: mulai dari opacity-0 dan translate-y-6 -> jadi opacity-100 translate-y-0
  const baseClasses =
    "transition-all duration-700 ease-out will-change-transform";
  const hiddenClasses = "opacity-0 translate-y-6";
  const showClasses = "opacity-100 translate-y-0";

  return (
    <div
      ref={ref}
      className={`${className} ${baseClasses} ${
        visible ? showClasses : hiddenClasses
      }`}
    >
      {children}
    </div>
  );
};

const FeatureItem = ({ title, description }) => (
  <div className="flex items-start space-x-3">
    {/* Icon checkmark */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-500 flex-shrink-0 mt-1"
    >
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
    <div>
      <h3 className="font-medium text-white text-sm sm:text-base">{title}</h3>
      <p className="text-xs sm:text-sm md:text-base">{description}</p>
    </div>
  </div>
);

const TrustedExpertisePage = () => {
  const backgroundUrl = "src/assets/bg-darkgreenc.jpg";
  return (
    <div
      className="w-full mx-auto p-4 sm:p-6 md:p-12 font-sans text-white overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Title and Intro */}
      <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
          Pengalaman dan Keahlian yang Terpercaya
        </h1>
        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white">
          Sebagai Perusahaan jasa pertambangan PT. Kaltim Banua Etam bisa
          membuktikan diri sebagai salah satu perusahaan yang mampu bersaing
          dengan inovatif. Semenjak berdiri tahun 1999 PT. Kaltim Banua Etam
          terus mengembangkan layanan jasa pertambangan sehingga sekarang telah
          memiliki kurang lebih 1200 orang karyawan. Berkat kerjasama tim yang
          solid yang memiliki keahlian di bidangnya, PT Kaltim Banua Etam bisa
          diterima sebagai salah satu kontraktor di salah satu perusahaan
          tambang batu bara terbesar di Indonesia
        </p>
      </AnimateOnScroll>

      {/* Content section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 px-2 sm:px-6">
        {/* Left Image */}
        <AnimateOnScroll className="flex-1 max-w-full sm:max-w-md md:max-w-lg mb-6 md:mb-3 md:ml-32">
          <img
            src="/src/assets/fotokbe1.jpg"
            alt="Pekerja pertambangan"
            className="rounded-lg object-cover w-full max-h-[220px] sm:max-h-[300px] md:max-h-[400px] shadow-md"
          />
        </AnimateOnScroll>

        {/* Right text content */}
        <AnimateOnScroll className="flex-1 max-w-full sm:max-w-lg text-white px-2 sm:px-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Komitmen Terhadap Kualitas dan Keselamatan
          </h2>
          <p className="mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
            Kami memahami bahwa industri membutuhkan tenaga kerja yang tidak
            hanya terampil, tetapi juga memiliki komitmen tinggi terhadap
            keselamatan kerja. Setiap pekerja yang kami sediakan telah melalui
            pelatihan intensif dan sertifikasi yang sesuai dengan standar
            industri.
          </p>

          {/* Features List: beri animasi stagger ringan dengan delay inline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-xs sm:text-sm md:text-base">
            <AnimateOnScroll className="delay-0">
              <FeatureItem
                title="Sertifikasi Lengkap"
                description="Semua pekerja bersertifikat K3 dan kompetensi teknis"
              />
            </AnimateOnScroll>

            <AnimateOnScroll className="delay-75">
              <FeatureItem
                title="Pengalaman"
                description="Track record 20+ tahun di industri"
              />
            </AnimateOnScroll>

            <AnimateOnScroll className="delay-150">
              <FeatureItem
                title="24/7"
                description="Dukungan teknis dan operasional sepanjang waktu"
              />
            </AnimateOnScroll>

            <AnimateOnScroll className="delay-200">
              <FeatureItem
                title="Fleksibilitas"
                description="Solusi yang disesuaikan dengan kebutuhan proyek"
              />
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default TrustedExpertisePage;
