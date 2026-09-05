import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import Card from '../../components/traveler/Card'

const SEARCH_CHIPS = ['Accra (ACC)', 'Kumasi (KMS)', 'Sat 14 Nov', '1 adult · One way']

const AIRLINES = [
  { label: 'Africa World Airlines', active: true },
  { label: 'Passion Air', active: true },
  { label: 'Africa Skies', active: false },
]

const STOPS = [
  { label: 'Direct only', active: true },
  { label: '1 stop', active: false },
]

const FARES = [
  { name: 'Economy Light', price: '$61', note: '7 kg cabin bag · no changes', highlight: true },
  { name: 'Economy Standard', price: '$78', note: '20 kg checked · one free change', highlight: false },
  { name: 'Flex', price: '$104', note: '20 kg · free changes and refund', highlight: false },
]

const OTHER_FLIGHTS = [
  { code: 'PA', times: '07:00 → 07:55', dur: '55 min', airline: 'Passion Air, PA 210', note: 'Earliest departure, arrives before check-in', price: '$58' },
  { code: 'PA', times: '16:15 → 17:10', dur: '55 min', airline: 'Passion Air, PA 224', note: 'Would push day 3 activities to day 4', price: '$52' },
  { code: 'AS', times: '19:05 → 20:00', dur: '55 min', airline: 'Africa Skies, AS 118', note: 'Cheapest fare, arrives after dark', price: '$45' },
]

