const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const Admin      = require('../models/AdminSchema');
const User       = require('../models/UserSchema');
const Car        = require('../models/CarSchema');
const Mybookings = require('../models/MyBookingSchema');

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const admin  = await Admin.create({ name, email, password: hashed });
    const token  = jwt.sign({ id: admin._id, name: admin.name, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, name: admin.name, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getDashboard = async (req, res) => {
  try {
    const users    = await User.countDocuments();
    const cabs     = await Car.countDocuments();
    const bookings = await Mybookings.countDocuments();
    res.json({ users, cabs, bookings });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { registerAdmin, loginAdmin, getDashboard };