import { Link } from 'react-router'

const VARIANT_CLASS = {
  dark: 'tv-pill--dark',
  accent: 'tv-pill--accent',
  outline: 'tv-pill--outline',
  'outline-light': 'tv-pill--outline-light',
  'soft-accent': 'tv-pill--soft-accent',
  'muted-outline': 'tv-pill--muted-outline',
  'ghost-dark': 'tv-pill--ghost-dark',
}

const SIZE_CLASS = {
  md: '',
  sm: 'tv-pill--sm',
  xs: 'tv-pill--xs',
}

function Pill({ variant = 'outline', size = 'md', to, href, className = '', children, ...rest }) {
  const classes = ['tv-pill', VARIANT_CLASS[variant], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Pill
