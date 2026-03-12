import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home           from './pages/Home'
import Register       from './pages/Register'
import Login          from './pages/Login'
import BookCab        from './pages/BookCab'
import BookingForm    from './pages/BookingForm'
import MyBooking      from './pages/MyBooking'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers     from './pages/AdminUsers'
import AdminCabs      from './pages/AdminCabs'
import AdminAddCab    from './pages/AdminAddCab'
import AdminEditCab   from './pages/AdminEditCab'
import AdminBookings  from './pages/AdminBookings'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}
const AdminRoute = ({ children }) => {
  const token   = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  return (token && isAdmin) ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/bookcab"        element={<ProtectedRoute><BookCab /></ProtectedRoute>} />
        <Route path="/booking/:carId" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
        <Route path="/mybooking"      element={<ProtectedRoute><MyBooking /></ProtectedRoute>} />
        <Route path="/admin"              element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users"        element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/cabs"         element={<AdminRoute><AdminCabs /></AdminRoute>} />
        <Route path="/admin/addcab"       element={<AdminRoute><AdminAddCab /></AdminRoute>} />
        <Route path="/admin/editcab/:id"  element={<AdminRoute><AdminEditCab /></AdminRoute>} />
        <Route path="/admin/bookings"     element={<AdminRoute><AdminBookings /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}