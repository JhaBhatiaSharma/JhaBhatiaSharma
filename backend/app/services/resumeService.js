const { Resume } = require('../models/index');
const fs = require('fs');

const fetchResume = async (studentId) => {
    return await Resume.findOne({ where: { studentId } });
};

const createResume = async (studentId, path) => {
    return await Resume.create({ studentId, path });
};

const updateResume = async (studentId, path) => {
    const existingResume = await Resume.findOne({ where: { studentId } });
    if (!existingResume) {
        throw new Error('Resume not found');
    }

    if (existingResume.path) {
        fs.unlinkSync(existingResume.path);
    }

    existingResume.path = path;
    return await existingResume.save();
};

const deleteResume = async (studentId) => {
    const existingResume = await Resume.findOne({ where: { studentId } });
    if (!existingResume) {
        throw new Error('Resume not found');
    }

    if (existingResume.path) {
        fs.unlinkSync(existingResume.path);
    }

    return await existingResume.destroy();
};

module.exports = { fetchResume, createResume, updateResume, deleteResume };
