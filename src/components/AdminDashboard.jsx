import React, { useEffect, useState, useRef } from "react";

// Base URL backend untuk API dan menampilkan gambar
const API_BASE_URL = "http://localhost:5001";

function getId(item) {
  return item.id ?? item._id ?? null;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("articles"); // "articles" atau "jobs"
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

  const createdObjectUrlRef = useRef(null);

  // === Fetch Data from API ===
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, jobsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/articles`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/api/jobs`, { signal: controller.signal }),
        ]);

        if (!articlesRes.ok) {
          const txt = await articlesRes.text();
          throw new Error("Error fetch articles: " + txt);
        }
        if (!jobsRes.ok) {
          const txt = await jobsRes.text();
          throw new Error("Error fetch jobs: " + txt);
        }

        const articlesData = await articlesRes.json();
        const jobsData = await jobsRes.json();
        setArticles(Array.isArray(articlesData) ? articlesData : []);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Gagal mengambil data:", error);
          alert(
            "Gagal memuat data. Cek koneksi / server. Lihat console untuk detail."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  // Cleanup object URL ketika component unmount
  useEffect(() => {
    return () => {
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
        createdObjectUrlRef.current = null;
      }
    };
  }, []);

  // Reset form ketika modal ditutup
  useEffect(() => {
    if (!modalOpen) {
      setFormState({});
      setImageFile(null);
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
        createdObjectUrlRef.current = null;
      }
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
        const url =
          item.imageUrl.startsWith("http") || item.imageUrl.startsWith("//")
            ? item.imageUrl
            : `${API_BASE_URL.replace(/\/$/, "")}/${item.imageUrl.replace(
                /^\//,
                ""
              )}`;
        setImagePreview(url);
      } else {
        setImagePreview(null);
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
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageFile(file);

      // revoke previous object URL jika ada
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
      }
      const objUrl = URL.createObjectURL(file);
      createdObjectUrlRef.current = objUrl;
      setImagePreview(objUrl);
    } else {
      setImageFile(null);
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
        createdObjectUrlRef.current = null;
      }
      setImagePreview(null);
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
        err.kirimlamaran = "Tentukan cara kirim lamaran (email/link)";
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
          if (formState[key] !== undefined && key !== "imageUrl") {
            formData.append(key, formState[key]);
          }
        });
        if (imageFile) {
          formData.append("image", imageFile);
        }

        const url = editItem
          ? `${API_BASE_URL}/api/articles/${getId(editItem)}`
          : `${API_BASE_URL}/api/articles`;

        const response = await fetch(url, {
          method: editItem ? "PUT" : "POST",
          body: formData,
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok)
          throw new Error(result.message || "Gagal menyimpan artikel");

        // Update state
        if (editItem) {
          setArticles((prev) =>
            prev.map((p) => (getId(p) === getId(editItem) ? result : p))
          );
        } else {
          setArticles((prev) => [result, ...prev]);
        }
      } else {
        // jobs (JSON)
        const payload = {
          posisi: formState.posisi,
          lokasi: formState.lokasi,
          masaKerja: formState.masaKerja,
          gaji: formState.gaji,
          deadline: formState.deadline,
          kirimlamaran: formState.kirimlamaran,
          persyaratan: (formState.persyaratan || "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          benefit: (formState.benefit || "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          status: formState.status || "active",
        };

        const url = editItem
          ? `${API_BASE_URL}/api/jobs/${getId(editItem)}`
          : `${API_BASE_URL}/api/jobs`;

        const response = await fetch(url, {
          method: editItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok)
          throw new Error(result.message || "Gagal menyimpan job");

        if (editItem) {
          setJobs((prev) =>
            prev.map((p) => (getId(p) === getId(editItem) ? result : p))
          );
        } else {
          setJobs((prev) => [result, ...prev]);
        }
      }

      closeModal();
    } catch (err) {
      console.error("Error submit:", err);
      alert("Gagal menyimpan. Lihat console untuk detail.");
    }
  };

  // === Delete ===
  const handleDelete = async (item) => {
    if (!window.confirm("Hapus item ini?")) return;
    try {
      const url =
        activeTab === "articles"
          ? `${API_BASE_URL}/api/articles/${getId(item)}`
          : `${API_BASE_URL}/api/jobs/${getId(item)}`;

      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Gagal menghapus");
      }

      if (activeTab === "articles") {
        setArticles((prev) => prev.filter((p) => getId(p) !== getId(item)));
      } else {
        setJobs((prev) => prev.filter((p) => getId(p) !== getId(item)));
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Gagal menghapus. Lihat console.");
    }
  };

  // === Toggle status (publish / draft / active) ===
  const handleToggleStatus = async (item) => {
    try {
      const id = getId(item);
      const targetUrl =
        activeTab === "articles"
          ? `${API_BASE_URL}/api/articles/${id}`
          : `${API_BASE_URL}/api/jobs/${id}`;

      // Flip status locally and send patch
      const newStatus =
        activeTab === "articles"
          ? item.status === "published"
            ? "draft"
            : "published"
          : item.status === "active"
          ? "inactive"
          : "active";

      const response = await fetch(targetUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(result.message || "Gagal update status");

      if (activeTab === "articles") {
        setArticles((prev) => prev.map((p) => (getId(p) === id ? result : p)));
      } else {
        setJobs((prev) => prev.map((p) => (getId(p) === id ? result : p)));
      }
    } catch (err) {
      console.error("Toggle status error:", err);
      alert("Gagal mengganti status. Lihat console.");
    }
  };

  // === Helpers ===
  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith("http") || imageUrl.startsWith("//")
      ? imageUrl
      : `${API_BASE_URL.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => setActiveTab("articles")}
                className={`px-4 py-2 ${
                  activeTab === "articles" ? "bg-gray-100" : "bg-transparent"
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-4 py-2 ${
                  activeTab === "jobs" ? "bg-gray-100" : "bg-transparent"
                }`}
              >
                Jobs
              </button>
            </div>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded w-48 text-sm"
            />

            <button
              onClick={openAddModal}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              Add
            </button>
          </div>
        </header>

        <main>
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : activeTab === "articles" ? (
            <div>
              {filteredArticles.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                  Tidak ada artikel.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredArticles.map((a) => (
                    <div
                      key={getId(a)}
                      className="flex items-center justify-between border rounded p-3 bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 bg-gray-100 flex-shrink-0 overflow-hidden rounded">
                          {a.imageUrl ? (
                            // show resolved src
                            <img
                              src={getImageSrc(a.imageUrl)}
                              alt={a.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{a.title}</div>
                          <div className="text-xs text-gray-600">
                            {a.author} •{" "}
                            {a.publishDate ? a.publishDate.split("T")[0] : "-"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm px-3 py-1 rounded border text-gray-700">
                          {a.status || "-"}
                        </span>
                        <button
                          onClick={() => openEditModal(a)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(a)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => handleDelete(a)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {filteredJobs.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                  Tidak ada lowongan.
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredJobs.map((j) => (
                    <div
                      key={getId(j)}
                      className="flex items-center justify-between border rounded p-3 bg-white"
                    >
                      <div>
                        <div className="font-medium">{j.posisi}</div>
                        <div className="text-xs text-gray-600">
                          {j.lokasi} • Deadline:{" "}
                          {j.deadline ? j.deadline.split("T")[0] : "-"}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm px-3 py-1 rounded border text-gray-700">
                          {j.status || "-"}
                        </span>
                        <button
                          onClick={() => openEditModal(j)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(j)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => handleDelete(j)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white text-black rounded shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">
                {editItem ? "Edit" : "Add"}{" "}
                {activeTab === "articles" ? "Article" : "Job"}
              </h2>
              <button onClick={closeModal} className="text-gray-600 px-2">
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              {activeTab === "articles" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      name="title"
                      value={formState.title || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                    {errors.title && (
                      <div className="text-sm text-red-600 mt-1">
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Body</label>
                    <textarea
                      name="body"
                      value={formState.body || ""}
                      onChange={handleInputChange}
                      rows={6}
                      className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                    {errors.body && (
                      <div className="text-sm text-red-600 mt-1">
                        {errors.body}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Author
                      </label>
                      <input
                        name="author"
                        value={formState.author || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Publish Date
                      </label>
                      <input
                        name="publishDate"
                        type="date"
                        value={formState.publishDate || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1"
                    />
                    {imagePreview && (
                      <div className="mt-2 w-48 h-32 border rounded overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium">Posisi</label>
                    <input
                      name="posisi"
                      value={formState.posisi || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                    {errors.posisi && (
                      <div className="text-sm text-red-600 mt-1">
                        {errors.posisi}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Lokasi
                      </label>
                      <input
                        name="lokasi"
                        value={formState.lokasi || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Deadline
                      </label>
                      <input
                        name="deadline"
                        type="date"
                        value={formState.deadline || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Cara kirim lamaran (email/link)
                    </label>
                    <input
                      name="kirimlamaran"
                      value={formState.kirimlamaran || ""}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                    {errors.kirimlamaran && (
                      <div className="text-sm text-red-600 mt-1">
                        {errors.kirimlamaran}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Persyaratan (satu per baris)
                    </label>
                    <textarea
                      name="persyaratan"
                      value={formState.persyaratan || ""}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Benefit (satu per baris)
                    </label>
                    <textarea
                      name="benefit"
                      value={formState.benefit || ""}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
