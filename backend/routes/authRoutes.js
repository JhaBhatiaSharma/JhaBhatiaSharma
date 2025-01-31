const express = require("express");
// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
const { registerStudent, loginStudent } = require("../controllers/studentController");
const { registerRecruiter, loginRecruiter } = require("../controllers/recruiterController");

const { registerAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();


// Student Authentication Routes
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);

// Recruiter Authentication Routes
router.post("/company/register", registerRecruiter);
router.post("/company/login", loginRecruiter);

// Admin Authentication Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

module.exports = router;
