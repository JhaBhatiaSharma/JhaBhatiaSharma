const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createOrUpdateCV,
  getCV,
  deleteCV,
  updateVisibility,
} = require("../controllers/cvController");
const CV = require("../models/Cv");

//create or update a CV
router.post("/", authMiddleware, createOrUpdateCV);

//fetch the latest CV
router.get("/latest", authMiddleware, getCV); // Added this route

//fetch the CV of a logged-in user
router.get("/", authMiddleware, getCV);

//delete a CV
router.delete("/", authMiddleware, deleteCV);

router.post("/update-visibility", authMiddleware, updateVisibility); // change the visibility of the cv for different companies

// Get the cv for a particular student
router.get("/:studentId", authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;
    const cv = await CV.findOne({ user: studentId });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.status(200).json(cv);
  } catch (error) {
    console.error("Error fetching CV:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
