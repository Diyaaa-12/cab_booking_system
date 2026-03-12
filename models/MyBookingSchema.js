const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  selectedPickupState: String,
  selectedPickupCity:  String,
  selectedDropState:   String,
  selectedDropCity:    String,
  pickupdate:  String,
  pickuptime:  String,
  dropdate:    String,
  droptime:    String,
  drivername:  String,
  fareString:  String,
  carname:     String,
  cartype:     String,
  carno:       String,
  price:       String,
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username:    String,
  status:      { type: String, default: 'On the Way' },
  bookeddate:  {
    type: String,
    default: () => new Date().toLocaleDateString('en-IN'),
  },
}, { timestamps: true });

const Mybookings = mongoose.model('Mybookings', rideSchema);
module.exports = Mybookings;