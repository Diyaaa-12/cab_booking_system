import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, cabs: 0, bookings: 0 })

  useEffect(() => {
    axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => setStats(r.data)).catch(console.error)
  }, [])

  const chartData = [
    { name: 'Users',    value: stats.users },
    { name: 'Cabs',     value: stats.cabs },
    { name: 'Bookings', value: stats.bookings },
  ]

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">Dashboard</h1>
        <div className="stat-grid">
          <div className="stat-card"><h3>USERS</h3><p>{stats.users}</p></div>
          <div className="stat-card"><h3>CABS</h3><p>{stats.cabs}</p></div>
          <div className="stat-card"><h3>BOOKINGS</h3><p>{stats.bookings}</p></div>
        </div>
        <div style={{ background:'#fff', borderRadius:10, padding:'1.5rem', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip />
              <Bar dataKey="value" radius={[6,6,0,0]}>
                {chartData.map((_, i) => <Cell key={i} fill="#FFC107" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}