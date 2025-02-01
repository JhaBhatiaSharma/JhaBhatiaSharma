// utils/initializeConfigurations.js
const Configuration = require("../../models/v2/Configuration");

const defaultConfigurations = [
  { type: "notificationSettings", value: "Email, SMS" },
  { type: "userPermissions", value: "Admin, Recruiter" },
  { type: "systemAlerts", value: "Critical, Non-critical" },
];

const initializeConfigurations = async () => {
  try {
    for (const config of defaultConfigurations) {
      await Configuration.updateOne(
        { type: config.type },
        { $setOnInsert: config },
        { upsert: true }
      );
    }
    console.log("Default configurations initialized.");
  } catch (error) {
    console.error("Error initializing configurations:", error.message);
  }
};

module.exports = initializeConfigurations;
