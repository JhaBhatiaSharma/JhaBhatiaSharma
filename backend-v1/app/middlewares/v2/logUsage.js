const UsageLog = require('../../models/v2/UsageLog');

const logUsage = async (req, res, next) => {
  try {
    await UsageLog.create({
      endpoint: req.originalUrl,
      method: req.method,
      userId: req.user?.id || null,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error('Error logging usage:', err.message);
  }
  next();
};

module.exports = logUsage;
