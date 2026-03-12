const Mybookings = require('../models/MyBookingSchema');
const User       = require('../models/UserSchema');

const bookRide = async (req, res) => {
  try {
    const user    = await User.findById(req.user.id);
    const booking = await Mybookings.create({ ...req.body, userId: req.user.id, username: user.name });
    res.status(201).json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Mybookings.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Mybookings.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteBooking = async (req, res) => {
  try {
    await Mybookings.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Mybookings.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { bookRide, getUserBookings, getAllBookings, deleteBooking, updateBookingStatus };