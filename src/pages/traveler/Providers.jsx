import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import ProviderCard from '../../components/traveler/ProviderCard'

const FILTERS = [
  { label: 'Guides', variant: 'dark' },
  { label: 'Stays', variant: 'muted-outline' },
  { label: 'Transport', variant: 'muted-outline' },
]

const TAG_FILTERS = ['Craft & textiles', 'English · Twi', 'Under $40 / day']

const DETAILS = [
  { label: 'Two days include', value: 'Manhyia Palace, Bonwire kente, Kejetia market' },
  { label: 'Languages', value: 'English, Twi, some French' },
  { label: 'Vetting', value: 'ID, licence and references checked Aug 2026' },
]

const ALTERNATES = [
  { name: 'Yaw Osei', rating: '4.8', meta: '96 trips · history focus', blurb: 'Ex-museum staff. Heavier on Ashanti history, lighter on markets. Has his own car.', price: '$62' },
  { name: 'Akosua Frimpong', rating: '4.7', meta: '54 trips · food and markets', blurb: 'Kejetia market at dawn, then a cooking session at her family house in Bantama.', price: '$48' },
  { name: 'Kwabena Antwi', rating: '4.9', meta: '211 trips · driver-guide', blurb: 'Driver first, guide second. Best value if you mostly want to cover ground.', price: '$40' },
]

function Providers() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Providers">
      <div className="tv-topbar">
        <div style={{ marginRight: 'auto' }}>
          <p className="tv-topbar-eyebrow">Itinerary · Kumasi leg · days 3–4</p>
          <p className="tv-topbar-title">Your guide in Kumasi</p>
        </div>
        <Pill variant="outline" onClick={() => navigate('/app/itinerary')}>Back to itinerary</Pill>
      </div>

      <div className="tv-col" style={{ padding: '28px 34px', gap: 20 }}>
        <div className="tv-row" style={{ gap: 9, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <Pill key={f.label} variant={f.variant} size="sm">{f.label}</Pill>
          ))}
          <span style={{ width: 1, height: 24, background: 'rgba(26,23,18,0.12)', margin: '0 6px' }} />
          {TAG_FILTERS.map((tag) => (
            <Pill key={tag} variant="muted-outline" size="sm">{tag}</Pill>
          ))}
          <span style={{ marginLeft: 'auto', font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>4 vetted operators available for 14–15 Nov</span>
        </div>

        <div className="tv-card tv-card--highlight tv-row" style={{ padding: 30, gap: 28 }}>
          <div className="tv-col" style={{ width: 190, flex: 'none', gap: 12 }}>
            <svg viewBox="0 0 190 190" style={{ width: 190, height: 190, borderRadius: 22, background: 'var(--tv-sand)' }} role="img" aria-label="Provider photo placeholder">
              <rect width="190" height="190" fill="var(--tv-sand)" />
              <text x="95" y="98" textAnchor="middle" style={{ font: "500 11px 'ui-monospace',monospace", fill: 'var(--tv-muted)' }}>guide photo</text>
            </svg>
            <span style={{ textAlign: 'center', padding: 8, borderRadius: 100, background: 'var(--tv-accent-tint)', color: 'var(--tv-accent)', font: "700 11px/1.4 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Matched by Moovai</span>
          </div>
          <div style={{ flex: '1 1 0' }}>
            <div className="tv-row" style={{ gap: 12, marginBottom: 8, alignItems: 'baseline' }}>
              <h3 style={{ margin: 0, font: "700 28px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>Adwoa Boateng</h3>
              <span style={{ font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>4.9</span>
              <span style={{ font: "400 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>· 128 trips · Kumasi, 9 years</span>
            </div>
            <p style={{ margin: '0 0 18px', font: "400 15px/1.55 'Inter',sans-serif", color: 'var(--tv-muted)', maxWidth: '62ch' }}>
              Weaver by training, guide by trade. Adwoa runs the Bonwire kente workshops and the Manhyia Palace visit herself, and keeps the two days paced for someone who wants to talk to makers rather than tick off sights.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 22 }}>
              {DETAILS.map((d) => (
                <div key={d.label} className="tv-info-tile">
                  <p className="tv-info-tile-label">{d.label}</p>
                  <p className="tv-info-tile-value" style={{ fontWeight: 500 }}>{d.value}</p>
                </div>
              ))}
            </div>
            <div className="tv-row" style={{ gap: 14 }}>
              <div style={{ marginRight: 'auto' }}>
                <p style={{ margin: 0, font: "800 26px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>
                  $56 <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>for both days, paid to Adwoa</span>
                </p>
              </div>
              <Pill variant="accent" onClick={() => navigate('/app/itinerary')}>Keep this match</Pill>
              <Pill variant="outline">Message first</Pill>
            </div>
          </div>
        </div>

        <p style={{ margin: '6px 0 0', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Or swap for one of these three</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {ALTERNATES.map((p) => (
            <ProviderCard key={p.name} {...p} onSwap={() => navigate('/app/itinerary')} />
          ))}
        </div>
      </div>
    </TravelerShell>
  )
}

export default Providers
