const express = require("express");
const {
  resetPassword,
} = require("../controllers/userController");
const { getAllRecruiters } = require("../controllers/recruiterController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

 
router.post("/reset-password", authMiddleware, resetPassword); //reset the pasword
router.get("/get-all-recruiters", authMiddleware, getAllRecruiters); //get all the recruiters
module.exports = router;
