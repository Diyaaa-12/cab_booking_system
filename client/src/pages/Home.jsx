import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="hero">
        <h1>Your Ride, Your Way</h1>
        <p>Reliable. Fast. Affordable. Book cabs anytime, anywhere.</p>
        <button className="btn-dark" onClick={() => navigate('/bookcab')}>Explore Services</button>
        <img src="https://cdn-icons-png.flaticon.com/512/3097/3097144.png" alt="Taxi" style={{ width: 260, marginTop: '2rem' }} />
      </div>
      <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#fff' }}>
        <h2 style={{ marginBottom: '1rem' }}>Why Choose UCab?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', maxWidth: 800, margin: '0 auto' }}>
          {[
            { icon: '⚡', title: 'Fast Booking',  desc: 'Book a cab in seconds.' },
            { icon: '📍', title: 'Live Tracking', desc: 'Track your ride in real-time.' },
            { icon: '💰', title: 'Best Prices',   desc: 'Transparent fare, no hidden charges.' },
          ].map(f => (
            <div key={f.title} style={{ padding: '1.5rem', background: '#fffde7', borderRadius: 10 }}>
              <div style={{ fontSize: '2rem' }}>{f.icon}</div>
              <h3 style={{ margin: '0.6rem 0 0.3rem' }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}