import React, { useEffect, useState } from "react";

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
      if (!formState.body || formState.body.trim() === "")
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
      const response = await fetch(
        activeTab === "articles"
          ? `${API_BASE_URL}/api/articles/${id}`
          : `${API_BASE_URL}/api/jobs/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Gagal menghapus data");

      if (activeTab === "articles") {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      }
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data. Periksa console untuk detail.");
    }
  };

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === "articles"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
          onClick={() => setActiveTab("articles")}
        >
          Artikel
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "jobs"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
          onClick={() => setActiveTab("jobs")}
        >
          Lowongan
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Cari ${
            activeTab === "articles" ? "artikel" : "lowongan"
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Data List */}
      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "articles" ? (
        <ul>
          {filteredArticles.map((article) => (
            <li
              key={article.id}
              className="mb-2 border rounded p-2 flex justify-between items-center"
            >
              <span>{article.title}</span>
              <div>
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => openEditModal(article)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(article.id)}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li
              key={job.id}
              className="mb-2 border rounded p-2 flex justify-between items-center"
            >
              <span>{job.posisi}</span>
              <div>
                <button
                  className="mr-2 text-blue-600"
                  onClick={() => openEditModal(job)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(job.id)}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
            <h2 className="text-xl mb-4">
              {editItem
                ? `Edit ${activeTab === "articles" ? "Artikel" : "Lowongan"}`
                : `Tambah ${activeTab === "articles" ? "Artikel" : "Lowongan"}`}
            </h2>

            <form onSubmit={handleFormSubmit}>
              {activeTab === "articles" ? (
                <>
                  <div className="mb-4">
                    <label className="block mb-1">Judul</label>
                    <input
                      type="text"
                      name="title"
                      value={formState.title || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Penulis</label>
                    <input
                      type="text"
                      name="author"
                      value={formState.author || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                      disabled
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Status</label>
                    <select
                      name="status"
                      value={formState.status || "draft"}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Tanggal Terbit</label>
                    <input
                      type="date"
                      name="publishDate"
                      value={formState.publishDate || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    />
                  </div>

                  {/* GANTI DARI React Quill KE textarea biasa */}
                  <div className="mb-4">
                    <label className="block mb-1">Isi Artikel</label>
                    <textarea
                      name="body"
                      value={formState.body || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 h-40 border rounded resize-y ${
                        errors.body ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.body && (
                      <p className="text-red-500 text-sm mt-1">{errors.body}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Gambar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 max-h-40"
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block mb-1">Posisi</label>
                    <input
                      type="text"
                      name="posisi"
                      value={formState.posisi || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        errors.posisi ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.posisi && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.posisi}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Lokasi</label>
                    <input
                      type="text"
                      name="lokasi"
                      value={formState.lokasi || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Masa Kerja</label>
                    <input
                      type="text"
                      name="masaKerja"
                      value={formState.masaKerja || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Gaji</label>
                    <input
                      type="text"
                      name="gaji"
                      value={formState.gaji || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formState.deadline || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Cara Kirim Lamaran</label>
                    <input
                      type="text"
                      name="kirimlamaran"
                      value={formState.kirimlamaran || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        errors.kirimlamaran
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.kirimlamaran && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.kirimlamaran}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">
                      Persyaratan (pisah tiap baris)
                    </label>
                    <textarea
                      name="persyaratan"
                      value={formState.persyaratan || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 h-24 border rounded resize-y border-gray-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">
                      Benefit (pisah tiap baris)
                    </label>
                    <textarea
                      name="benefit"
                      value={formState.benefit || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 h-24 border rounded resize-y border-gray-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Status</label>
                    <select
                      name="status"
                      value={formState.status || "active"}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded border-gray-300"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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
