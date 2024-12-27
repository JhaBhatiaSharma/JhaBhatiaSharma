const express = require('express');
const {
  addInternship,
  deleteInternship,
  fetchAllInternship,
  fetchIdInternship,
} = require('../controllers/recruiterController');

const router = express.Router();

router.post('/add-internship', addInternship);
router.get('/delete-internship', deleteInternship);
router.get('/fetch_all-internship', fetchAllInternship);
router.get('/fetch_id-internship', fetchIdInternship);

module.exports = router;
