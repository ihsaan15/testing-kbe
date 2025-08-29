import { useEffect, useState } from "react";

export default function ContactPage() {
  const backgroundUrl = "/assets/bg-green.jpg";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger animation after mount
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen bg-green-100 py-16 px-6 md:px-20 lg:px-32 font-sans bg-cover bg-center`}
      id="contactpage"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Container that will fade/slide */}
      <div
        className={[
          "max-w-6xl mx-auto transition-all duration-500 ease-out",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        ].join(" ")}
      >
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 mt-10">
          Kontak
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Telepon */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-5">
            <div className="text-green-600 text-3xl">
              {/* svg... */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone-call"
              >
                <path d="M13 2a9 9 0 0 1 9 9" />
                <path d="M13 6a5 5 0 0 1 5 5" />
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Telepon/Whatsapp
              </h3>
              <p className="text-gray-700 mt-1 select-text">+6281253885732</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-5">
            <div className="text-green-600 text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Email</h3>
              <p className="text-gray-700 mt-1 select-text">
                recruitment@kbe.co.id
              </p>
            </div>
          </div>

          {/* Alamat Kantor */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-5">
            <div className="text-green-600 text-3xl mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-building"
              >
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Alamat Kantor
              </h3>
              <p className="text-gray-700 mt-1 leading-relaxed">
                Jl. Kabo, No. 5, Swarga Bara, Sangatta, Kabupaten Kutai Timur,
                <br />
                Kalimantan Timur 75611, Indonesia
              </p>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-5">
            <div
              className="text-pink-600"
              aria-label="Instagram logo"
              role="img"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Sosial Media
              </h3>
              <a
                className="text-gray-700 mt-1 select-text"
                href="https://www.instagram.com/pt.kaltimbanuaetam/"
              >
                @pt.kaltimbanuaetam
              </a>
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-full flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 md:space-x-10">
            <div className="flex items-center space-x-5">
              <div className="text-green-600 text-3xl">🕒</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Jam Operasional
                </h3>
                <div className="mt-1 text-gray-700 leading-relaxed whitespace-pre-line">
                  Senin - Jumat{"\n"}Sabtu{"\n"}Minggu
                </div>
              </div>
            </div>
            <div className="mt-8 text-gray-700 text-right md:text-left mr-6 font-mono leading-relaxed whitespace-pre-line ">
              08:00 - 17:00 WITA{"\n"}08:00 - 12:00 WITA{"\n"}Tutup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
