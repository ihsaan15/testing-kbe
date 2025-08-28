import React, { useEffect, useRef, useState } from "react";

/**
 * useInView
 * - Menggunakan IntersectionObserver untuk mendeteksi ketika elemen terlihat.
 * - Menghormati prefers-reduced-motion (jika user meminta motion reduced, efek dimatikan).
 * - Meng-unobserve setelah pertama kali terlihat (trigger sekali). Ubah jika perlu.
 */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // Fallback: langsung set visible
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // jika hanya trigger sekali:
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );

    observer.observe(el);

    return () => {
      try {
        observer.unobserve(el);
      } catch (e) {
        // ignore
      }
    };
  }, [ref, options]);

  return [ref, inView];
};

/**
 * AnimateOnScroll
 * - Bungkus setiap section dengan komponen ini.
 * - Opsi: delay (ms) untuk stagger effect sederhana.
 */
const AnimateOnScroll = ({ children, className = "", delay = 0 }) => {
  const [ref, inView] = useInView();
  const inlineStyle = { transitionDelay: `${delay}ms` };

  return (
    <div
      ref={ref}
      style={inlineStyle}
      className={`${className} transform transition-all duration-700 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
};

/* PemimpinPerusahaan (komponen kecil, tetap dipakai) */
const PemimpinPerusahaan = () => {
  return (
    <AnimateOnScroll className="mb-16 max-w-screen mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
      <div className="md:w-1/3 flex justify-center">
        <img
          src="src/assets/02b46_ikat.jpg"
          alt="Yusuf T Silambi"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
      <div className="md:w-2/3">
        <h2 className="text-3xl font-semibold text-black mb-2">
          Yusuf T Silambi
        </h2>
        <p className="text-red-600 mb-4 font-medium">
          Direktur Utama / Founder
        </p>
        <p className="text-gray-700 leading-relaxed">
          Untuk menjadikan PT. Kaltim Banua Etam sebagai perusahaan yang
          mengedepankan nilai-nilai usaha dengan karakteristik dan ciri-ciri
          khusus, maka PT. Kaltim Banua Etam menanamkan tiga nilai yang harus
          ditanamkan dan dikembangkan dalam setiap aktivitas perusahaan. Adapun
          nilai-nilai yang dimaksud ialah sikap RJS atau Rajin, Jujur, Setia.
          Tiga nilai ini menjadi pondasi berjalannya PT. Kaltim Banua Etam
          hingga saat ini dan dimasa yang akan datang
        </p>
      </div>
    </AnimateOnScroll>
  );
};

export default function StrukturOrganisasi() {
  const anggota = [
    { id: 1, nama: "Yusuf T Silambi", jabatan: "Direktur Utama" },
    { id: 2, nama: "Komisaris 1", jabatan: "Komisaris Utama" },
    { id: 3, nama: "Komisaris 2", jabatan: "Komisaris" },
    { id: 4, nama: "Komisaris 3", jabatan: "Komisaris" },
  ];
  const backgroundUrl = "src/assets/bg-green1v1.jpg";

  return (
    <div
      className="min-h-screen bg-green-200 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      id="TentangKami"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="max-w-5xl mx-auto mt-12">
        {/* Visi dan Misi */}
        <AnimateOnScroll className="mb-16 text-center">
          <h1 className="text-3xl font-bold text-black mb-6 mt-16">
            Membangun Indonesia <span className="text-green-600">Bersama</span>
          </h1>
          <p className="text-black mx-auto max-w-lg text-center lg:text-xl">
            Penyedia tenaga kerja profesional dan kontraktor terpercaya untuk
            proyek konstruksi sipil dan pertambangan di Indonesia.
          </p>

          <div className="flex flex-col md:flex-row md:justify-center md:space-x-12 space-y-8 md:space-y-0 text-black mt-16">
            <div className="md:w-1/2 bg-white rounded-lg shadow-2xl p-6">
              <h2 className="text-4xl font-bold mb-4 mt-6">Visi</h2>
              <p className="text-lg mt-10 text-gray-900 text-center mx-5">
                Menjadi Perusahaan manufaktur, jasa dan tenaga kerja yang
                terbaik di Indonesia
              </p>
            </div>
            <div className="md:w-1/2 bg-white rounded-lg shadow-2xl p-6">
              <h2 className="text-4xl font-bold mb-4 mt-4">Misi</h2>
              <ul className="list-disc list-inside space-y-2 text-lg text-left text-gray-900 mt-10 mx-5 mb-10">
                <li>Selalu mengutamakan kualitas dan kepuasan konsumen</li>
                <li>
                  Memupuk budaya yang mengutamakan keselamatan, kesehatan, dan
                  lingkungan dalam segala aktivitasnya
                </li>
              </ul>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Sejarah Perusahaan */}
        <AnimateOnScroll className="mb-16 max-w-screen mx-auto text-justify bg-white rounded-lg shadow-lg p-8">
          <div>
            <h2 className="text-3xl font-semibold text-black mb-16 text-center md:text-left lg:text-center mt-1">
              Sejarah Perusahaan
            </h2>
            <div className="flex justify-center mb-6">
              <img
                src="src/assets/fotokantorkbe.jpg"
                alt="Sejarah Perusahaan PT. Kaltim Banua Etam"
                className="w-full max-w-md rounded-lg shadow-md object-cover"
              />
            </div>
            <p className="text-gray-700 leading-relaxed mb-5">
              PT. Kaltim Banua Etam adalah perusahaan lokal yang bergerak di
              bidang usaha jasa pertambangan yang didirikan pada tanggal 19
              September 1999 oleh DR. Drs. Yusuf T. Silambi, MM., MBA.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              Dalam usahanya PT. Kaltim Banua Etam selalu melakukan inovasi
              untuk menciptakan lingkungan usaha yang moderen dengan tetap
              mengedepankan ide-ide baru, sesuai dengan tren usaha yang sedang
              ada guna mendapatkan kepuasan pelanggan sebagai sasaran optimal
              yang mengutamakan akurasi serta kualitas hasil secara total.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              PT. Kaltim Banua Etam pada awalnya didirikan di wilayah sangatta
              kutai timur, melalui pengalaman kerja Founder yang tumbuh serta
              belajar bersama dengan perusahaan jasa pertambangan lainnya, dan
              berpegang pada nilai-nilai berusaha yang menjadi ciri khusus PT.
              Kaltim Banua Etam.
            </p>
            <p className="text-gray-700 leading-relaxed mb-20">
              PT. Kaltim Banua Etam saat ini telah didukung oleh lebih dari 1000
              karyawan dari berbagai keterampilan dan pengetahuan, saat ini PT.
              Kaltim Banua Etam juga telah beroperasi di area bontang,
              kaliurang, separi dan bengalon.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Pemimpin Perusahaan / Direktur Utama */}
        <PemimpinPerusahaan />

        {/* Upload Gambar Struktur Organisasi */}
        <AnimateOnScroll className="mb-16 max-w-screen mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-black mb-8 mt-10">
            Struktur Organisasi
          </h2>
          <img
            src="src/assets/struktur-organisasi-versi2.jpg"
            alt="Struktur Organisasi PT. Kaltim Banua Etam"
            className="mx-auto max-w-full h-auto"
          />
        </AnimateOnScroll>

        {/* Dewan Direksi */}
        <AnimateOnScroll className="mb-16">
          <h1 className="text-3xl font-bold text-white mb-6 text-center mt-32">
            Dewan Direksi dan Komisaris
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {anggota.map((a, idx) => (
              <div
                key={a.id}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="h-28 w-28 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  {/* Placeholder avatar */}
                  <span className="text-gray-500 font-semibold">
                    {a.nama
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {a.nama}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{a.jabatan}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Jika ada section lainnya, bungkus juga dengan <AnimateOnScroll> */}
      </div>
    </div>
  );
}
