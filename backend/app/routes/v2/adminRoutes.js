const express = require('express');
const { authMiddleware, roleMiddleware } = require('../../middlewares/v2/authMiddleware');
const { getAllUsers, addUser, editUser, deleteUser } = require('../../controllers/v2/adminController');

const router = express.Router();
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/users', getAllUsers);
router.post('/users', addUser);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);

module.exports = router;