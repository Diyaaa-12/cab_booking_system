import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function AdminEditCab() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token    = localStorage.getItem('token')
  const [form, setForm]   = useState({ drivername:'', carname:'', cartype:'', carno:'', price:'' })
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    axios.get(`/api/cars/${id}`).then(r => {
      const { drivername, carname, cartype, carno, price } = r.data
      setForm({ drivername, carname, cartype, carno, price })
    }).catch(console.error)
  }, [id])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleUpdate = async () => {
    setError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (image) fd.append('carImage', image)
      await axios.put(`/api/cars/${id}`, fd, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
      setSuccess('Car updated!')
      setTimeout(() => navigate('/admin/cabs'), 1200)
    } catch (err) { setError(err.response?.data?.message || 'Update failed') }
  }

  return (
    <>
      <Navbar />
      <div className="form-card">
        <h2>Edit Car Data</h2>
        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {[['drivername','Driver Name'],['carname','Car Model'],['cartype','Car Type'],['carno','Car No'],['price','Price (per Km)']].map(([name, placeholder]) => (
          <div className="form-group" key={name}><input name={name} placeholder={placeholder} value={form[name]} onChange={handleChange} /></div>
        ))}
        <div className="form-group"><label>Car Image</label><input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} /></div>
        <button className="btn-primary form-full" onClick={handleUpdate}>Update</button>
      </div>
    </>
  )
}