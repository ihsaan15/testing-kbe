import React, { useEffect, useRef } from "react";

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
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = containerRef.current.querySelectorAll(".company-logo");
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            // stagger via inline style
            el.style.transitionDelay = `${delay}ms`;
            // toggle Tailwind utility classes at runtime
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(el); // single-run
          }
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((node, idx) => {
      node.dataset.delay = idx * 80; // adjust stagger (ms)
      io.observe(node);
    });

    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="bg-sky-800 py-8 px-4 sm:px-8 md:px-16 text-white text-center font-semibold text-xl sm:text-3xl min-w-full">
        Telah Dipercaya Beberapa Perusahaan Tambang dan Kontraktor
      </div>

      <div
        ref={containerRef}
        className="max-w-6xl mx-auto py-10 px-4 sm:px-6 md:px-8 flex flex-wrap justify-center gap-10 sm:gap-20"
      >
        {companies.map(({ name, logoSrc, alt }, idx) => (
          <div
            key={idx}
            className="company-logo flex justify-center items-center w-24 sm:w-32 md:w-36 lg:w-44 opacity-0 translate-y-4 transition-all duration-700 ease-out"
            aria-label={name}
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
