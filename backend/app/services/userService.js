const { Student, Recruiter } = require("../models/index");

const findStudentByEmail = async (email) => {
  return Student.findOne({ where: { email } });
};

const findRecruiterByEmail = async (email) => {
  return Recruiter.findOne({ where: { email } });
};

const registerStudent = async ({ firstName, lastName, email, mobileNumber, dateOfBirth, gender, profilePicture, linkedinProfile, githubProfile }) => {
  const existingStudent = await findStudentByEmail(email);
  
  if (existingStudent) {
    throw new Error('User with this email already exists');
  }

  const newStudent = await Student.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    dateOfBirth,
    gender,
    profilePicture,
    linkedinProfile,
    githubProfile,
  });

  return newStudent;
};

const registerRecruiter = async ({ companyName, email, companyLogo, linkedinProfile }) => {
  const existingRecruiter = await findRecruiterByEmail(email);
  
  if (existingRecruiter) {
    throw new Error('User with this email already exists');
  }

  const newRecruiter = await Recruiter.create({
    companyName,
    email,
    companyLogo,
    linkedinProfile,
  });

  return newRecruiter;
};

const findStudent = async (email) => {
  try {
    const existingStudent = await findStudentByEmail(email);
    return existingStudent;
  } catch (error) {
    console.error('Error in findStudentByEmail:', error);
    throw error;
  }
};

const findRecruiter = async (email) => {
  try {
    const existingRecruiter = await findRecruiterByEmail(email);
    return existingRecruiter;
  } catch (error) {
    console.error('Error in findRecruiterByEmail:', error);
    throw error;
  }
};

module.exports = { registerStudent, registerRecruiter, findStudent, findRecruiter };