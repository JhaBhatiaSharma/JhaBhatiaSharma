// models/Configuration.js
const mongoose = require("mongoose");

const ConfigurationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ["notificationSettings", "userPermissions", "systemAlerts"], // Add more types as needed
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Configuration", ConfigurationSchema);
