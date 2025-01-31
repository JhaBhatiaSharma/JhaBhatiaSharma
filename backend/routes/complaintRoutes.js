const express = require("express");
const {
  createComplaint,
  getComplaints,
  resolveComplaint,
  getMyComplaints,
} = require("../controllers/complaintController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-complaint", authMiddleware, createComplaint);
router.get("/get-complaints", authMiddleware, roleMiddleware(["admin"]), getComplaints);
router.patch("/:complaintId/resolve", authMiddleware, roleMiddleware(["admin"]), resolveComplaint);
router.get("/my-complaints", authMiddleware, getMyComplaints);

module.exports = router;
