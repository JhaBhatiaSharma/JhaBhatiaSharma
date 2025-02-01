const { Student } = require('../../models/v1/index');
const { encrypt , decrypt } = require('../../utils/v1/encryptDecrypt'); 

const findStudentByEmail = async (email) => {
  return Student.findOne({ where: { email } });
};

const registerStudent = async ({ firstName, lastName, email, mobileNumber, password }) => {

  const existingStudent = await findStudentByEmail(email);
  if (existingStudent) {
    throw new Error('User with this email already exists');
  }

  passwordEncrypt = await encrypt(password);
  const newStudent = await Student.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password: passwordEncrypt
  });

  return newStudent;
};

const loginStudent = async ({ email, password }) => {

    const existingStudent = await findStudentByEmail(email);
    if (!existingStudent) {
      throw new Error('User with this email does not exist');
    }

    const passwordMatch = await decrypt(password, existingStudent.password);
    if(passwordMatch) {
        return existingStudent;
    }
    return null;
};

const getStudent = async (email) => {
  const user = await findStudentByEmail(email);
  if (!user) {
    throw new Error('User with this email does not exist');
  }
  return user;
};

const updateStudent = async (email, updateData) => {
  const user = await findStudentByEmail(email);
  const id = user.id;
  const result = await Student.update(updateData, {
    where: { id },
  });
  return result;
};

module.exports = { registerStudent, loginStudent, getStudent, updateStudent };