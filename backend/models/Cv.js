const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    template: {
      type: String,
      enum: ["professional", "creative", "academic"], // Add your templates here
      required: true,
    },
    data: {
      type: Object, // Contains the CV data like personalInfo, education, experience, etc.
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
