import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem('token')

  const load = () => axios.get('/api/users/all', { headers: { Authorization: `Bearer ${token}` } }).then(r => setUsers(r.data)).catch(console.error)
  useEffect(() => { load() }, [])

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return
    await axios.delete(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">Users</h1>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Sl/No</th><th>UserId</th><th>User Name</th><th>Email</th><th>Operation</th></tr></thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td style={{ fontSize:'0.78rem', color:'#888' }}>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td style={{ display:'flex', gap:'0.4rem' }}>
                    <button className="btn-sm btn-del" onClick={() => deleteUser(u._id)}>🗑 Delete</button>
                    <button className="btn-sm btn-view">View</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={5} style={{ textAlign:'center', color:'#aaa' }}>No users found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}