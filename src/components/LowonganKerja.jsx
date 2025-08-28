import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Icon({ children }) {
  return (
    <span className="mr-2 text-green-600 text-lg flex items-center">
      {children}
    </span>
  );
}

export default function LowonganKerja() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/jobs");
        const data = await res.json();
        if (mounted) setJobs(data);
      } catch (err) {
        console.error("Gagal mengambil data lowongan:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchJobs();
    return () => (mounted = false);
  }, []);

  // Filter & sort
  const filtered = jobs.filter((job) =>
    (job.posisi + " " + job.lokasi + " " + (job.deskripsi || ""))
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.deadline) - new Date(a.deadline);
    if (sortBy === "oldest") return new Date(a.deadline) - new Date(b.deadline);
    return 0;
  });

  if (loading) {
    // skeleton
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 bg-white rounded shadow-sm animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 mt-10">
          <h1 className="text-2xl font-semibold text-gray-900">
            {sorted.length} Lowongan Ditemukan
          </h1>
          <p className="text-gray-600 mt-3.5">
            Diurutkan berdasarkan tanggal deadline
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4 text-black">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari posisi, lokasi, atau kata kunci..."
              className="flex-1 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-3 sm:mt-0 border border-gray-200 rounded px-3 py-2"
            >
              <option value="newest">Terbaru (deadline)</option>
              <option value="oldest">Terlama (deadline)</option>
            </select>
          </div>
        </header>

        <div className="space-y-6">
          {sorted.map((job) => (
            <article
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-xl font-bold">
                    {job.perusahaan ? job.perusahaan.charAt(0) : "P"}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {job.posisi}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {job.perusahaan} • {job.lokasi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {job.urgent === 1 && (
                    <span className="text-xs font-semibold px-3 py-1 border border-red-500 rounded-full text-red-600">
                      Urgent
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    Deadline:{" "}
                    {new Date(job.deadline).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-600 my-3 text-sm">
                <div className="flex items-center">
                  <Icon>📍</Icon>
                  <span>{job.lokasi}</span>
                </div>
                <div className="flex items-center">
                  <Icon>⏳</Icon>
                  <span>{job.masaKerja}</span>
                </div>
                <div className="flex items-center">
                  <Icon>💰</Icon>
                  <span>{job.gaji}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                {job.deskripsi}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/lowongan/${job.id}`)}
                  className="bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-green-700 transition"
                >
                  Lihat Detail
                </button>
              </div>
            </article>
          ))}

          {sorted.length === 0 && (
            <div className="text-center text-gray-600 py-6">
              Tidak ada lowongan yang cocok.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
