import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import Card from '../../components/traveler/Card'
import Badge from '../../components/traveler/Badge'
import DotNote from '../../components/traveler/DotNote'

const CONFIRMATIONS = [
  { label: 'Flight ACC → KMS, 14 Nov', detail: 'Africa World AW 314 · 09:15, Economy Light', ref: 'AW-9K2T4', status: 'Ticketed', done: true },
  { label: 'Villa Monticello, Accra', detail: '12–13 Nov · 2 nights, breakfast included', ref: 'VM-2210', status: 'Confirmed', done: true },
  { label: 'Four Villages Inn, Kumasi', detail: '14–15 Nov · 2 nights', ref: 'FV-8842', status: 'Confirmed', done: true },
  { label: 'Ridge Royal Hotel, Cape Coast', detail: '16 Nov · 1 night, sea view', ref: 'RR-5107', status: 'Confirmed', done: true },
  { label: 'Intercity car, Kumasi → Cape Coast', detail: '16 Nov · driver assigned 24 hrs before', ref: 'MV-4417-C', status: 'Scheduled', done: false },
]

const TEAM = [
  { initials: 'KM', name: 'Kofi Mensah', role: 'Accra · food and history, days 1–2' },
  { initials: 'AB', name: 'Adwoa Boateng', role: 'Kumasi · craft and textiles, days 3–4' },
  { initials: 'EA', name: 'Esi Amoah', role: 'Cape Coast and Elmina, days 5–6' },
  { initials: 'YD', name: 'Yaw Darko', role: 'Transfers and intercity driving' },
]

const BEFORE_YOU_FLY = [
  { title: 'Yellow fever certificate', note: 'Required on entry. Upload it here.', dot: 'var(--tv-accent)' },
  { title: 'Ghana e-visa', note: "Apply from 12 Oct. We'll remind you.", dot: 'var(--tv-accent)' },
  { title: 'Travel insurance', note: 'Optional. Add through Moovai for $28.', dot: 'var(--tv-muted)' },
]

function Booked() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Bookings">
      <div style={{ padding: '44px 34px', background: 'var(--tv-dark)' }}>
        <p className="tv-row" style={{ margin: '0 0 14px', gap: 10, font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7fd39a' }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(127,211,154,0.16)', color: '#7fd39a', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 12px/1 'Inter',sans-serif" }}>✓</span>
          Booked · reference MV-4417
        </p>
        <p style={{ margin: '0 0 12px', font: "700 44px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.04em', color: '#fff' }}>You&apos;re going to Ghana in 68 days</p>
        <p style={{ margin: '0 0 26px', font: "400 16px/1.55 'Inter',sans-serif", color: 'rgba(255,255,255,0.7)', maxWidth: '60ch' }}>
          Flight ticketed, five nights confirmed, and all four local operators have your itinerary. Tickets and vouchers are in your email and under Bookings.
        </p>
        <div className="tv-row" style={{ gap: 10 }}>
          <Pill variant="accent" onClick={() => navigate('/app/trip')}>Open live trip</Pill>
          <Pill variant="outline-light">Download tickets</Pill>
          <Pill variant="outline-light">Add to calendar</Pill>
        </div>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 20, padding: '28px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 16 }}>
          <Card style={{ padding: '24px 26px' }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Confirmations</p>
            <div className="tv-col">
              {CONFIRMATIONS.map((c) => (
                <div key={c.ref} className="tv-row" style={{ gap: 14, padding: '15px 0', borderTop: '1px solid rgba(26,23,18,0.07)' }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      flex: 'none',
                      borderRadius: '50%',
                      background: c.done ? 'var(--tv-green-tint)' : 'rgba(26,23,18,0.07)',
                      color: c.done ? 'var(--tv-green)' : 'var(--tv-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      font: "700 11px/1 'Inter',sans-serif",
                    }}
                  >
                    {c.done ? '✓' : '·'}
                  </span>
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 4px', font: "600 15px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{c.label}</p>
                    <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{c.detail}</p>
                  </div>
                  <span style={{ font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{c.ref}</span>
                  <Badge tone={c.done ? 'success' : 'neutral'}>{c.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: '24px 26px' }}>
            <div className="tv-row" style={{ gap: 12, marginBottom: 18, alignItems: 'baseline' }}>
              <p style={{ margin: 0, font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Your people on the ground</p>
              <span style={{ marginLeft: 'auto', font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>All four confirmed within 2 hours</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
              {TEAM.map((t) => (
                <div key={t.name} className="tv-row" style={{ gap: 13, background: 'var(--tv-paper)', borderRadius: 18, padding: '16px 18px' }}>
                  <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 13, background: 'var(--tv-sand)', color: 'var(--tv-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px/1 'Inter',sans-serif" }}>{t.initials}</span>
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 3px', font: "600 15px/1.2 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{t.name}</p>
                    <p style={{ margin: 0, font: "400 13px/1.35 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{t.role}</p>
                  </div>
                  <Pill variant="outline" size="sm">Message</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="tv-col" style={{ width: 330, flex: 'none', gap: 16 }}>
          <Card style={{ padding: 24 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Paid</p>
            <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ font: "600 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>$811</span>
              <span style={{ font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Card •••• 4291</span>
            </div>
            <p style={{ margin: '0 0 18px', font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Released to each operator after their leg. Nothing else to pay before you travel.</p>
            <div className="tv-col" style={{ gap: 9 }}>
              <Pill variant="outline" style={{ justifyContent: 'center' }}>View receipt</Pill>
              <Pill variant="outline" style={{ justifyContent: 'center', color: 'var(--tv-muted)' }}>Cancellation policy</Pill>
            </div>
          </Card>

          <Card variant="sand" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 14px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Before you fly</p>
            <div className="tv-col" style={{ gap: 14 }}>
              {BEFORE_YOU_FLY.map((b) => (
                <DotNote key={b.title} dot={b.dot} title={b.title} note={b.note} />
              ))}
            </div>
          </Card>

          <Card variant="dark" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 12px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Change something?</p>
            <p style={{ margin: '0 0 18px', font: "400 15px/1.55 'Inter',sans-serif", color: 'rgba(255,255,255,0.72)' }}>You can still reshape the itinerary until 2 November. Guides adjust; flights and stays may carry a fee.</p>
            <Pill variant="accent" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/app/chat')}>Edit this trip in chat</Pill>
          </Card>
        </div>
      </div>
    </TravelerShell>
  )
}

export default Booked
