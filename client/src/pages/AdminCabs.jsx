import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const BASE = 'http://localhost:8000'

export default function AdminCabs() {
  const [cars, setCars]       = useState([])
  const [search, setSearch]   = useState('')
  const [typeFilter, setType] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const token    = localStorage.getItem('token')
  const navigate = useNavigate()

  const load = () => axios.get('/api/cars').then(r => setCars(r.data)).catch(console.error)
  useEffect(() => { load() }, [])

  const deleteCar = async (id) => {
    if (!window.confirm('Delete this car?')) return
    await axios.delete(`/api/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  let list = [...cars]
  if (search)     list = list.filter(c => c.carname.toLowerCase().includes(search.toLowerCase()))
  if (typeFilter) list = list.filter(c => c.cartype.toLowerCase().includes(typeFilter.toLowerCase()))
  list.sort((a, b) => sortAsc ? Number(a.price)-Number(b.price) : Number(b.price)-Number(a.price))

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">Car List</h1>
        <div className="filter-bar">
          <input placeholder="Search by car name" value={search}     onChange={e => setSearch(e.target.value)} />
          <input placeholder="Search by car type" value={typeFilter} onChange={e => setType(e.target.value)} />
          <button className="btn-primary" onClick={() => setSortAsc(p => !p)}>Sort Price {sortAsc ? '↑' : '↓'}</button>
        </div>
        <div className="cars-grid">
          {list.map(car => (
            <div className="car-card" key={car._id}>
              <img src={car.carImage ? `${BASE}/uploads/${car.carImage}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png'} alt={car.carname} />
              <div className="car-card-body">
                <p><span>Driver:</span> {car.drivername}</p>
                <p><span>Model:</span>  {car.carname}</p>
                <p><span>Type:</span>   {car.cartype}</p>
                <p><span>Car No:</span> {car.carno}</p>
                <p><span>Price:</span>  ₹{car.price}/Km</p>
                <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.7rem' }}>
                  <button className="btn-sm btn-edit" style={{ flex:1 }} onClick={() => navigate(`/admin/editcab/${car._id}`)}>Edit</button>
                  <button className="btn-sm btn-del"  style={{ flex:1 }} onClick={() => deleteCar(car._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="no-data">No cars found.</div>}
        </div>
      </div>
    </>
  )
}