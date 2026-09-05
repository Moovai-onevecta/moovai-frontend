const TONE_CLASS = {
  success: 'tv-badge--success',
  pending: 'tv-badge--pending',
  neutral: 'tv-badge--neutral',
}

function Badge({ tone = 'neutral', className = '', style, children }) {
  const classes = ['tv-badge', TONE_CLASS[tone], className].filter(Boolean).join(' ')
  return (
    <span className={classes} style={style}>
      {children}
    </span>
  )
}

export default Badge
