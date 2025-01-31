const UsageLog = require("../models/UsageLog");
const User = require("../models/User");
const PDFDocument = require("pdfkit");
// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
const fs = require("fs");

// Get usage statistics for admin 
exports.getUsageStatistics = async (req, res) => {
  try {
    const totalRequests = await UsageLog.countDocuments();
    const requestsByEndpoint = await UsageLog.aggregate([
      { $group: { _id: "$endpoint", count: { $sum: 1 } } },
    ]);
    res.status(200).json({ totalRequests, requestsByEndpoint });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Failed to fetch usage statistics." });
  }
};

// Get user analytics from admin
exports.getUserAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsersLast24Hours = await UsageLog.distinct("userId", {
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    res.status(200).json({
      totalUsers,
      activeUsers: activeUsersLast24Hours.length,
      userGrowth: await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
      ]),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Failed to fetch user analytics." });
  }
};

// Generating pdf fuction
exports.generateReportPDF = async (type) => {
  const doc = new PDFDocument();
  const buffers = [];

  doc.on("data", (chunk) => buffers.push(chunk));
  doc.on("end", () => console.log("PDF generated successfully"));

  
  switch (type) {
    case "usage-statistics":
      doc.text("Usage Statistics Report\n\n");
      doc.text("Total Requests: 500");
      doc.text("Endpoint Usage:\n - /api/login: 200\n - /api/register: 150");
      break;
    case "user-analytics":
      doc.text("User Analytics Report\n\n");
      doc.text("Total Users: 1000");
      doc.text("Active Users (Last 24 Hours): 120");
      break;
    default:
      doc.text("Invalid Report Type");
  }

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);
  });
};
