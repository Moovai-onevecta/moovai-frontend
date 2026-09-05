import Sidebar from './Sidebar'
import '../../assets/css/traveler.css'

function TravelerShell({ active, children }) {
  return (
    <div className="tv-shell">
      <Sidebar active={active} />
      <div className="tv-shell-main">{children}</div>
    </div>
  )
}

export default TravelerShell
