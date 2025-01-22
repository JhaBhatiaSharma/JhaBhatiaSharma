const express = require('express');
const { getAllInternshipsController, getInternshipController, addInternshipController, updateInternshipController, deleteInternshipController } = require('../controllers/internshipController');

const router = express.Router();

router.get('/fetchAllInternships', getAllInternshipsController);
router.get('/fetchInternship', getInternshipController);
router.post('/addInternship', addInternshipController);
router.post('/updateInternship', updateInternshipController);
router.get('/deleteInternship', deleteInternshipController);

module.exports = router;