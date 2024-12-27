const nodemailer = require('nodemailer');
const moment = require('moment');

const { OTP } = require('../models/index');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTPEMAIL,
      pass: process.env.SMTPPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTPEMAIL,
    to: email,
    subject: 'OTP for Secure Login in InternHub',
    text: `Your OTP is ${otp}. It is valid for 120 seconds.`,
  };

  await transporter.sendMail(mailOptions);
};

const requestOTPService = async (email, id) => {
  const otp = generateOTP();
  const expiresAt = moment().add(120, 'seconds').toDate();

  await OTP.upsert({
    otp,
    studentId: id,
    expiresAt,
  });

  await sendOTPEmail(email, otp);
  return { message: 'OTP sent to email' };
};

const verifyOTPService = async (otp, id) => {
  try {
    const otpRecord = await OTP.findOne({
      where: { studentId: id },
    });

    if (!otpRecord) {
      throw new Error('OTP not found for the user.');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new Error('OTP has expired.');
    }

    if (otpRecord.otp !== otp) {
      throw new Error('Invalid OTP.');
    }

    return { success: true, message: 'OTP verified successfully!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { requestOTPService, verifyOTPService };
