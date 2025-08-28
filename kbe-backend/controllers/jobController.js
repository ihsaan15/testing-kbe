// controllers/jobController.js
const pool = require("../config/db");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res) => {
  try {
    // Ambil data dari database, urutkan berdasarkan yang terbaru (createdAt DESC)
    const [rows] = await pool.query(
      "SELECT * FROM jobs ORDER BY createdAt DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM jobs WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Lowongan tidak ditemukan" });
    }

    const job = rows[0];

    // Konversi string JSON dari database menjadi array
    // agar frontend bisa langsung menggunakannya
    job.persyaratan = job.persyaratan ? JSON.parse(job.persyaratan) : [];
    job.benefit = job.benefit ? JSON.parse(job.benefit) : [];

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new job
const createJob = async (req, res) => {
  try {
    let {
      posisi,
      lokasi,
      status,
      deadline,
      masaKerja,
      gaji,
      kirimlamaran,
      persyaratan,
      benefit,
    } = req.body;

    // Konversi array persyaratan dan benefit menjadi string JSON
    const persyaratanJSON = JSON.stringify(persyaratan || []);
    const benefitJSON = JSON.stringify(benefit || []);

    const [result] = await pool.query(
      "INSERT INTO jobs (posisi, lokasi, status, deadline, masaKerja, gaji, kirimlamaran, persyaratan, benefit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        posisi,
        lokasi,
        status,
        deadline,
        masaKerja,
        gaji,
        kirimlamaran,
        persyaratanJSON,
        benefitJSON,
      ]
    );
    const [newJob] = await pool.query("SELECT * FROM jobs WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(newJob[0]);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM jobs WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lowongan tidak ditemukan" });
    }

    res.status(200).json({ message: "Lowongan berhasil dihapus" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      posisi,
      lokasi,
      status,
      deadline,
      masaKerja,
      gaji,
      kirimlamaran,
      persyaratan,
      benefit,
    } = req.body;

    // Konversi array persyaratan dan benefit menjadi string JSON
    const persyaratanJSON = JSON.stringify(persyaratan || []);
    const benefitJSON = JSON.stringify(benefit || []);

    await pool.query(
      "UPDATE jobs SET posisi = ?, lokasi = ?, status = ?, deadline = ?, masaKerja = ?, gaji = ?, kirimlamaran = ?, persyaratan = ?, benefit = ? WHERE id = ?",
      [
        posisi,
        lokasi,
        status,
        deadline,
        masaKerja,
        gaji,
        kirimlamaran,
        persyaratanJSON,
        benefitJSON,
        id,
      ]
    );
    const [updatedJob] = await pool.query("SELECT * FROM jobs WHERE id = ?", [
      id,
    ]);
    if (updatedJob.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob[0]);
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  getJobById,
  deleteJob,
};
