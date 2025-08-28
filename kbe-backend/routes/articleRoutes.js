// routes/articleRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

// Konfigurasi Multer untuk penyimpanan file (pastikan ini ada)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan path ke folder public/uploads benar dari root proyek
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route untuk collection: /api/articles
router.route("/").get(getArticles).post(upload.single("image"), createArticle);

// Route untuk item spesifik: /api/articles/:id
// INI BAGIAN YANG MEMPERBAIKI ERROR 404
router
  .route("/:id")
  .put(upload.single("image"), updateArticle)
  .delete(deleteArticle);

module.exports = router;
