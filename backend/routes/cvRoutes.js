const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createOrUpdateCV,
  getCV,
  deleteCV,
  updateVisibility
} = require("../controllers/cvController");

// Route to create or update a CV
router.post("/", authMiddleware, createOrUpdateCV);  // Changed from "/cv"

// Route to fetch the latest CV
router.get("/latest", authMiddleware, getCV);  // Added this route

// Route to fetch the CV of a logged-in user
router.get("/", authMiddleware, getCV);

// Route to delete a CV
router.delete("/", authMiddleware, deleteCV);

router.post("/update-visibility", authMiddleware, updateVisibility)

module.exports = router;