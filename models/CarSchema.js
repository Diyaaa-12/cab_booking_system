const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  drivername: { type: String, required: true },
  carImage:   { type: String, default: '' },
  carname:    { type: String, required: true },
  cartype:    { type: String, required: true },
  price:      { type: String, required: true },
  carno:      { type: String, required: true, unique: true },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;