const express = require('express');
const router  = express.Router();
const { registerUser, loginUser, getProfile, getAllUsers, deleteUser, updateUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login',    loginUser);
router.get('/profile',   authMiddleware,  getProfile);
router.get('/all',       adminMiddleware, getAllUsers);
router.delete('/:id',    adminMiddleware, deleteUser);
router.put('/:id',       adminMiddleware, updateUser);

module.exports = router;