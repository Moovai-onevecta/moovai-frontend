function InfoTile({ label, value, variant = 'white' }) {
  const classes = ['tv-info-tile', variant === 'white' ? 'tv-info-tile--white' : ''].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <p className="tv-info-tile-label">{label}</p>
      <p className="tv-info-tile-value">{value}</p>
    </div>
  )
}

export default InfoTile
