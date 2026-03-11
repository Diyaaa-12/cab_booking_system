require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const path      = require('path');
const connectDB = require('./db/config');

const userRoutes    = require('./routes/userRoutes');
const adminRoutes   = require('./routes/adminRoutes');
const carRoutes     = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users',    userRoutes);
app.use('/api/admin',    adminRoutes);
app.use('/api/cars',     carRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => res.json({ message: 'UCab API is running 🚖' }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));