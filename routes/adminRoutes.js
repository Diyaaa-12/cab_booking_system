const express = require('express');
const router  = express.Router();
const { registerAdmin, loginAdmin, getDashboard } = require('../controllers/adminController');
const { adminMiddleware } = require('../middlewares/authMiddleware');

router.post('/register',  registerAdmin);
router.post('/login',     loginAdmin);
router.get('/dashboard',  adminMiddleware, getDashboard);

module.exports = router;