function Flights() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Bookings">
      <div style={{ padding: '22px 34px', background: 'var(--tv-white)', borderBottom: '1px solid var(--tv-line)' }}>
        <p style={{ margin: '0 0 14px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Booking · leg 3 of your itinerary</p>
        <div className="tv-row" style={{ gap: 12 }}>
          <div className="tv-row" style={{ border: '1px solid rgba(26,23,18,0.12)', borderRadius: 100, overflow: 'hidden', background: 'var(--tv-paper)' }}>
            {SEARCH_CHIPS.map((chip, i) => (
              <span key={chip} style={{ padding: '14px 22px', font: "600 15px/1 'Inter',sans-serif", color: i === 3 ? 'var(--tv-muted)' : 'var(--tv-ink)', borderRight: i < 3 ? '1px solid rgba(26,23,18,0.1)' : 'none' }}>{chip}</span>
            ))}
          </div>
          <Pill variant="dark">Search</Pill>
          <span style={{ marginLeft: 'auto', font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Times shown match your day 3 plan: palace visit at 15:00</span>
        </div>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 24, padding: '26px 34px' }}>
        <Card style={{ width: 236, flex: 'none', padding: 22 }}>
          <div className="tv-col" style={{ gap: 24 }}>
            <div>
              <p style={{ margin: '0 0 12px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Price</p>
              <div style={{ height: 4, borderRadius: 4, background: 'rgba(26,23,18,0.1)', position: 'relative', marginBottom: 10 }}>
                <span style={{ position: 'absolute', left: 0, top: 0, height: 4, width: '62%', borderRadius: 4, background: 'var(--tv-accent)' }} />
                <span style={{ position: 'absolute', left: '60%', top: -5, width: 14, height: 14, borderRadius: '50%', background: 'var(--tv-accent)', border: '2px solid #fff' }} />
              </div>
              <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>$45 – $120</p>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Departure</p>
              <div className="tv-col" style={{ gap: 9 }}>
                <Pill variant="soft-accent" size="sm" style={{ justifyContent: 'flex-start' }}>Morning, 06:00–12:00</Pill>
                <Pill variant="muted-outline" size="sm" style={{ justifyContent: 'flex-start' }}>Afternoon, 12:00–18:00</Pill>
                <Pill variant="muted-outline" size="sm" style={{ justifyContent: 'flex-start' }}>Evening, after 18:00</Pill>
              </div>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Airline</p>
              <div className="tv-col" style={{ gap: 10, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>
                {AIRLINES.map((a) => (
                  <span key={a.label} className="tv-row" style={{ gap: 9, color: a.active ? 'var(--tv-ink)' : 'var(--tv-muted)' }}>
                    <span style={{ width: 15, height: 15, borderRadius: 5, flex: 'none', background: a.active ? 'var(--tv-accent)' : 'transparent', border: a.active ? 'none' : '1.5px solid rgba(26,23,18,0.18)' }} />
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Stops</p>
              <div className="tv-col" style={{ gap: 10, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>
                {STOPS.map((s) => (
                  <span key={s.label} className="tv-row" style={{ gap: 9, color: s.active ? 'var(--tv-ink)' : 'var(--tv-muted)' }}>
                    <span style={{ width: 15, height: 15, borderRadius: 5, flex: 'none', background: s.active ? 'var(--tv-accent)' : 'transparent', border: s.active ? 'none' : '1.5px solid rgba(26,23,18,0.18)' }} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="tv-col" style={{ flex: '1 1 0', gap: 14 }}>
          <div className="tv-row" style={{ gap: 10 }}>
            <span style={{ font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>6 direct flights</span>
            <span style={{ font: "400 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>· Sat 14 Nov</span>
            <span className="tv-row" style={{ marginLeft: 'auto', gap: 8 }}>
              <Pill variant="dark" size="sm">Best for your day</Pill>
              <Pill variant="muted-outline" size="sm">Cheapest</Pill>
              <Pill variant="muted-outline" size="sm">Earliest</Pill>
            </span>
          </div>

          <Card variant="highlight" style={{ padding: 24 }}>
            <div className="tv-row" style={{ gap: 24 }}>
              <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 12, background: 'var(--tv-dark)', color: 'var(--tv-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px/1 'Inter',sans-serif" }}>AW</span>
              <div style={{ width: 150 }}>
                <p style={{ margin: '0 0 4px', font: "700 22px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>09:15 → 10:10</p>
                <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>ACC → KMS · direct</p>
              </div>
              <div style={{ width: 130 }}>
                <p style={{ margin: '0 0 4px', font: "600 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>55 min</p>
                <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Africa World, AW 314</p>
              </div>
              <Pill variant="soft-accent" size="sm">Fits day 3</Pill>
              <span style={{ marginLeft: 'auto', font: "800 26px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>$61</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(26,23,18,0.1)' }}>
              {FARES.map((fare) => (
                <div key={fare.name} style={{ border: fare.highlight ? '1.5px solid rgba(255,37,0,0.45)' : '1px solid rgba(26,23,18,0.12)', background: fare.highlight ? 'rgba(255,37,0,0.05)' : 'transparent', borderRadius: 18, padding: 16 }}>
                  <div className="tv-row" style={{ gap: 8, marginBottom: 8, alignItems: 'baseline' }}>
                    <span style={{ font: "700 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{fare.name}</span>
                    <span style={{ marginLeft: 'auto', font: "700 16px/1 'Inter Tight','Inter',sans-serif", color: fare.highlight ? 'var(--tv-accent)' : 'var(--tv-ink)' }}>{fare.price}</span>
                  </div>
                  <p style={{ margin: 0, font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{fare.note}</p>
                </div>
              ))}
            </div>
          </Card>

          {OTHER_FLIGHTS.map((f) => (
            <Card key={f.code + f.times} style={{ padding: '22px 24px' }}>
              <div className="tv-row" style={{ gap: 24 }}>
                <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 12, background: 'var(--tv-sand)', color: 'var(--tv-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px/1 'Inter',sans-serif" }}>{f.code}</span>
                <div style={{ width: 150 }}>
                  <p style={{ margin: '0 0 4px', font: "700 20px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>{f.times}</p>
                  <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>ACC → KMS · direct</p>
                </div>
                <div style={{ width: 130 }}>
                  <p style={{ margin: '0 0 4px', font: "600 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{f.dur}</p>
                  <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{f.airline}</p>
                </div>
                <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)', maxWidth: '24ch' }}>{f.note}</p>
                <span style={{ marginLeft: 'auto', font: "800 24px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>{f.price}</span>
                <Pill variant="outline" size="sm">Select</Pill>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="tv-row" style={{ padding: '20px 34px', background: 'var(--tv-dark)', gap: 20 }}>
        <div>
          <p style={{ margin: '0 0 4px', font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Selected</p>
          <p style={{ margin: 0, font: "600 16px/1 'Inter',sans-serif", color: '#f3f2f6' }}>AW 314 · 09:15 → 10:10 · Economy Light</p>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ margin: '0 0 4px', font: "500 13px/1 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)' }}>Flight total, 1 adult</p>
          <p style={{ margin: 0, font: "800 24px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-accent)' }}>$61</p>
        </div>
        <Pill variant="accent" onClick={() => navigate('/app/itinerary')}>Add to trip and continue to stays</Pill>
      </div>
    </TravelerShell>
  )
}

export default Flights
