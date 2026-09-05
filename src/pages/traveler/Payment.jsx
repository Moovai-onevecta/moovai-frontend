import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import Card from '../../components/traveler/Card'

const TRAVELER_FIELDS = [
  { label: 'Full name, as on passport', value: 'Ama Owusu' },
  { label: 'Passport', value: 'GB · expires Mar 2027' },
  { label: 'Email', value: 'ama.owusu@email.com' },
  { label: 'Phone, for your guides', value: '+44 7700 900312' },
]

const PAY_OPTIONS = [
  { title: 'Pay in full now', note: 'Everything confirmed today. Free cancellation until 2 Nov.', amount: '$811', active: true },
  { title: 'Deposit now, rest on 2 Nov', note: 'Holds flights and stays. Guides confirmed immediately.', amount: '$203', amountNote: 'now', active: false },
]

const PAY_METHODS = ['Card', 'Mobile money', 'Bank transfer']

const STEPS = ['Itinerary', 'Travelers', 'Payment']

const PAYOUT_LINES = [
  { label: 'Flight ACC → KMS', to: 'Africa World Airlines · AW 314, Economy Light', amount: '$61' },
  { label: 'Accommodation, 5 nights', to: 'Villa Monticello, Four Villages Inn, Ridge Royal', amount: '$310' },
  { label: 'Guides and experiences', to: 'Kofi Mensah, Adwoa Boateng, Esi Amoah', amount: '$235' },
  { label: 'Transport and transfers', to: 'Yaw Darko · airport and intercity car', amount: '$62' },
  { label: 'Elmina addition', to: 'Approved in chat, 2 Sep', amount: '$34' },
  { label: 'Moovai fee', to: '2.3%, no markup on operator prices', amount: '$19' },
]

const AFTER_PAY_STEPS = [
  'Flight ticketed and hotel vouchers issued, usually inside 5 minutes.',
  'Each guide gets your itinerary and confirms within 2 hours.',
  'Your trip moves to Live trip, where you can reach a person in-country.',
]

