const express = require('express');
const router  = express.Router();
const { getAllCars, getCarById, addCar, updateCar, deleteCar } = require('../controllers/carController');
const { adminMiddleware } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.get('/',       getAllCars);
router.get('/:id',    getCarById);
router.post('/',      adminMiddleware, upload.single('carImage'), addCar);
router.put('/:id',    adminMiddleware, upload.single('carImage'), updateCar);
router.delete('/:id', adminMiddleware, deleteCar);

module.exports = router;