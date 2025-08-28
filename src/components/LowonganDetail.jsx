import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Hapus variabel statis 'jobsData'

export default function LowonganDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk menampung data job tunggal, loading, dan error
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/jobs/${id}`);

        if (!response.ok) {
          // Jika server merespons dengan 404 atau 500
          throw new Error("Gagal mengambil data lowongan");
        }

        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error(error);
        setJob(null); // Set job menjadi null jika tidak ditemukan atau error
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]); // Dependency [id] agar data di-fetch ulang jika id berubah

  // Tampilkan pesan loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat detail lowongan...
      </div>
    );
  }

  // Tampilkan pesan jika lowongan tidak ditemukan setelah loading selesai
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">
          Lowongan tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/lowongan-kerja")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          ← Kembali ke daftar
        </button>
      </div>
    );
  }

  // Jika data ada, render komponen
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 font-sans ">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Tombol kembali */}
        <div>
          <button
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-md shadow-sm text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-20"
          >
            <span className="text-lg leading-none">←</span>
            <span className="hidden sm:inline">Kembali</span>
            <span className="sm:hidden">Kembali</span>
          </button>
        </div>

        {/* Header Pekerjaan */}
        <section className="rounded-lg p-6 shadow-sm space-y-4 bg-white text-black">
          {/* ... sisa kode JSX tidak ada yang berubah, karena nama properti (job.posisi, job.persyaratan, dll.) sama persis ... */}
          {/* Header Pekerjaan */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {job.posisi}
            </h1>
            {/* ... dan seterusnya */}
          </div>
          {/* ... */}
          <p className="text-black font-bold mt-3 text-sm sm:text-base whitespace-pre-line">
            {job.kirimlamaran}
          </p>
          {/* ... */}
        </section>

        {/* Persyaratan & Benefit kontainer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Persyaratan */}
          <section className="rounded-lg p-6 shadow-sm bg-white text-black">
            <h2 className="text-lg font-semibold mb-4">Persyaratan</h2>
            <ul className="list-none space-y-2">
              {job.persyaratan.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
                >
                  <span className="text-green-500 mt-1">✔️</span>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Benefit & Fasilitas */}
          <section className="rounded-lg p-6 shadow-sm bg-white text-black">
            <h2 className="text-lg font-semibold mb-4">Benefit & Fasilitas</h2>
            <ul className="list-none space-y-2">
              {job.benefit.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
                >
                  <span className="text-green-500 mt-1">✔️</span>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4 text-sm text-gray-600">
              <p className="font-medium text-gray-800">Kontak</p>
              <p>{job.kontak}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
