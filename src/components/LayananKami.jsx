import React, { useEffect, useRef, useState } from "react";

const services = [
  {
    imgSrc: "/assets/rekrutmen.jpg",
    description:
      "Penyedia layanan jasa Tenaga Kerja ke berbagai perusahaan tambang batubara dan kontrak service",
  },
  {
    imgSrc: "/assets/kolamkbe1.jpg",
    description:
      "Layanan pengelolaan air di kolam kolam pengendapan untuk mengendalikan",
  },
  {
    imgSrc: "/assets/produksi1.png",
    description:
      "Layanan Permesinan, Resurfacing, kroming, line boring sandblasting dan pengecatan",
  },
  {
    imgSrc: "/assets/fotosampletrukair.png",
    description:
      "Penyedia dan Pengoperasian truk untuk pengangkutan air dan sampah",
  },
  {
    imgSrc: "/assets/sampleudara1.png",
    description:
      "Menyediakan pengambilan sampel kuantitas udara ambien, pengambilan sampel emisi gas , dan analisis",
  },
  {
    imgSrc: "/assets/civil2.png",
    description:
      "Pembangunan skala kecil & pemeliharaan bangunan seperti perbaikan lending katup, tandon,y dll.",
  },
];

const LayananKami = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  // helper untuk menyimpan refs dari cards
  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Handle image loading
  const handleImageLoad = (imgSrc) => {
    setImagesLoaded((prev) => new Set([...prev, imgSrc]));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const options = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    };

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          // tambahkan kelas untuk mengaktifkan transisi Tailwind
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");

          // jika ada data-index gunakan untuk delay
          const idx = el.dataset.index ? Number(el.dataset.index) : 0;
          // fallback delay (jika belum di-set di style)
          if (!el.style.transitionDelay) {
            el.style.transitionDelay = `${idx * 80}ms`;
          }

          // stop observing supaya animasi hanya jalan sekali
          observer.unobserve(el);
        }
      });
    }, options);

    // observe title & desc
    if (titleRef.current) {
      // set initial styles via className (Tailwind)
      titleRef.current.classList.add(
        "transition-all",
        "duration-700",
        "ease-out",
        "transform",
        "opacity-0",
        "translate-y-6"
      );
      // slight delay
      titleRef.current.style.transitionDelay = "100ms";
      io.observe(titleRef.current);
    }
    if (descRef.current) {
      descRef.current.classList.add(
        "transition-all",
        "duration-700",
        "ease-out",
        "transform",
        "opacity-0",
        "translate-y-6"
      );
      descRef.current.style.transitionDelay = "180ms";
      io.observe(descRef.current);
    }

    // observe each card
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      card.dataset.index = String(idx);
      // set initial Tailwind classes for hidden state
      card.classList.add(
        "transition-all",
        "duration-700",
        "ease-out",
        "transform",
        "opacity-0",
        "translate-y-6"
      );
      // set style delay (stagger)
      card.style.transitionDelay = `${240 + idx * 80}ms`;
      io.observe(card);
    });

    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full bg-gray-100">
      <div
        className="max-w-7xl mx-auto p-6 md:p-12 font-sans text-gray-900 layanankami"
        id="layanankami"
      >
        <h2 ref={titleRef} className="text-3xl font-bold text-center mb-2 mt-7">
          Layanan Kami
        </h2>

        <p
          ref={descRef}
          className="text-center text-gray-700 mb-12 max-w-3xl mx-auto"
        >
          Kami menyediakan berbagai jenis tenaga kerja spesialis untuk memenuhi
          kebutuhan operasional pertambangan Anda dengan pengaturan pasokan yang
          fleksibel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto services-grid">
          {services.map(({ imgSrc, description }, idx) => {
            const isImageLoaded = imagesLoaded.has(imgSrc);

            return (
              <div
                key={idx}
                ref={addCardRef}
                data-index={idx}
                className="group bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden w-full service-card transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container - Lebih besar dan responsif */}
                <div className="relative w-full h-48 md:h-52 lg:h-48 overflow-hidden">
                  {/* Loading placeholder */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                  )}

                  <img
                    src={imgSrc}
                    alt={`Layanan ${idx + 1}`}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(imgSrc)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x300/e5e7eb/9ca3af?text=Service+${
                        idx + 1
                      }`;
                      handleImageLoad(imgSrc);
                    }}
                  />

                  {/* Overlay gradient untuk better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-gray-800 text-sm leading-relaxed service-desc">
                    {description}
                  </p>

                  {/* Optional: Add a subtle indicator */}
                  <div className="mt-4 flex items-center text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LayananKami;
