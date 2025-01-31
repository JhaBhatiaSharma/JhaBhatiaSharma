const express = require("express");
const {
  createComplaint,
  getComplaints,
  resolveComplaint,
  getMyComplaints,
} = require("../controllers/complaintController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-complaint", authMiddleware, createComplaint); //Create a new complaint
router.get("/get-complaints", authMiddleware, roleMiddleware(["admin"]), getComplaints); //Get all the complaints
router.patch("/:complaintId/resolve", authMiddleware, roleMiddleware(["admin"]), resolveComplaint); //mark a complaint as resolved
router.get("/my-complaints", authMiddleware, getMyComplaints); // Get the complaints of a logged in user

module.exports = router;
