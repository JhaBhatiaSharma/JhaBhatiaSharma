const CV = require("../models/Cv");

// Create or update a CV
exports.createOrUpdateCV = async (req, res) => {
  try {
    const { template, data } = req.body;

    // Check if the user already has a CV
    let cv = await CV.findOne({ user: req.user.id });

    if (cv) {
      // Update the existing CV
      cv.template = template;
      cv.data = data;
      await cv.save();
      return res.status(200).json({ message: "CV updated successfully", cv });
    }

    // Create a new CV
    cv = new CV({
      user: req.user.id,
      template,
      data,
    });
    await cv.save();
    res.status(201).json({ message: "CV created successfully", cv });
  } catch (error) {
    console.error("Error creating/updating CV:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the logged-in user's CV
exports.getCV = async (req, res) => {
  try {
    const cv = await CV.findOne({ user: req.user.id });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.status(200).json(cv);
  } catch (error) {
    console.error("Error fetching CV:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a CV
exports.deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ user: req.user.id });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error("Error deleting CV:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};