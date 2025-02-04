const express = require("express");
const {
  addInternship,
  getAllInternships,
  getInternshipById,
  applyToInternship,
  getRecruiterInternships,
  getStudentInternships,
  getApplicantsForRecruiter,
  scheduleInterview,
  getRecommendedInternships,
  markInterviewAsCompleted,
} = require("../controllers/internshipController");

const {
  getStudentInterviews,
  getStudentCompletedInterviews,
} = require("../controllers/studentController");
const { getRecruiterInterviews } = require("../controllers/recruiterController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Base routes - No param collisions
router.get("/allinternships", getAllInternships);
router.post("/addinternship", authMiddleware, roleMiddleware(["recruiter"]), addInternship);

// Recommendation routes
router.get("/recommended", authMiddleware, roleMiddleware(["student"]), getRecommendedInternships);

// Student specific routes
router.get("/my-internships", authMiddleware, roleMiddleware(["student"]), getStudentInternships);
router.get(
  "/student/interviews",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentInterviews
);

// Recruiter specific routes
router.get(
  "/recruiter/list",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  getRecruiterInternships
);
router.get(
  "/recruiter/interviews",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  getRecruiterInterviews
);
router.get("/applicants", authMiddleware, roleMiddleware(["recruiter"]), getApplicantsForRecruiter);

// Application routes
router.post("/:id/apply", authMiddleware, roleMiddleware(["student"]), applyToInternship);
router.post("/:id/schedule", authMiddleware, roleMiddleware(["recruiter"]), scheduleInterview);

router.get("/:id([a-fA-F0-9]{24})", getInternshipById);

router.patch("/:internshipId/interviews/:studentId/completed", markInterviewAsCompleted);
router.get(
  "/student/completed-interviews",
  authMiddleware, // Ensure the student is authenticated
  getStudentCompletedInterviews
);

module.exports = router;
