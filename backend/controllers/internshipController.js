const Internship = require('../models/Internship');
const Student=require('../models/Student')

exports.addInternship = async (req, res) => {
  try {
    const internship = new Internship({ ...req.body, recruiter: req.user.id });
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate('recruiter', 'firstName lastName email');
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.applyToInternship = async (req, res) => {
//   try {
//     const internship = await Internship.findById(req.params.id);
//     if (!internship) {
//       return res.status(404).json({ message: 'Internship not found' });
//     }

//     internship.applicants = internship.applicants || [];
//     internship.applicants.push(req.user.id);
//     await internship.save();

//     res.json({ message: 'Application submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.applyToInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Check if the user has already applied
    if (internship.applicants.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already applied for this internship' });
    }

    // Add the user to the internship's applicants list
    internship.applicants.push(req.user.id);
    await internship.save();

    // Optionally update the student's profile
    const student = await Student.findById(req.user.id);
    if (student) {
      student.appliedInternships = student.appliedInternships || [];
      student.appliedInternships.push(internship._id);
      await student.save();
    }

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error in applyToInternship:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.getRecruiterInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ recruiter: req.user.id }).populate('applicants', 'firstName lastName email');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getStudentInternships = async (req, res) => {
  try {
    // Find the logged-in student and populate applied internships
    const student = await Student.findById(req.user.id).populate({
      path: 'appliedInternships',
      populate: { path: 'recruiter', select: 'firstName lastName email' }, // Populate recruiter details if needed
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.appliedInternships);
  } catch (error) {
    console.error('Error fetching student internships:', error);
    res.status(500).json({ message: error.message });
  }
};



// Fetch applicants for recruiter's internships
exports.getApplicantsForRecruiter = async (req, res) => {
  try {
    console.log('Recruiter ID from req.user:', req.user.id);

    const internships = await Internship.find({ recruiter: req.user.id }).populate({
      path: 'applicants',
      select: 'firstName lastName email profile.skills profile.experience',
    });

    console.log('Internships:', internships);

    const applicants = internships.flatMap((internship) =>
      internship.applicants.map((applicant) => ({
        internshipTitle: internship.title,
        applicantId: applicant._id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        skills: applicant.profile.skills,
        experience: applicant.profile.experience,
      }))
    );

    console.log('Applicants:', applicants);

    res.status(200).json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Failed to fetch applicants' });
  }
};
