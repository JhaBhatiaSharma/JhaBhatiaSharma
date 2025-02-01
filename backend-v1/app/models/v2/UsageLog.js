const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UsageLog', usageLogSchema);
