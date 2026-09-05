import Card from './Card'
import Pill from './Pill'

function ProviderCard({ name, rating, meta, blurb, price, onSwap }) {
  return (
    <Card className="tv-col" style={{ padding: 22, gap: 14 }}>
      <svg viewBox="0 0 320 120" style={{ width: '100%', height: 110, borderRadius: 16, background: 'var(--tv-sand)' }} role="img" aria-label={`${name} photo placeholder`}>
        <rect width="320" height="120" fill="var(--tv-sand)" />
        <text x="160" y="64" textAnchor="middle" style={{ font: "500 11px 'ui-monospace',monospace", fill: 'var(--tv-muted)' }}>
          guide photo
        </text>
      </svg>
      <div>
        <div className="tv-row" style={{ gap: 8, marginBottom: 5, alignItems: 'baseline' }}>
          <p style={{ margin: 0, font: "700 19px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>{name}</p>
          <span style={{ font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{rating}</span>
        </div>
        <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{meta}</p>
      </div>
      <p style={{ margin: 0, font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{blurb}</p>
      <div className="tv-row" style={{ gap: 10, marginTop: 'auto', paddingTop: 6 }}>
        <span style={{ marginRight: 'auto', font: "700 17px/1 'Inter Tight','Inter',sans-serif", color: 'var(--tv-ink)' }}>{price}</span>
        <Pill variant="outline" size="sm" onClick={onSwap}>Swap in</Pill>
      </div>
    </Card>
  )
}

export default ProviderCard
