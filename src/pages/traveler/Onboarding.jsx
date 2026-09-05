import { useState } from 'react'
import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import InfoTile from '../../components/traveler/InfoTile'
import Badge from '../../components/traveler/Badge'
import '../../assets/css/traveler.css'

const CITIES = ['Accra', 'Kumasi', 'Cape Coast']

const QUICK_FACTS = [
  { label: 'Dates', value: '12 – 17 Nov 2026' },
  { label: 'Travelers', value: '1 adult' },
  { label: 'Budget, all in', value: 'Around $800' },
  { label: 'Arriving from', value: 'London (LHR)' },
]

const INTERESTS_SELECTED = ['Street food', 'History']
const INTERESTS_MORE = ['Live music', 'Markets', 'Nature', 'Nightlife', 'Craft & textiles']

const LEGS = [
  { city: 'Accra' },
  { city: 'Kumasi' },
  { city: 'Cape Coast' },
]

function Onboarding() {
  const navigate = useNavigate()
  const [interests, setInterests] = useState(INTERESTS_SELECTED)

  const toggleInterest = (label) => {
    setInterests((cur) => (cur.includes(label) ? cur.filter((i) => i !== label) : [...cur, label]))
  }

  return (
    <TravelerShell active="Home">
      <div className="tv-row" style={{ alignItems: 'stretch', minHeight: '100vh' }}>
        <div className="tv-col" style={{ flex: '1 1 0', padding: '56px 64px' }}>
          <p style={{ margin: '0 0 16px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tv-accent)' }}>Step 1 of 3 — the basics</p>
          <h1 style={{ margin: '0 0 14px', font: "800 52px/0.98 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.04em', color: 'var(--tv-ink)', maxWidth: '16ch' }}>Where are you headed first?</h1>
          <p style={{ margin: '0 0 40px', font: "400 17px/1.55 'Inter',sans-serif", letterSpacing: '-0.16px', color: 'var(--tv-muted)', maxWidth: '46ch' }}>
            Rough answers are fine. You&apos;ll shape the details in a conversation next, and nothing is booked until you confirm.
          </p>

          <p style={{ margin: '0 0 12px', font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Cities</p>
          <div className="tv-row" style={{ flexWrap: 'wrap', gap: 9, marginBottom: 32 }}>
            {CITIES.map((city) => (
              <Pill key={city} variant="dark">{city} ×</Pill>
            ))}
            <Pill variant="muted-outline">+ Add a city</Pill>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32, maxWidth: 560 }}>
            {QUICK_FACTS.map((fact) => (
              <InfoTile key={fact.label} label={fact.label} value={fact.value} />
            ))}
          </div>

          <p style={{ margin: '0 0 12px', font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>What you&apos;re here for</p>
          <div className="tv-row" style={{ flexWrap: 'wrap', gap: 9, marginBottom: 44, maxWidth: 620 }}>
            {[...INTERESTS_SELECTED, ...INTERESTS_MORE].map((label) => (
              <Pill
                key={label}
                variant={interests.includes(label) ? 'soft-accent' : 'muted-outline'}
                size="sm"
                onClick={() => toggleInterest(label)}
              >
                {label}
              </Pill>
            ))}
          </div>

          <div className="tv-row" style={{ gap: 20, marginTop: 'auto' }}>
            <Pill variant="accent" onClick={() => navigate('/app/chat')}>Continue to chat</Pill>
            <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
              or <a href="#" onClick={(e) => { e.preventDefault(); navigate('/app/chat') }}>skip and start from a blank conversation</a>
            </span>
          </div>
        </div>

        <div className="tv-col tv-pane-sticky" style={{ width: 520, flex: 'none', background: 'var(--tv-darker)', padding: '56px 48px', justifyContent: 'center', gap: 26, overflowY: 'auto' }}>
          <p style={{ margin: 0, font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>What happens next</p>
          <div className="tv-col" style={{ background: 'var(--tv-dark)', borderRadius: 32, padding: 26, gap: 12, boxShadow: '0 50px 110px -40px rgba(0,0,0,0.6)' }}>
            <div style={{ alignSelf: 'flex-end', maxWidth: '88%', background: 'rgba(255,255,255,0.1)', color: '#f3f2f6', borderRadius: 16, borderBottomRightRadius: 4, padding: '12px 16px', font: "400 14px/1.4 'Inter',sans-serif" }}>
              3 cities, 6 days, ~$800. Love street food and history.
            </div>
            <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: 'var(--tv-accent)', color: '#fff', borderRadius: 16, borderBottomLeftRadius: 4, padding: '12px 16px', font: "400 14px/1.4 'Inter',sans-serif" }}>
              Got it — matching you with 3 local guides now.
            </div>
            <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 18 }}>
              <p style={{ margin: '0 0 12px', font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Your itinerary</p>
              <div className="tv-col" style={{ gap: 10, marginBottom: 16 }}>
                {LEGS.map((leg) => (
                  <div key={leg.city} className="tv-row" style={{ justifyContent: 'space-between', font: "400 15px/1 'Inter',sans-serif", color: '#f3f2f6' }}>
                    <span>{leg.city}</span>
                    <Badge tone="success" style={{ color: '#b9f5c8', background: 'rgba(185,245,200,0.12)' }}>Guide matched</Badge>
                  </div>
                ))}
              </div>
              <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)', color: '#f3f2f6', font: "400 14px/1 'Inter',sans-serif" }}>
                <span>Estimated total</span>
                <strong style={{ font: "800 20px/1 'Inter Tight','Inter',sans-serif", color: 'var(--tv-accent)' }}>$780</strong>
              </div>
            </div>
          </div>
          <p style={{ margin: 0, font: "400 15px/1.55 'Inter',sans-serif", color: 'rgba(255,255,255,0.72)', maxWidth: '38ch' }}>
            Every city leg is fulfilled by a vetted local operator. You can swap any match before you pay.
          </p>
        </div>
      </div>
    </TravelerShell>
  )
}

export default Onboarding
