// scripts/migrate.js
const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("../models/Student");
const Internship = require("../models/Internship");

const migrateDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Update Internships
    const internshipUpdateResult = await Internship.updateMany(
      { requiredSkills: { $exists: false } },
      {
        $set: {
          requiredSkills: [],
          preferredSkills: [],
          experienceLevel: "beginner",
          status: "open",
        },
      }
    );
    console.log(`Updated ${internshipUpdateResult.modifiedCount} internships`);

    // Update Students
    const students = await Student.find({});
    let updatedStudents = 0;

    for (const student of students) {
      // Convert old skills array to new format
      if (Array.isArray(student.profile.skills)) {
        const newSkills = student.profile.skills.map((skill) => ({
          name: skill,
          proficiency: "beginner",
          yearsOfExperience: 0,
        }));

        // Update the student document
        await Student.findByIdAndUpdate(student._id, {
          $set: {
            "profile.skills": newSkills,
            recommendationPreferences: {
              remote: false,
              minStipend: 0,
              preferredDuration: 3,
              interestedIndustries: [],
            },
          },
        });
        updatedStudents++;
      }
    }
    console.log(`Updated ${updatedStudents} student profiles`);

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run migration
migrateDatabase();
