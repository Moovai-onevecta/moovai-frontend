import { Link } from 'react-router'
import UserMenu from './UserMenu'
import heroImg from '../../assets/img/hero.png'

const NAV_ITEMS = [
  { label: 'Home', to: '/app/home' },
  { label: 'Chat', to: '/app/chat' },
  { label: 'Itinerary', to: '/app/itinerary' },
  { label: 'Providers', to: '/app/providers' },
  { label: 'Bookings', to: '/app/flights' },
  { label: 'Live trip', to: '/app/trip' },
]

function Sidebar({ active }) {
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
        <UserMenu />
      </div>
    </aside>
  )
}

export default Sidebar
