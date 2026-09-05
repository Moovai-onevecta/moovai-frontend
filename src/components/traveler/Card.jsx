const VARIANT_CLASS = {
  default: '',
  highlight: 'tv-card--highlight',
  dashed: 'tv-card--dashed',
  sand: 'tv-card--sand',
  dark: 'tv-card--dark',
  flat: 'tv-card--flat',
}

function Card({ variant = 'default', className = '', style, children }) {
  const classes = ['tv-card', VARIANT_CLASS[variant], className].filter(Boolean).join(' ')
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

export default Card
