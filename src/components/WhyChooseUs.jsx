import React from "react";

const reasons = [
  {
    title: "Kualitas Terjamin",
    description:
      "Semua tenaga kerja telah melalui seleksi ketat dan pelatihan berkelanjutan untuk memastikan kualitas terbaik.",
    icon: (
      <svg
        className="w-6 h-6 text-green-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Respon Cepat",
    description:
      "Kami siap merespon kebutuhan tenaga kerja Anda dengan cepat, bahkan untuk kebutuhan mendesak.",
    icon: (
      <svg
        className="w-6 h-6 text-green-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Safety First",
    description:
      "Komitmen tinggi terhadap keselamatan kerja dengan zero accident sebagai target utama kami.",
    icon: (
      <svg
        className="w-6 h-6 text-green-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Tim Berpengalaman",
    description:
      "Tim manajemen dengan pengalaman puluhan tahun di industri pertambangan Indonesia.",
    icon: (
      <svg
        className="w-6 h-6 text-green-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.834 4.917c0 4.418-3.582 8-8 8a8 8 0 01-8-8c0-1.567.537-3.009 1.436-4.153L12 14z"
        ></path>
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 md:px-12 lg:px-20 w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
      {/* Left section: Reasons */}
      <div className="flex-1 max-w-md space-y-6">
        <h2 className="text-black text-2xl sm:text-3xl font-semibold mb-8 text-center md:text-left">
          Mengapa Memilih Kami
        </h2>
        {reasons.map(({ title, description, icon }, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="mt-1">{icon}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right section: Image */}
      <div className="flex-1 max-w-sm w-full">
        <img
          src="/src/assets/fotokbe3.jpg"
          alt="Worker in Safety Gear"
          className="rounded-lg shadow-lg object-cover w-full h-48 sm:h-64 md:h-80 lg:h-96"
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
