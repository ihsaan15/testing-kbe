// controllers/articleController.js
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

// @desc    Get all articles
// @route   GET /api/articles
const getArticles = async (req, res) => {
  try {
    // Kueri untuk mengambil artikel yang sudah di-publish saja
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE status = 'published' ORDER BY publishDate DESC"
    );
    const articles = rows.map((article) => ({
      id: article.id,
      title: article.title,
      author: article.author,
      date: article.publishDate, // Mengubah publishDate menjadi date
      intro: article.intro,
      image: article.imageUrl, // Mengubah imageUrl menjadi image
      content: article.body, // Mengubah body menjadi content
    }));

    res.status(200).json(articles); // Kirim data yang sudah diubah
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new article
// @route   POST /api/articles
const createArticle = async (req, res) => {
  try {
    const { title, intro, body, author, status, publishDate } = req.body;
    // Ambil path file jika ada gambar yang di-upload oleh multer
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      "INSERT INTO articles (title, intro, body, author, status, publishDate, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, intro, body, author, status, publishDate, imageUrl]
    );

    // Ambil artikel yang baru dibuat untuk dikirim kembali sebagai respons
    const [newArticle] = await pool.query(
      "SELECT * FROM articles WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(newArticle[0]);
  } catch (error) {
    console.error("Create Article Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, intro, body, author, status, publishDate } = req.body;

    // Dapatkan path gambar lama dari database
    const [existingArticleRows] = await pool.query(
      "SELECT imageUrl FROM articles WHERE id = ?",
      [id]
    );
    if (existingArticleRows.length === 0) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    let imageUrl = existingArticleRows[0].imageUrl;

    // Jika ada file gambar baru yang di-upload
    if (req.file) {
      // Hapus gambar lama dari server jika ada
      if (imageUrl) {
        const oldImagePath = path.join(__dirname, "..", "public", imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Gunakan path gambar yang baru
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await pool.query(
      "UPDATE articles SET title = ?, intro = ?, body = ?, author = ?, status = ?, publishDate = ?, imageUrl = ? WHERE id = ?",
      [title, intro, body, author, status, publishDate, imageUrl, id]
    );

    // Ambil data artikel yang sudah di-update untuk dikirim kembali
    const [updatedArticle] = await pool.query(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );
    res.status(200).json(updatedArticle[0]);
  } catch (error) {
    console.error("Update Article Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    // Dapatkan path gambar dari database sebelum menghapus record
    const [articleRows] = await pool.query(
      "SELECT imageUrl FROM articles WHERE id = ?",
      [id]
    );

    // Hapus record dari database
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    // Jika artikel ada dan punya gambar, hapus file gambarnya
    if (articleRows.length > 0 && articleRows[0].imageUrl) {
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        articleRows[0].imageUrl
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error("Delete Article Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Pastikan SEMUA fungsi diekspor
module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
