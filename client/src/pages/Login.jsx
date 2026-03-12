import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]         = useState({ email: '', password: '' })
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [error, setError]       = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setError('')
    try {
      const endpoint = isAdminLogin ? '/api/admin/login' : '/api/users/login'
      const res  = await axios.post(endpoint, form)
      const data = res.data
      localStorage.setItem('token',    data.token)
      localStorage.setItem('isAdmin',  isAdminLogin ? 'true' : 'false')
      localStorage.setItem('username', isAdminLogin ? data.admin.name : data.user.name)
      localStorage.setItem('userId',   isAdminLogin ? data.admin.id   : data.user.id)
      navigate(isAdminLogin ? '/admin' : '/')
    } catch (err) { setError(err.response?.data?.message || 'Login failed') }
  }

  return (
    <>
      <Navbar />
      <div className="form-card">
        <h2>Login</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
          <button className={!isAdminLogin ? 'btn-dark form-full' : 'btn-primary form-full'} style={{ flex:1 }} onClick={() => setIsAdminLogin(false)}>User</button>
          <button className={isAdminLogin  ? 'btn-dark form-full' : 'btn-primary form-full'} style={{ flex:1 }} onClick={() => setIsAdminLogin(true)}>Admin</button>
        </div>
        <div className="form-group"><input name="email"    placeholder="Email address" value={form.email}    onChange={handleChange} type="email" /></div>
        <div className="form-group"><input name="password" placeholder="Password"      value={form.password} onChange={handleChange} type="password" /></div>
        <button className="btn-dark form-full" onClick={handleSubmit}>Login</button>
        <p style={{ textAlign: 'center', marginTop: '0.8rem', fontSize: '0.88rem' }}>Don't have an account?</p>
        <Link to="/register"><button className="btn-primary form-full" style={{ marginTop: '0.4rem' }}>Register</button></Link>
      </div>
    </>
  )
}