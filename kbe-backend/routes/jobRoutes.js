// routes/jobRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Route untuk collection: /api/jobs
router.route("/").get(getAllJobs).post(createJob);

// Route untuk item spesifik: /api/jobs/:id
// INI BAGIAN YANG MEMPERBAIKI ERROR 404
router
  .route("/:id")
  .get(getJobById) // getJobById sudah ada sebelumnya, kita masukkan di sini
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;
