const { Recruiter } = require('../../models/v1/index');
const { encrypt , decrypt } = require('../../utils/v1/encryptDecrypt'); 

const findRecruiterByEmail = async (email) => {
  return Recruiter.findOne({ where: { email } });
};

const registerRecruiter = async ({ firstName, lastName, email, mobileNumber, password }) => {

  const existingRecruiter = await findRecruiterByEmail(email);
  if (existingRecruiter) {
    throw new Error('User with this email already exists');
  }

  passwordEncrypt = await encrypt(password);

  const newRecruiter = await Recruiter.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password: passwordEncrypt
  });

  return newRecruiter;
};

const loginRecruiter = async ({ email, password }) => {

    const existingRecruiter = await findRecruiterByEmail(email);
    if (!existingRecruiter) {
      throw new Error('User with this email does not exist');
    }

    const passwordMatch = await decrypt(password, existingRecruiter.password);
    if(passwordMatch) {
        return existingRecruiter;
    }
    return null;
};

const getRecruiter = async (email) => {
  const user = await findRecruiterByEmail(email);
  if (!user) {
    throw new Error('User with this email does not exist');
  }
  return user;
};

const updateRecruiter = async (email, updateData) => {
  const user = await findRecruiterByEmail(email);
  const id = user.id;
  const result = await Recruiter.update(updateData, {
    where: { id },
  });
  return result;
};

module.exports = { registerRecruiter, loginRecruiter, getRecruiter, updateRecruiter };