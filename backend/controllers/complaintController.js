const Complaint = require("../models/Complaint");

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    const complaint = await Complaint.create({ userId, role, title, description });
    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: "pending" }).populate(
      "userId",
      "firstName lastName role"
    );
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change status to resolved
exports.resolveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: "resolved" },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get complaints specific to a user
exports.getMyComplaints = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const complaints = await Complaint.find({ userId });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
