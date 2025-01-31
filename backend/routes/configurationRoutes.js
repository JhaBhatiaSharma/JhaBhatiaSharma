const express = require("express");
const router = express.Router();
const {
  getConfigurations,
  updateConfiguration,
} = require("../controllers/configurationController");

// Get all configurations
router.get("/", getConfigurations);

// Update a specific configuration
router.put("/:type", updateConfiguration);

module.exports = router;
