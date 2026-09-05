import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import heroImg from '../../assets/img/hero.png'

const NAV_ITEMS = [
  { label: 'Home', to: '/app/home' },
  { label: 'Chat', to: '/app/chat' },
  { label: 'Itinerary', to: '/app/itinerary' },
  { label: 'Providers', to: '/app/providers' },
  { label: 'Bookings', to: '/app/flights' },
  { label: 'Live trip', to: '/app/trip' },
]

function initials(name) {
  if (!name) return 'YOU'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function Sidebar({ active }) {
  const { user } = useAuth()
  const displayName = user?.displayName || 'Traveler'

  return (
    <aside className="tv-sidebar">
      <Link to="/app/onboarding" className="tv-sidebar-brand">
        <img src={heroImg} alt="" width="26" height="26" />
        <span>Moovai</span>
      </Link>

      <nav className="tv-nav">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`tv-nav-item${active === item.label ? ' is-active' : ''}`}
          >
            <span className="tv-nav-dot" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="tv-sidebar-footer">
        <div className="tv-support-note">
          <p>Support</p>
          <p>A human is on call for this trip, 24/7.</p>
        </div>
        <div className="tv-user-row">
          <span className="tv-user-avatar">
            {user?.photoURL ? <img src={user.photoURL} alt="" /> : initials(displayName)}
          </span>
          <span className="tv-user-meta">
            <span className="tv-user-name">{displayName}</span>
            <span className="tv-user-role">Traveler</span>
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
