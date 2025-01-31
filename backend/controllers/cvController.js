const CV = require("../models/Cv");

// Create or update the CV of a student
exports.createOrUpdateCV = async (req, res) => {
  try {
    const { template, data, visibility } = req.body;

    let cv = await CV.findOne({ user: req.user.id });

    if (cv) {
      cv.template = template;
      cv.data = data;
      cv.visibility = visibility || [];
      await cv.save();
      return res.status(200).json({ message: "CV updated successfully", cv });
    }

    cv = new CV({
      user: req.user.id,
      template,
      data,
      visibility: visibility || [], 
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

// Change visibility of the CV for different companies
exports.updateVisibility = async (req, res) => {
  try {
    const { cvId, companyIds } = req.body;
    const updatedCV = await CV.findByIdAndUpdate(cvId, { visibility: companyIds }, { new: true });
    res.status(200).json(updatedCV);
  } catch (error) {
    void error;
    res.status(500).json({ error: "Failed to update CV visibility." });
  }
};