function Payment() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Bookings">
      <div className="tv-topbar">
        <div style={{ marginRight: 'auto' }}>
          <p className="tv-topbar-eyebrow">Checkout · one payment, split to each operator</p>
          <p className="tv-topbar-title">Confirm and book your trip</p>
        </div>
        <div className="tv-row" style={{ gap: 10 }}>
          {STEPS.map((step, i) => (
            <span key={step} className="tv-row" style={{ gap: 20 }}>
              <span className="tv-row" style={{ gap: 8, font: "600 13px/1 'Inter',sans-serif", color: i === 2 ? 'var(--tv-accent)' : 'var(--tv-ink)' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: i === 2 ? 'var(--tv-accent)' : 'var(--tv-dark)', color: i === 2 ? '#fff' : 'var(--tv-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 11px/1 'Inter',sans-serif" }}>
                  {i === 2 ? '3' : '✓'}
                </span>
                {step}
              </span>
              {i < STEPS.length - 1 && <span style={{ width: 26, height: 1, background: 'rgba(26,23,18,0.18)' }} />}
            </span>
          ))}
        </div>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 22, padding: '26px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 16 }}>
          <Card style={{ padding: 26 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Traveler</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {TRAVELER_FIELDS.map((f) => (
                <div key={f.label} className="tv-info-tile tv-info-tile--white">
                  <p className="tv-info-tile-label">{f.label}</p>
                  <p className="tv-info-tile-value">{f.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: 26 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>How you want to pay</p>
            <div className="tv-col" style={{ gap: 12, marginBottom: 22 }}>
              {PAY_OPTIONS.map((opt) => (
                <div
                  key={opt.title}
                  className="tv-row"
                  style={{
                    gap: 14,
                    borderRadius: 18,
                    padding: '18px 20px',
                    border: opt.active ? '1.5px solid rgba(255,37,0,0.45)' : '1px solid rgba(26,23,18,0.12)',
                    background: opt.active ? 'rgba(255,37,0,0.04)' : 'transparent',
                  }}
                >
                  <span style={{ width: 18, height: 18, flex: 'none', borderRadius: '50%', border: opt.active ? '5px solid var(--tv-accent)' : '1.5px solid rgba(26,23,18,0.24)', background: '#fff' }} />
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 4px', font: "600 16px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{opt.title}</p>
                    <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{opt.note}</p>
                  </div>
                  <span style={{ font: "700 20px/1 'Inter Tight','Inter',sans-serif", color: 'var(--tv-ink)' }}>
                    {opt.amount} {opt.amountNote && <span style={{ font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{opt.amountNote}</span>}
                  </span>
                </div>
              ))}
            </div>

            <p style={{ margin: '0 0 14px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Payment method</p>
            <div className="tv-row" style={{ gap: 10, marginBottom: 16 }}>
              {PAY_METHODS.map((m, i) => (
                <Pill key={m} variant={i === 0 ? 'dark' : 'outline'} size="sm">{m}</Pill>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
              <div className="tv-info-tile tv-info-tile--white">
                <p className="tv-info-tile-label">Card number</p>
                <p className="tv-info-tile-value">•••• •••• •••• 4291</p>
              </div>
              <div className="tv-info-tile tv-info-tile--white">
                <p className="tv-info-tile-label">Expiry</p>
                <p className="tv-info-tile-value">04 / 29</p>
              </div>
              <div className="tv-info-tile tv-info-tile--white">
                <p className="tv-info-tile-label">CVC</p>
                <p className="tv-info-tile-value" style={{ color: 'var(--tv-muted)' }}>•••</p>
              </div>
            </div>
            <div className="tv-row" style={{ gap: 11, alignItems: 'flex-start', marginTop: 18 }}>
              <span style={{ width: 18, height: 18, flex: 'none', borderRadius: 6, background: 'var(--tv-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 11px/1 'Inter',sans-serif" }}>✓</span>
              <p style={{ margin: 0, font: "400 13px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)', maxWidth: '64ch' }}>
                I understand each leg is fulfilled by an independent local operator, and I accept Moovai&apos;s booking terms and cancellation policy.
              </p>
            </div>
          </Card>
        </div>

        <div className="tv-col" style={{ width: 360, flex: 'none', gap: 16 }}>
          <Card variant="highlight" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 4px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Ghana, 12–17 Nov 2026</p>
            <p style={{ margin: '0 0 20px', font: "600 17px/1.35 'Inter',sans-serif", color: 'var(--tv-ink)' }}>4 cities · 1 traveler · 6 days</p>
            <div className="tv-col" style={{ gap: 14 }}>
              {PAYOUT_LINES.map((l) => (
                <div key={l.label} className="tv-row" style={{ gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 3px', font: "600 14px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{l.label}</p>
                    <p style={{ margin: 0, font: "400 13px/1.35 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{l.to}</p>
                  </div>
                  <span style={{ font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{l.amount}</span>
                </div>
              ))}
            </div>
            <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(26,23,18,0.1)' }}>
              <span style={{ font: "600 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Total due today</span>
              <span style={{ font: "800 32px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-accent)' }}>$811</span>
            </div>
            <Pill variant="accent" style={{ width: '100%', marginTop: 18, justifyContent: 'center' }} onClick={() => navigate('/app/booked')}>Pay $811 and book</Pill>
            <p style={{ margin: '12px 0 0', textAlign: 'center', font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Held in escrow. Operators are paid after each leg.</p>
          </Card>

          <Card variant="sand" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 14px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>What happens when you pay</p>
            <div className="tv-col" style={{ gap: 13 }}>
              {AFTER_PAY_STEPS.map((step, i) => (
                <div key={step} className="tv-row" style={{ gap: 11, alignItems: 'flex-start' }}>
                  <span style={{ width: 20, flex: 'none', font: "700 13px/1.4 'Inter',sans-serif", color: 'var(--tv-accent)' }}>{i + 1}</span>
                  <p style={{ margin: 0, font: "500 14px/1.45 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </TravelerShell>
  )
}

export default Payment
