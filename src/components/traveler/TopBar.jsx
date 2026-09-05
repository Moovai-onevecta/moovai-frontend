function TopBar({ eyebrow, title, children }) {
  return (
    <div className="tv-topbar">
      <div style={{ marginRight: 'auto' }}>
        {eyebrow && <p className="tv-topbar-eyebrow">{eyebrow}</p>}
        <p className="tv-topbar-title">{title}</p>
      </div>
      {children}
    </div>
  )
}

export default TopBar
