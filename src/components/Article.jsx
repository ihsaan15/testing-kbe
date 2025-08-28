import React, { useEffect, useRef, useState } from "react";

// Base URL backend untuk menampilkan gambar. Sesuaikan port jika berbeda.
const API_BASE_URL = "http://localhost:5001";

// Helper untuk format tanggal
const formatDate = (dateStr) => {
  if (!dateStr) return "Tanggal tidak valid";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper untuk render paragraf
const renderContentAsParagraphs = (text) =>
  (text || "").split(/\n{2,}/).map((para, idx) => (
    <p className="mb-4 leading-relaxed text-gray-800" key={idx}>
      {para.split("\n").reduce((acc, line, i) => {
        if (i === 0) return [line];
        return [...acc, <br key={i} />, line];
      }, [])}
    </p>
  ));

/* -------------------------
   Hook: prefers-reduced-motion
   ------------------------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setReduced(mq.matches);
    handle();
    mq.addEventListener
      ? mq.addEventListener("change", handle)
      : mq.addListener(handle);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", handle)
        : mq.removeListener(handle);
    };
  }, []);
  return reduced;
}

/* -------------------------
   Hook: useInView (Intersection Observer wrapper)
   ------------------------- */
function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Jika IntersecitonObserver tidak tersedia, langsung set true
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Jika ingin hanya trigger sekali, unobserve setelah kena
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options.threshold, options.rootMargin]);

  return inView;
}

/* -------------------------
   Component: FadeInSection
   ------------------------- */
const FadeInSection = ({ children, className = "", threshold, rootMargin }) => {
  const ref = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const inView = useInView(ref, { threshold, rootMargin });

  // Jika user prefer reduced motion, tampil langsung tanpa efek
  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const base =
    "transform transition-opacity transition-transform duration-700 ease-out will-change-transform";
  const hidden = "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0";

  return (
    <div
      ref={ref}
      className={`${className} ${base} ${inView ? visible : hidden}`}
      aria-hidden={!inView}
    >
      {children}
    </div>
  );
};

/* -------------------------
   ArticlePage (main)
   ------------------------- */
const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/articles`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Memuat Artikel...
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <FadeInSection className="bg-gradient-to-r from-green-800 to-teal-600 text-white py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-12">
              {selectedArticle.title}
            </h1>
            <p className="text-gray-100">
              {selectedArticle.author} • {formatDate(selectedArticle.date)}
            </p>
            <button
              onClick={() => setSelectedArticle(null)}
              className="mt-6 inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-4 py-2 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Kembali ke daftar artikel"
            >
              ← Kembali
            </button>
          </div>
        </FadeInSection>

        <main className="max-w-5xl mx-auto -mt-8 pb-12 px-4">
          <article className="bg-white shadow-md rounded-lg overflow-hidden">
            {selectedArticle.image && (
              <FadeInSection className="w-full">
                <img
                  src={`${API_BASE_URL}${selectedArticle.image}`}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </FadeInSection>
            )}
            <div className="p-8">
              <FadeInSection>
                <div className="prose prose-lg max-w-none">
                  {renderContentAsParagraphs(selectedArticle.content)}
                </div>
              </FadeInSection>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <FadeInSection className="bg-gradient-to-r from-green-800 to-teal-600 text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-12">Artikel</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Dapatkan informasi terkini seputar industri tambang, keselamatan
          kerja, dan perkembangan teknologi.
        </p>
      </FadeInSection>

      <main className="max-w-5xl mx-auto mt-8 px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <FadeInSection key={article.id} className="w-full">
              <article className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-40 flex-shrink-0">
                  {article.image ? (
                    <img
                      src={`${API_BASE_URL}${article.image}`}
                      alt={`${article.title} - thumbnail`}
                      className="w-full h-28 md:h-32 object-cover rounded-md"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-28 md:h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 mb-3 line-clamp-3">
                      {article.intro}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-gray-600">
                    <div className="text-sm">
                      <div className="font-medium">{article.author}</div>
                      <div className="text-xs">{formatDate(article.date)}</div>
                    </div>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                      aria-label={`Buka artikel ${article.title}`}
                    >
                      Baca
                    </button>
                  </div>
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
