const express = require("express");
const { getConfigurations, updateConfiguration } = require("../../controllers/v2/configurationController");

const router = express.Router();

router.get("/", getConfigurations);
router.put("/:type", updateConfiguration);

module.exports = router;