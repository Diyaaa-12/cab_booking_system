const express = require('express');
const router  = express.Router();
const { bookRide, getUserBookings, getAllBookings, deleteBooking, updateBookingStatus } = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.post('/',            authMiddleware,  bookRide);
router.get('/my',           authMiddleware,  getUserBookings);
router.get('/all',          adminMiddleware, getAllBookings);
router.delete('/:id',       adminMiddleware, deleteBooking);
router.put('/:id/status',   adminMiddleware, updateBookingStatus);

module.exports = router;