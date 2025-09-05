import React, { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Edit,
  Plus,
  Eye,
  Calendar,
  MapPin,
  Users,
  FileText,
  Briefcase,
  Search,
  X,
} from "lucide-react";

// Constants
const API_BASE_URL = "http://localhost:5001";

// Utility Functions
const formatDate = (dateStr) => {
  if (!dateStr) return "Tanggal tidak valid";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateInput = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
};

// Main Dashboard Component
const AdminDashboard = () => {
  // States
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [articleForm, setArticleForm] = useState({
    title: "",
    author: "",
    intro: "",
    content: "",
    status: "draft",
    publishDate: "",
    image: null,
  });

  const [jobForm, setJobForm] = useState({
    posisi: "",
    lokasi: "",
    status: "aktif",
    deadline: "",
    masaKerja: "",
    gaji: "",
    kirimlamaran: "",
    persyaratan: [""],
    benefit: [""],
  });

  // API Functions
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/articles`);
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/jobs`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteArticle = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete article");
      await fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Yakin ingin menghapus lowongan ini?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");
      await fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const submitArticle = async (isEdit = false) => {
    try {
      const formData = new FormData();
      formData.append("title", articleForm.title);
      formData.append("author", articleForm.author);
      formData.append("intro", articleForm.intro);
      formData.append("body", articleForm.content);
      formData.append("status", articleForm.status);
      formData.append("publishDate", articleForm.publishDate);

      if (articleForm.image) {
        formData.append("image", articleForm.image);
      }

      const url =
        isEdit && selectedItem
          ? `${API_BASE_URL}/api/articles/${selectedItem.id}`
          : `${API_BASE_URL}/api/articles`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save article");

      await fetchArticles();
      setModalType(null);
      resetArticleForm();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const submitJob = async (isEdit = false) => {
    try {
      const url =
        isEdit && selectedItem
          ? `${API_BASE_URL}/api/jobs/${selectedItem.id}`
          : `${API_BASE_URL}/api/jobs`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobForm),
      });

      if (!response.ok) throw new Error("Failed to save job");

      await fetchJobs();
      setModalType(null);
      resetJobForm();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // Form Reset Functions
  const resetArticleForm = () => {
    setArticleForm({
      title: "",
      author: "",
      intro: "",
      content: "",
      status: "draft",
      publishDate: "",
      image: null,
    });
  };

  const resetJobForm = () => {
    setJobForm({
      posisi: "",
      lokasi: "",
      status: "aktif",
      deadline: "",
      masaKerja: "",
      gaji: "",
      kirimlamaran: "",
      persyaratan: [""],
      benefit: [""],
    });
  };

  // Modal Handlers
  const openModal = (type, item) => {
    setModalType(type);
    setSelectedItem(item || null);

    if (type === "edit-article" && item) {
      setArticleForm({
        title: item.title,
        author: item.author,
        intro: item.intro,
        content: item.content,
        status: item.status,
        publishDate: formatDateInput(item.publishDate || item.date),
        image: null,
      });
    } else if (type === "edit-job" && item) {
      setJobForm({
        posisi: item.posisi,
        lokasi: item.lokasi,
        status: item.status,
        deadline: formatDateInput(item.deadline),
        masaKerja: item.masaKerja,
        gaji: item.gaji,
        kirimlamaran: item.kirimlamaran,
        persyaratan:
          item.persyaratan && item.persyaratan.length > 0
            ? item.persyaratan
            : [""],
        benefit: item.benefit && item.benefit.length > 0 ? item.benefit : [""],
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
    resetArticleForm();
    resetJobForm();
  };

  // Array Handlers for Job Form
  const addArrayItem = (field) => {
    setJobForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setJobForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setJobForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Effects
  useEffect(() => {
    if (activeTab === "articles") {
      fetchArticles();
    } else {
      fetchJobs();
    }
  }, [activeTab, fetchArticles, fetchJobs]);

  // Filter Functions
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(
    (job) =>
      job.posisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("articles")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "articles"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="inline w-4 h-4 mr-2" />
              Artikel ({articles.length})
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "jobs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Briefcase className="inline w-4 h-4 mr-2" />
              Lowongan ({jobs.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {activeTab === "articles"
              ? "Manajemen Artikel"
              : "Manajemen Lowongan"}
          </h2>
          <button
            onClick={() =>
              openModal(
                activeTab === "articles" ? "create-article" : "create-job"
              )
            }
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah {activeTab === "articles" ? "Artikel" : "Lowongan"}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Articles Table */}
        {activeTab === "articles" && !loading && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artikel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Penulis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {article.image && (
                          <img
                            src={`${API_BASE_URL}${article.image}`}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {article.intro}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          article.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {article.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(article.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal("view-article", article)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("edit-article", article)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit artikel"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredArticles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada artikel yang ditemukan
              </div>
            )}
          </div>
        )}

        {/* Jobs Table */}
        {activeTab === "jobs" && !loading && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.posisi}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.masaKerja} • {job.gaji}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {job.lokasi}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          job.status === "aktif"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status === "aktif" ? "Aktif" : "Tutup"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {formatDate(job.deadline)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal("view-job", job)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("edit-job", job)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit lowongan"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus lowongan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredJobs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada lowongan yang ditemukan
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {modalType === "create-article" && "Tambah Artikel Baru"}
                {modalType === "edit-article" && "Edit Artikel"}
                {modalType === "view-article" && "Detail Artikel"}
                {modalType === "create-job" && "Tambah Lowongan Baru"}
                {modalType === "edit-job" && "Edit Lowongan"}
                {modalType === "view-job" && "Detail Lowongan"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Article Forms */}
            {(modalType === "create-article" ||
              modalType === "edit-article") && (
              <div
                onSubmit={(e) => {
                  e.preventDefault();
                  submitArticle(modalType === "edit-article");
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={articleForm.title}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Penulis
                    </label>
                    <input
                      type="text"
                      value={articleForm.author}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Intro
                    </label>
                    <textarea
                      value={articleForm.intro}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          intro: e.target.value,
                        }))
                      }
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Konten
                    </label>
                    <textarea
                      value={articleForm.content}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={8}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        value={articleForm.status}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Publish
                      </label>
                      <input
                        type="date"
                        value={articleForm.publishDate}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            publishDate: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gambar
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          image: e.target.files[0],
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => submitArticle(modalType === "edit-article")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {modalType === "edit-article" ? "Update" : "Simpan"}
                  </button>
                </div>
              </div>
            )}

            {/* Job Forms */}
            {(modalType === "create-job" || modalType === "edit-job") && (
              <div
                onSubmit={(e) => {
                  e.preventDefault();
                  submitJob(modalType === "edit-job");
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Posisi
                    </label>
                    <input
                      type="text"
                      value={jobForm.posisi}
                      onChange={(e) =>
                        setJobForm((prev) => ({
                          ...prev,
                          posisi: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Lokasi
                      </label>
                      <input
                        type="text"
                        value={jobForm.lokasi}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            lokasi: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        value={jobForm.status}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="aktif">Aktif</option>
                        <option value="tutup">Tutup</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={jobForm.deadline}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            deadline: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Masa Kerja
                      </label>
                      <input
                        type="text"
                        value={jobForm.masaKerja}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            masaKerja: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Contoh: Full Time"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gaji
                    </label>
                    <input
                      type="text"
                      value={jobForm.gaji}
                      onChange={(e) =>
                        setJobForm((prev) => ({
                          ...prev,
                          gaji: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: 5-8 juta"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kirim Lamaran
                    </label>
                    <textarea
                      value={jobForm.kirimlamaran}
                      onChange={(e) =>
                        setJobForm((prev) => ({
                          ...prev,
                          kirimlamaran: e.target.value,
                        }))
                      }
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Instruksi cara mengirim lamaran"
                      required
                    />
                  </div>

                  {/* Persyaratan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Persyaratan
                    </label>
                    {jobForm.persyaratan.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            updateArrayItem(
                              "persyaratan",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Persyaratan ${index + 1}`}
                        />
                        {jobForm.persyaratan.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("persyaratan", index)
                            }
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("persyaratan")}
                      className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Tambah Persyaratan
                    </button>
                  </div>

                  {/* Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefit & Fasilitas
                    </label>
                    {jobForm.benefit.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            updateArrayItem("benefit", index, e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Benefit ${index + 1}`}
                        />
                        {jobForm.benefit.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem("benefit", index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("benefit")}
                      className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Tambah Benefit
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => submitJob(modalType === "edit-job")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {modalType === "edit-job" ? "Update" : "Simpan"}
                  </button>
                </div>
              </div>
            )}

            {/* View Article Modal */}
            {modalType === "view-article" && selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Judul:
                    </span>
                    <p className="text-gray-900">{selectedItem.title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Penulis:
                    </span>
                    <p className="text-gray-900">{selectedItem.author}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedItem.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedItem.status === "published"
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Tanggal:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(selectedItem.date)}
                    </p>
                  </div>
                </div>
                {selectedItem.image && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Gambar:
                    </span>
                    <img
                      src={`${API_BASE_URL}${selectedItem.image}`}
                      alt={selectedItem.title}
                      className="mt-2 w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Intro:
                  </span>
                  <p className="text-gray-900 mt-1">{selectedItem.intro}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Konten:
                  </span>
                  <div className="text-gray-900 mt-1 whitespace-pre-wrap max-h-64 overflow-y-auto border border-gray-200 rounded-md p-3">
                    {selectedItem.content}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {/* View Job Modal */}
            {modalType === "view-job" && selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Posisi:
                    </span>
                    <p className="text-gray-900 font-semibold">
                      {selectedItem.posisi}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Lokasi:
                    </span>
                    <p className="text-gray-900">{selectedItem.lokasi}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedItem.status === "aktif"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedItem.status === "aktif" ? "Aktif" : "Tutup"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Deadline:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(selectedItem.deadline)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Masa Kerja:
                    </span>
                    <p className="text-gray-900">{selectedItem.masaKerja}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Gaji:
                    </span>
                    <p className="text-gray-900">{selectedItem.gaji}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Kirim Lamaran:
                  </span>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                    {selectedItem.kirimlamaran}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Persyaratan:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {selectedItem.persyaratan &&
                      selectedItem.persyaratan.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-900">{req}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Benefit & Fasilitas:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {selectedItem.benefit &&
                      selectedItem.benefit.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-900">{benefit}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
