const express = require("express");
const { authMiddleware } = require("../../middlewares/v2/authMiddleware");
const { createOrUpdateCV, getCV, deleteCV, updateVisibility } = require("../../controllers/v2/cvController");
const CV = require('../../models/v2/Cv');

const router = express.Router();

router.post("/", authMiddleware, createOrUpdateCV);
router.get("/latest", authMiddleware, getCV);
router.get("/", authMiddleware, getCV);
router.delete("/", authMiddleware, deleteCV);
router.post("/update-visibility", authMiddleware, updateVisibility)
router.get('/:studentId', authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;
    const cv = await CV.findOne({ user: studentId });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.status(200).json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;