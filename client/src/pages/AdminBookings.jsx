import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const token = localStorage.getItem('token')

  const load = () => axios.get('/api/bookings/all', { headers: { Authorization: `Bearer ${token}` } }).then(r => setBookings(r.data)).catch(console.error)
  useEffect(() => { load() }, [])

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    await axios.delete(`/api/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  const updateStatus = async (id) => {
    await axios.put(`/api/bookings/${id}/status`, { status: 'Completed' }, { headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">My Booking</h1>
        {bookings.length === 0
          ? <div className="no-data">No bookings found.</div>
          : bookings.map(b => (
            <div className="booking-card" key={b._id}>
              <div className="booking-row">
                <div className="booking-field"><label>Date</label><span>{b.bookeddate}</span></div>
                <div className="booking-field"><label>Trip</label><span>{b.selectedPickupCity} → {b.selectedDropCity}</span></div>
                <div className="booking-field"><label>Pickup</label><span>{b.pickuptime}, {b.pickupdate}</span></div>
                <div className="booking-field"><label>Drop</label><span>{b.droptime}, {b.dropdate}</span></div>
                <div className="booking-field"><label>Driver</label><span>{b.drivername}</span></div>
              </div>
              <div className="booking-row2" style={{ alignItems:'center' }}>
                <div className="booking-field"><label>Car</label><span>{b.carname} ({b.cartype})</span></div>
                <div className="booking-field"><label>Car No</label><span>{b.carno}</span></div>
                <div className="booking-field"><label>Amount</label><span>{b.fareString}</span></div>
                <div className="booking-field"><label>Status</label>
                  <span className={b.status === 'Completed' ? 'status-complete' : 'status-onway'}>{b.status}</span>
                </div>
                <div style={{ display:'flex', gap:'0.3rem' }}>
                  {b.status !== 'Completed' && <button className="btn-sm btn-edit" onClick={() => updateStatus(b._id)}>✓ Done</button>}
                  <button className="btn-sm btn-del" onClick={() => deleteBooking(b._id)}>🗑</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}