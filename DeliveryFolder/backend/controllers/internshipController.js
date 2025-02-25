const Internship = require("../models/Internship");
const Student = require("../models/Student");
const CV = require("../models/Cv");
const { google } = require("googleapis");

// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars

// Skill matching of role and student
const calculateSkillMatch = (cvSkills, internshipSkills) => {
  if (!cvSkills || !internshipSkills) return 0;

  const normalizedCvSkills = cvSkills.map((skill) => skill.toLowerCase());
  const normalizedInternshipSkills = internshipSkills.map((skill) => skill.toLowerCase());

  const matchingSkills = normalizedCvSkills.filter((skill) =>
    normalizedInternshipSkills.includes(skill)
  );

  return {
    score: matchingSkills.length / internshipSkills.length,
    matchingSkills,
  };
};

// Experience matching of user and role
const calculateExperienceMatch = (studentExperience) => {
  if (!studentExperience || studentExperience.length === 0) return 0;

  const totalMonths = studentExperience.reduce((total, exp) => {
    return total + (exp.duration || 0);
  }, 0);

  return Math.min(totalMonths / 24, 1);
};

// Location preference calculation
const calculateLocationPreference = (studentLocation, internshipLocation) => {
  if (!studentLocation || !internshipLocation) return 1; // Default score if locations not specified
  return studentLocation.toLowerCase() === internshipLocation.toLowerCase() ? 1 : 0;
};

// Get the recommended internships of a student after getting the scores
exports.getRecommendedInternships = async (req, res) => {
  try {
    // Get user's CV and student profile
    const [userCV, studentProfile] = await Promise.all([
      CV.findOne({ user: req.user.id }).sort({ createdAt: -1 }).lean(),
      Student.findById(req.user.id).lean(),
    ]);

    if (!userCV) {
      return res.status(404).json({
        success: false,
        message: "Please create a CV first to get personalized recommendations",
      });
    }

    const userSkills = userCV.data.skills || [];
    const studentExperience = studentProfile?.profile?.experience || [];
    const preferredLocation = studentProfile?.profile?.university;

    const internships = await Internship.find({
      applicants: { $ne: req.user.id },
    })
      .populate("recruiter", "companyName")
      .lean();

    // Calculate match scores and add recommendations
    const recommendedInternships = internships.map((internship) => {
      const skillMatch = calculateSkillMatch(userSkills, internship.requiredSkills || []);
      const experienceScore = calculateExperienceMatch(studentExperience);
      const locationScore = calculateLocationPreference(preferredLocation, internship.location);

      // Calculate weighted score (skills: 50%, experience: 30%, location: 20%)
      const totalScore = skillMatch.score * 0.5 + experienceScore * 0.3 + locationScore * 0.2;

      return {
        ...internship,
        matchScore: totalScore * 100, // Convert to percentage
        matchingSkills: skillMatch.matchingSkills,
        recommendationReason: `${
          skillMatch.matchingSkills.length > 0
            ? `Matches ${skillMatch.matchingSkills.length} of your skills: ${skillMatch.matchingSkills.join(", ")}. `
            : ""
        }${experienceScore > 0 ? `Your experience level is suitable. ` : ""}${
          locationScore > 0 ? `Location matches your preference.` : ""
        }`,
      };
    });

    // Sort by match score and return top matches
    const sortedRecommendations = recommendedInternships
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10); // Get top 10 matches

    res.json({
      success: true,
      recommendations: sortedRecommendations,
    });
  } catch (error) {
    console.error("Error in getRecommendedInternships:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations",
      error: error.message,
    });
  }
};

