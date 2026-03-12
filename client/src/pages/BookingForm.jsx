import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const STATES_CITIES = {
  'Delhi':         ['New Delhi','Dwarka','Rohini','Saket'],
  'Gujarat':       ['Ahmedabad','Surat','Vadodara','Rajkot'],
  'Karnataka':     ['Bengaluru','Mysuru','Hubli','Mangalore'],
  'Maharashtra':   ['Mumbai','Pune','Nagpur','Nashik'],
  'Rajasthan':     ['Jaipur','Jodhpur','Udaipur','Kota'],
  'Tamil Nadu':    ['Chennai','Coimbatore','Madurai','Salem'],
  'Telangana':     ['Hyderabad','Warangal','Nizamabad','Karimnagar'],
  'Uttar Pradesh': ['Lucknow','Noida','Agra','Kanpur','Ghaziabad'],
  'West Bengal':   ['Kolkata','Howrah','Durgapur','Asansol'],
}

export default function BookingForm() {
  const { carId } = useParams()
  const navigate  = useNavigate()
  const [car, setCar]       = useState(null)
  const [fare, setFare]     = useState('')
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    selectedPickupState:'', selectedPickupCity:'',
    selectedDropState:'',   selectedDropCity:'',
    pickupdate:'', pickuptime:'', dropdate:'', droptime:'',
  })

  useEffect(() => { axios.get(`/api/cars/${carId}`).then(r => setCar(r.data)).catch(console.error) }, [carId])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculateFare = () => {
    if (!form.pickupdate || !form.dropdate) { setError('Select pickup and drop dates'); return }
    const days  = Math.max(1, Math.ceil((new Date(form.dropdate) - new Date(form.pickupdate)) / 86400000))
    const total = days * 100 * Number(car?.price || 10)
    setFare(`₹${total}`)
    setError('')
  }

  const handleBook = async () => {
    if (!fare) { setError('Please calculate fare first'); return }
    try {
      await axios.post('/api/bookings', {
        ...form, fareString: fare,
        drivername: car.drivername, carname: car.carname,
        cartype: car.cartype, carno: car.carno, price: car.price,
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setSuccess('Ride booked successfully!')
      setTimeout(() => navigate('/mybooking'), 1500)
    } catch (err) { setError(err.response?.data?.message || 'Booking failed') }
  }

  return (
    <>
      <Navbar />
      <div className="booking-form-container">
        <h2>Book a Ride</h2>
        {car && <p style={{ textAlign:'center', color:'#888', marginBottom:'1rem', fontSize:'0.9rem' }}>{car.carname} ({car.cartype}) — ₹{car.price}/Km</p>}
        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="location-section">
          <h3>Pickup Location</h3>
          <div className="row-2">
            <div className="form-group">
              <select value={form.selectedPickupState} onChange={e => { set('selectedPickupState', e.target.value); set('selectedPickupCity','') }}>
                <option value="">Select State</option>
                {Object.keys(STATES_CITIES).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <select value={form.selectedPickupCity} onChange={e => set('selectedPickupCity', e.target.value)}>
                <option value="">Select City</option>
                {(STATES_CITIES[form.selectedPickupState] || []).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="location-section">
          <h3>Drop Location</h3>
          <div className="row-2">
            <div className="form-group">
              <select value={form.selectedDropState} onChange={e => { set('selectedDropState', e.target.value); set('selectedDropCity','') }}>
                <option value="">Select State</option>
                {Object.keys(STATES_CITIES).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <select value={form.selectedDropCity} onChange={e => set('selectedDropCity', e.target.value)}>
                <option value="">Select City</option>
                {(STATES_CITIES[form.selectedDropState] || []).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group"><label style={{ color:'#e65100', fontWeight:600 }}>Pickup Date</label><input type="date" value={form.pickupdate} onChange={e => set('pickupdate', e.target.value)} /></div>
        <div className="form-group"><label style={{ color:'#e65100', fontWeight:600 }}>Pickup Time</label><input type="time" value={form.pickuptime} onChange={e => set('pickuptime', e.target.value)} /></div>
        <div className="form-group"><label style={{ color:'#e65100', fontWeight:600 }}>Drop Date</label>  <input type="date" value={form.dropdate}   onChange={e => set('dropdate',   e.target.value)} /></div>
        <div className="form-group"><label style={{ color:'#e65100', fontWeight:600 }}>Drop Time</label>  <input type="time" value={form.droptime}   onChange={e => set('droptime',   e.target.value)} /></div>

        {fare && <div className="alert alert-success" style={{ textAlign:'center', fontWeight:700 }}>Estimated Fare: {fare}</div>}
        <button className="btn-primary form-full" style={{ marginBottom:'0.6rem' }} onClick={calculateFare}>Calculate Fare</button>
        <button className="btn-dark form-full" onClick={handleBook}>Book Ride</button>
      </div>
    </>
  )
}