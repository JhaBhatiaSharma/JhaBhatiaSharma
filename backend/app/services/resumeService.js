const { Resume } = require('../models/index');
const fs = require('fs');

const fetchResume = async (studentId) => {
    return await Resume.findOne({ where: { studentId } });
};

const createResume = async (studentId, filePath) => {
    return await Resume.create({ studentId, filePath });
};

const updateResume = async (studentId, filePath) => {
    const existingResume = await Resume.findOne({ where: { studentId } });
    if (!existingResume) {
        throw new Error('Resume not found');
    }

    if (existingResume.filePath) {
        fs.unlinkSync(existingResume.filePath);
    }

    existingResume.filePath = filePath;
    return await existingResume.save();
};

const deleteResume = async (studentId) => {
    const existingResume = await Resume.findOne({ where: { studentId } });
    if (!existingResume) {
        throw new Error('Resume not found');
    }

    if (existingResume.filePath) {
        fs.unlinkSync(existingResume.filePath);
    }

    return await existingResume.destroy();
};

module.exports = { fetchResume, createResume, updateResume, deleteResume };
