const { Internship } = require("../models/index");

const addInternshipService = async (internshipData) => {
    const newInternship = await Internship.create(internshipData);
    return newInternship;
};

const deleteInternshipService = async (internshipId) => {
    const deleted = await Internship.destroy({ where: { id: internshipId } });
    if (!deleted) {
        throw new Error(`Internship with ID ${internshipId} not found`);
    }
};

const fetchAllInternshipsService = async (recruiterId) => {
    const internships = await Internship.findAll({
        where: { recruiterId: recruiterId } });
    return internships;
};


const fetchInternshipByIdService = async (internshipId) => {
    const internship = await Internship.findByPk(internshipId);
    return internship;
};

module.exports = { addInternshipService, deleteInternshipService, fetchAllInternshipsService, fetchInternshipByIdService };
