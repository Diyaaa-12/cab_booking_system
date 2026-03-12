import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setError('')
    try {
      const res = await axios.post('/api/users/register', form)
      localStorage.setItem('token',    res.data.token)
      localStorage.setItem('username', res.data.user.name)
      localStorage.setItem('userId',   res.data.user.id)
      localStorage.setItem('isAdmin',  'false')
      navigate('/')
    } catch (err) { setError(err.response?.data?.message || 'Registration failed') }
  }

  return (
    <>
      <Navbar />
      <div className="form-card">
        <h2>Register</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="form-group"><input name="name"     placeholder="Name"          value={form.name}     onChange={handleChange} /></div>
        <div className="form-group"><input name="email"    placeholder="Email address" value={form.email}    onChange={handleChange} type="email" /></div>
        <div className="form-group"><input name="password" placeholder="Password"      value={form.password} onChange={handleChange} type="password" /></div>
        <button className="btn-dark form-full" onClick={handleSubmit}>Signup</button>
        <p style={{ textAlign: 'center', marginTop: '0.8rem', fontSize: '0.88rem' }}>Already have an account?</p>
        <Link to="/login"><button className="btn-primary form-full" style={{ marginTop: '0.4rem' }}>Login</button></Link>
      </div>
    </>
  )
}