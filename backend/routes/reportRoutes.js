// routes/api.js
const express = require("express");
const reportController = require("../controllers/reportController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Reports APIs
router.get(
  "/usage-statistics",
  authMiddleware,
  roleMiddleware(["admin"]),
  reportController.getUsageStatistics
);
router.get(
  "/user-analytics",
  authMiddleware,
  roleMiddleware(["admin"]),
  reportController.getUserAnalytics
);


router.get("/download", async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ message: "Report type is required" });
  }

  try {

    const reportBuffer = await reportController.generateReportPDF(type);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${type}-report-${Date.now()}.pdf`);

    return res.send(reportBuffer);
  } catch (error) {
    console.error("Error generating report:", error.message);
    return res.status(500).json({ message: "Error generating report" });
  }
});

module.exports = router;
