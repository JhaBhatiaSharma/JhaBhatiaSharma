const express = require("express");
const { getAllUsers, addUser, editUser, deleteUser } = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Apply middleware for authentication and admin authorization
router.use(authMiddleware); // Ensure all routes are authenticated
router.use(roleMiddleware(["admin"])); // Restrict access to admin only

router.get("/users", getAllUsers); // Fetch users 
router.post("/users", addUser); // Add a new user
router.put("/users/:id", editUser); // Edit user details
router.delete("/users/:id", deleteUser); // Delete a user

module.exports = router;
