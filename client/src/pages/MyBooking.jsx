import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function MyBooking() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('/api/bookings/my', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => setBookings(r.data)).catch(console.error)
  }, [])

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">My Bookings</h1>
        {bookings.length === 0
          ? <div className="no-data">No bookings found.</div>
          : bookings.map(b => (
            <div className="booking-card" key={b._id}>
              <div className="booking-row">
                <div className="booking-field"><label>Cab Booked Date</label><span>{b.bookeddate}</span></div>
                <div className="booking-field"><label>Trip</label><span>{b.selectedPickupCity} → {b.selectedDropCity}</span></div>
                <div className="booking-field"><label>Pickup</label><span>{b.pickuptime}, {b.pickupdate}</span></div>
                <div className="booking-field"><label>Drop</label><span>{b.droptime}, {b.dropdate}</span></div>
                <div className="booking-field"><label>Driver</label><span>{b.drivername}</span></div>
              </div>
              <div className="booking-row2">
                <div className="booking-field"><label>Car</label><span>{b.carname}</span></div>
                <div className="booking-field"><label>Car Type</label><span>{b.cartype}</span></div>
                <div className="booking-field"><label>Car No</label><span>{b.carno}</span></div>
                <div className="booking-field"><label>Amount Paid</label><span>{b.fareString}</span></div>
                <div className="booking-field"><label>Status</label>
                  <span className={b.status === 'Completed' ? 'status-complete' : 'status-onway'}>{b.status}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}