const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createOrUpdateCV,
  getCV,
  deleteCV,
} = require("../controllers/cvController");

// Route to create or update a CV
router.post("/cv", authMiddleware, createOrUpdateCV);

// Route to fetch the CV of a logged-in user
router.get("/cv", authMiddleware, getCV);

// Route to delete a CV
router.delete("/cv", authMiddleware, deleteCV);

module.exports = router;
