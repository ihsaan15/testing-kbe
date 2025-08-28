import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Base URL backend untuk API dan menampilkan gambar
const API_BASE_URL = "http://localhost:5001";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [formState, setFormState] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // === Fetch Data from API ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, jobsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/articles`),
          fetch(`${API_BASE_URL}/api/jobs`),
        ]);
        const articlesData = await articlesRes.json();
        const jobsData = await jobsRes.json();
        setArticles(Array.isArray(articlesData) ? articlesData : []);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal memuat data. Cek koneksi / server.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset form when modal closed
  useEffect(() => {
    if (!modalOpen) {
      setFormState({});
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
      setEditItem(null);
    }
  }, [modalOpen]);

  // Filter data berdasarkan pencarian
  const filteredArticles = articles.filter((a) =>
    (a.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredJobs = jobs.filter((j) =>
    (j.posisi || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // === Open Add or Edit Modal ===
  const openAddModal = () => {
    setEditItem(null);
    const initialState =
      activeTab === "articles"
        ? {
            title: "",
            author: "Admin",
            status: "draft",
            body: "",
            publishDate: new Date().toISOString().split("T")[0],
          }
        : {
            posisi: "",
            lokasi: "Kalimantan Timur",
            masaKerja: "",
            gaji: "",
            deadline: new Date().toISOString().split("T")[0],
            kirimlamaran: "",
            persyaratan: "",
            benefit: "",
            status: "active",
          };
    setFormState(initialState);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    if (activeTab === "articles") {
      setFormState({
        title: item.title || "",
        author: item.author || "Admin",
        status: item.status || "draft",
        body: item.body || "",
        publishDate: item.publishDate ? item.publishDate.split("T")[0] : "",
        imageUrl: item.imageUrl || "",
      });
      if (item.imageUrl) {
        // pastikan API_BASE_URL + path benar
        setImagePreview(`${API_BASE_URL}${item.imageUrl}`);
      }
    } else {
      setFormState({
        posisi: item.posisi || "",
        lokasi: item.lokasi || "Kalimantan Timur",
        masaKerja: item.masaKerja || "",
        gaji: item.gaji || "",
        deadline: item.deadline ? item.deadline.split("T")[0] : "",
        kirimlamaran: item.kirimlamaran || "",
        persyaratan: Array.isArray(item.persyaratan)
          ? item.persyaratan.join("\n")
          : item.persyaratan || "",
        benefit: Array.isArray(item.benefit)
          ? item.benefit.join("\n")
          : item.benefit || "",
        status: item.status || "active",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // === Handle Form Input Change ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: null }));
  };

  // === Handle Quill Editor Change (for article body) ===
  const handleQuillChange = (value) => {
    setFormState((s) => ({ ...s, body: value }));
    setErrors((err) => ({ ...err, body: null }));
  };

  // === Handle Image Upload ===
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // === Validation ===
  const validate = () => {
    const err = {};
    if (activeTab === "articles") {
      if (!formState.title || formState.title.trim().length < 3)
        err.title = "Judul minimal 3 karakter";
      if (
        !formState.body ||
        formState.body.trim() === "" ||
        formState.body === "<p><br></p>"
      )
        err.body = "Isi artikel tidak boleh kosong";
    } else {
      if (!formState.posisi || formState.posisi.trim().length < 2)
        err.posisi = "Posisi minimal 2 karakter";
      if (!formState.kirimlamaran || formState.kirimlamaran.trim() === "")
        err.kirimlamaran = "Tentukan cara kirim lamaran";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // === Submit Form ===
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (activeTab === "articles") {
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
          if (formState[key] !== undefined && key !== "imageUrl")
            formData.append(key, formState[key]);
        });
        if (imageFile) {
          formData.append("image", imageFile);
        }

        const response = await fetch(
          editItem
            ? `${API_BASE_URL}/api/articles/${editItem.id}`
            : `${API_BASE_URL}/api/articles`,
          { method: editItem ? "PUT" : "POST", body: formData }
        );
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.message || "Gagal menyimpan artikel");

        if (editItem) {
          setArticles((prev) =>
            prev.map((a) => (a.id === editItem.id ? result : a))
          );
        } else {
          setArticles((prev) => [result, ...prev]);
        }
      } else {
        const jobData = {
          ...formState,
          persyaratan: (formState.persyaratan || "")
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l),
          benefit: (formState.benefit || "")
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l),
        };

        const response = await fetch(
          editItem
            ? `${API_BASE_URL}/api/jobs/${editItem.id}`
            : `${API_BASE_URL}/api/jobs`,
          {
            method: editItem ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jobData),
          }
        );
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.message || "Gagal menyimpan lowongan");

        if (editItem) {
          setJobs((prev) =>
            prev.map((j) => (j.id === editItem.id ? result : j))
          );
        } else {
          setJobs((prev) => [result, ...prev]);
        }
      }

      closeModal();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data. Periksa console untuk detail.");
    }
  };

  // === Delete Item ===
  const handleDelete = async (id) => {
    const type = activeTab === "articles" ? "artikel" : "lowongan";
    if (!window.confirm(`Yakin ingin menghapus ${type} ini?`)) return;

    try {
      const endpoint =
        activeTab === "articles"
          ? `${API_BASE_URL}/api/articles/${id}`
          : `${API_BASE_URL}/api/jobs/${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus item");
      if (activeTab === "articles") {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus item. Periksa console untuk detail.");
    }
  };

  // === Helpers ===
  const excerpt = (html) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 120 ? text.slice(0, 120) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">Kelola artikel dan lowongan</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel / lowongan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm shadow-sm"
            >
              Tambah {activeTab === "articles" ? "Artikel" : "Lowongan"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar / Tabs */}
          <aside className="bg-white rounded-md border border-gray-200 p-4 h-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Menu</h3>
                <span className="text-xs text-gray-400">
                  {loading ? "Memuat..." : ""}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("articles")}
                  className={`text-left px-3 py-2 rounded-md text-sm ${
                    activeTab === "articles"
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Artikel ({articles.length})
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`text-left px-3 py-2 rounded-md text-sm ${
                    activeTab === "jobs"
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Lowongan ({jobs.length})
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {activeTab === "articles" ? (
              <section>
                <h2 className="sr-only">Daftar Artikel</h2>

                {filteredArticles.length === 0 && !loading ? (
                  <div className="bg-white border border-dashed border-gray-200 rounded-md p-6 text-center text-sm text-gray-500">
                    Tidak ada artikel ditemukan.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredArticles.map((a) => (
                      <article
                        key={a.id}
                        className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm flex flex-col"
                      >
                        <div className="h-40 sm:h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                          {a.imageUrl ? (
                            // safe image URL
                            // jika server menyajikan full url atau path, sesuaikan
                            <img
                              src={
                                a.imageUrl.startsWith("http")
                                  ? a.imageUrl
                                  : `${API_BASE_URL}${a.imageUrl}`
                              }
                              alt={a.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400 text-sm">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="text-md font-semibold text-gray-800">
                            {a.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-2 flex-1">
                            {excerpt(a.body)}
                          </p>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="text-xs text-gray-500">
                              {a.author}
                            </div>
                            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                              {a.status}
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(a)}
                              className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="text-sm px-3 py-1 bg-red-600 text-white rounded-md"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <section>
                <h2 className="sr-only">Daftar Lowongan</h2>

                {filteredJobs.length === 0 && !loading ? (
                  <div className="bg-white border border-dashed border-gray-200 rounded-md p-6 text-center text-sm text-gray-500">
                    Tidak ada lowongan ditemukan.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.map((j) => (
                      <div
                        key={j.id}
                        className="bg-white border border-gray-200 rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div>
                          <h3 className="text-md font-semibold text-gray-800">
                            {j.posisi}
                          </h3>
                          <div className="text-sm text-gray-500">
                            {j.lokasi} • {j.masaKerja || "—"}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-600">
                            {j.gaji || "—"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Deadline: {j.deadline || "—"}
                          </div>
                          <button
                            onClick={() => openEditModal(j)}
                            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(j.id)}
                            className="text-sm px-3 py-1 bg-red-600 text-white rounded-md"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 text-black">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-md shadow-xl w-full max-w-3xl mx-auto overflow-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-800">
                {editItem ? "Edit" : "Tambah"}{" "}
                {activeTab === "articles" ? "Artikel" : "Lowongan"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Tutup
                </button>
              </div>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="p-4 grid grid-cols-1 gap-4"
            >
              {/* layout responsive: 1 col mobile, 2 col md */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === "articles" ? (
                  <>
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Judul</label>
                      <input
                        name="title"
                        value={formState.title || ""}
                        onChange={handleInputChange}
                        className={`mt-1 rounded-md border px-3 py-2 text-sm ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.title && (
                        <div className="text-xs text-red-600 mt-1">
                          {errors.title}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Author</label>
                      <input
                        name="author"
                        value={formState.author || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                      <label className="text-sm text-gray-600">
                        Isi Artikel
                      </label>
                      <div
                        className={`mt-1 border ${
                          errors.body ? "border-red-500" : "border-gray-200"
                        } rounded-md`}
                      >
                        <ReactQuill
                          value={formState.body || ""}
                          onChange={handleQuillChange}
                          className="min-h-[160px] md:min-h-[220px]"
                        />
                      </div>
                      {errors.body && (
                        <div className="text-xs text-red-600 mt-1">
                          {errors.body}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">
                        Tanggal Publish
                      </label>
                      <input
                        type="date"
                        name="publishDate"
                        value={formState.publishDate || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Status</label>
                      <select
                        name="status"
                        value={formState.status || "draft"}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                      <label className="text-sm text-gray-600">
                        Gambar (opsional)
                      </label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="text-sm"
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="preview"
                            className="h-20 w-28 object-cover rounded-md border"
                          />
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  // JOB FORM
                  <>
                    <div className="flex flex-col ">
                      <label className="text-sm text-gray-600">Posisi</label>
                      <input
                        name="posisi"
                        value={formState.posisi || ""}
                        onChange={handleInputChange}
                        className={`mt-1 rounded-md border px-3 py-2 text-sm ${
                          errors.posisi ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.posisi && (
                        <div className="text-xs text-red-600 mt-1">
                          {errors.posisi}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Lokasi</label>
                      <input
                        name="lokasi"
                        value={formState.lokasi || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">
                        Masa Kerja
                      </label>
                      <input
                        name="masaKerja"
                        value={formState.masaKerja || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Gaji</label>
                      <input
                        name="gaji"
                        value={formState.gaji || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <label className="text-sm text-gray-600">Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        value={formState.deadline || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                      <label className="text-sm text-gray-600">
                        Cara Kirim Lamaran
                      </label>
                      <input
                        name="kirimlamaran"
                        value={formState.kirimlamaran || ""}
                        onChange={handleInputChange}
                        className={`mt-1 rounded-md border px-3 py-2 text-sm ${
                          errors.kirimlamaran
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.kirimlamaran && (
                        <div className="text-xs text-red-600 mt-1">
                          {errors.kirimlamaran}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                      <label className="text-sm text-gray-600">
                        Persyaratan (pisah baris)
                      </label>
                      <textarea
                        name="persyaratan"
                        value={formState.persyaratan || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col">
                      <label className="text-sm text-gray-600">
                        Benefit (pisah baris)
                      </label>
                      <textarea
                        name="benefit"
                        value={formState.benefit || ""}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Status</label>
                      <select
                        name="status"
                        value={formState.status || "active"}
                        onChange={handleInputChange}
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-sm px-3 py-2 bg-white border border-gray-300 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="text-sm px-3 py-2 bg-green-600 text-white rounded-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