// Post a new internship by recruiter
exports.addInternship = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      duration,
      stipend,
      requiredSkills,
      preferredSkills,
      experienceLevel,
      applicationDeadline,
    } = req.body;

    const internship = new Internship({
      title,
      description,
      location,
      duration: parseInt(duration),
      stipend: parseFloat(stipend),
      requiredSkills: requiredSkills || [],
      preferredSkills: preferredSkills || [],
      experienceLevel: experienceLevel || "beginner",
      applicationDeadline: applicationDeadline || null,
      recruiter: req.user.id,
      status: "open",
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    console.error("Error adding internship:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all the internships posted by all the recruiters
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the internship based on its _id attribute
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate(
      "recruiter",
      "firstName lastName email"
    );
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply to a specific internship taking the id as params
exports.applyToInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // Check if the user has already applied
    if (internship.applicants.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already applied for this internship" });
    }

    internship.applicants.push(req.user.id);
    await internship.save();

    const student = await Student.findById(req.user.id);
    if (student) {
      student.appliedInternships = student.appliedInternships || [];
      student.appliedInternships.push(internship._id);
      await student.save();
    }

    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error in applyToInternship:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get the internships posted by a specific recruiter
exports.getRecruiterInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ recruiter: req.user.id }).populate(
      "applicants",
      "firstName lastName email"
    );
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the internships applied for by a student
exports.getStudentInternships = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate({
      path: "appliedInternships",
      populate: { path: "recruiter", select: "firstName lastName email" },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student.appliedInternships);
  } catch (error) {
    console.error("Error fetching student internships:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch applicants for recruiter's internships
exports.getApplicantsForRecruiter = async (req, res) => {
  try {
    console.log("Recruiter ID from req.user:", req.user.id);

    const internships = await Internship.find({ recruiter: req.user.id }).populate({
      path: "applicants",
      select: "firstName lastName email profile.skills profile.experience",
    });

    console.log("Internships:", internships);

    const applicants = internships.flatMap((internship) =>
      internship.applicants.map((applicant) => ({
        internshipId: internship._id,
        internshipTitle: internship.title,
        applicantId: applicant._id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        skills: applicant.profile.skills,
        experience: applicant.profile.experience,
      }))
    );

    console.log("Applicants:", applicants);

    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

const calendar = google.calendar("v3");
const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials/studenc-9f5932ef024b.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

// Schedule interview for a student
exports.scheduleInterview = async (req, res) => {
  try {
    const { id: internshipId } = req.params;
    const { applicantId, scheduleDate } = req.body;

    if (!applicantId || !scheduleDate) {
      return res.status(400).json({ message: "Applicant ID and schedule date are required" });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const student = await Student.findById(applicantId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Generate Google Meet Link
    const authClient = await auth.getClient();
    const event = {
      summary: `Interview for Internship: ${internship.title}`,
      description: `Interview scheduled for ${student.profile.name}`,
      start: {
        dateTime: new Date(scheduleDate).toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(new Date(scheduleDate).getTime() + 3600000).toISOString(), // 1-hour duration
        timeZone: "UTC",
      },
      conferenceData: {
        createRequest: { requestId: `${internshipId}-${applicantId}` },
      },
    };

    const calendarResponse = await calendar.events.insert({
      auth: authClient,
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    const meetLink = calendarResponse.data.htmlLink;

    // Save Interview Details
    internship.scheduledInterviews = internship.scheduledInterviews || [];
    console.log;
    internship.scheduledInterviews.push({
      student: applicantId,
      dateTime: scheduleDate,
      meetLink,
    });
    await internship.save();

    student.scheduledInterviews = student.scheduledInterviews || [];
    student.scheduledInterviews.push({
      internship: internshipId,
      dateTime: scheduleDate,
      meetLink,
    });
    await student.save();

    res.status(200).json({ message: "Interview scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Failed to schedule interview" });
  }
};

// Chnage status of interview to completed if it is done
exports.markInterviewAsCompleted = async (req, res) => {
  try {
    const { internshipId, studentId } = req.params;

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const interview = internship.scheduledInterviews.find(
      (interview) => interview.student.toString() === studentId
    );

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    interview.status = "Completed";
    await internship.save();

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentInterview = student.scheduledInterviews.find(
      (interview) => interview.internship.toString() === internshipId
    );

    if (studentInterview) {
      studentInterview.status = "Completed";
      await student.save();
    }

    res.status(200).json({ message: "Interview marked as completed successfully" });
  } catch (error) {
    console.error("Error marking interview as completed:", error);
    res.status(500).json({ message: "Failed to mark interview as completed" });
  }
};
