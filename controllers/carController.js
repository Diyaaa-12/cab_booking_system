const Car = require('../models/CarSchema');
const fs  = require('fs');

const getAllCars = async (req, res) => {
  try { res.json(await Car.find()); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const addCar = async (req, res) => {
  try {
    const { drivername, carname, cartype, price, carno } = req.body;
    const carImage = req.file ? req.file.filename : '';
    const car = await Car.create({ drivername, carname, cartype, price, carno, carImage });
    res.status(201).json(car);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateCar = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.carImage = req.file.filename;
    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (car.carImage) {
      const imgPath = `uploads/${car.carImage}`;
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    res.json({ message: 'Car deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllCars, getCarById, addCar, updateCar, deleteCar };