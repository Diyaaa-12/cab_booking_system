import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const BASE = 'http://localhost:8000'

export default function BookCab() {
  const navigate = useNavigate()
  const [cars, setCars]       = useState([])
  const [search, setSearch]   = useState('')
  const [typeFilter, setType] = useState('')
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => { axios.get('/api/cars').then(r => setCars(r.data)).catch(console.error) }, [])

  let list = [...cars]
  if (search)     list = list.filter(c => c.carname.toLowerCase().includes(search.toLowerCase()))
  if (typeFilter) list = list.filter(c => c.cartype.toLowerCase().includes(typeFilter.toLowerCase()))
  list.sort((a, b) => sortAsc ? Number(a.price)-Number(b.price) : Number(b.price)-Number(a.price))

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="filter-bar">
          <input placeholder="Search by car name" value={search}     onChange={e => setSearch(e.target.value)} />
          <input placeholder="Search by car type" value={typeFilter} onChange={e => setType(e.target.value)} />
          <button className="btn-primary" onClick={() => setSortAsc(p => !p)}>
            Sort Price: {sortAsc ? 'Low to High' : 'High to Low'}
          </button>
        </div>
        {list.length === 0
          ? <div className="no-data">No cabs found.</div>
          : <div className="cars-grid">
              {list.map(car => (
                <div className="car-card" key={car._id}>
                  <img src={car.carImage ? `${BASE}/uploads/${car.carImage}` : 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png'} alt={car.carname} />
                  <div className="car-card-body">
                    <p>🚗 <span>Model:</span> {car.carname}</p>
                    <p><span>Type:</span> {car.cartype}</p>
                    <p><span>Car No:</span> {car.carno}</p>
                    <p><span>Driver:</span> {car.drivername}</p>
                    <p><span>Fare:</span> ₹{car.price}/Km</p>
                    <button className="btn-primary" onClick={() => navigate(`/booking/${car._id}`)}>Book Cab</button>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </>
  )
}