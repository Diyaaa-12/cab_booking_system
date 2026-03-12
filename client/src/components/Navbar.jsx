import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const isAdmin  = localStorage.getItem('isAdmin') === 'true'
  const username = localStorage.getItem('username')
  const token    = localStorage.getItem('token')

  const logout = () => { localStorage.clear(); navigate('/login') }

  if (isAdmin) return (
    <nav className="navbar">
      <Link to="/admin" className="navbar-brand">UCab App</Link>
      <div className="navbar-links">
        <Link to="/admin">Home</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/cabs">Cabs</Link>
        <Link to="/admin/addcab">AddCab</Link>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  )

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">UCab App</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {token && <Link to="/bookcab">Book Cab</Link>}
        {token && <Link to="/mybooking">My Booking</Link>}
        {token
          ? <><button className="btn-logout" onClick={logout}>Logout</button><span style={{ fontWeight:600 }}>({username})</span></>
          : <Link to="/login">Login</Link>
        }
      </div>
    </nav>
  )
}