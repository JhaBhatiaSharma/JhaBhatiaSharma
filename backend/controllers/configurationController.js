// controllers/configurationController.js
const Configuration = require("../models/Configuration");

// Get all configurations
exports.getConfigurations = async (req, res) => {
  try {
    const configurations = await Configuration.find({});
    const formattedConfigs = configurations.reduce((acc, config) => {
      acc[config.type] = config.value;
      return acc;
    }, {});
    res.status(200).json(formattedConfigs);
  } catch (error) {
    console.error("Error fetching configurations:", error.message);
    res.status(500).json({ message: "Failed to fetch configurations." });
  }
};

// Update a specific configuration
exports.updateConfiguration = async (req, res) => {
  const { type } = req.params;
  const { value } = req.body;

  try {
    const config = await Configuration.findOneAndUpdate(
      { type },
      { value },
      { new: true, upsert: true } // Create if not exists
    );
    res.status(200).json({ success: true, configuration: config });
  } catch (error) {
    console.error("Error updating configuration:", error.message);
    res.status(500).json({ message: "Failed to update configuration." });
  }
};
