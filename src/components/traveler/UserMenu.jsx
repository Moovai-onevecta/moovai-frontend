import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

function initials(name) {
  if (!name) return 'YOU'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function UserMenu() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const displayName = user?.displayName || 'Traveler'

  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleSignOut = async () => {
    setOpen(false)
    await signOut()
    navigate('/login')
  }

  return (
    <div className="tv-user-menu-container" ref={containerRef}>
      {open && (
        <div className="tv-user-menu" role="menu">
          <button type="button" className="tv-user-menu-item" disabled role="menuitem">
            Account settings
          </button>
          <button type="button" className="tv-user-menu-item" disabled role="menuitem">
            Report a bug
          </button>
          <div className="tv-user-menu-divider" />
          <button
            type="button"
            className="tv-user-menu-item tv-user-menu-item--danger"
            onClick={handleSignOut}
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}

      <button
        type="button"
        className="tv-user-row tv-user-row--button"
        onClick={() => setOpen((cur) => !cur)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="tv-user-avatar">
          {user?.photoURL ? <img src={user.photoURL} alt="" /> : initials(displayName)}
        </span>
        <span className="tv-user-meta">
          <span className="tv-user-name">{displayName}</span>
          <span className="tv-user-role">Traveler</span>
        </span>
      </button>
    </div>
  )
}

export default UserMenu
