import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Card from '../../components/traveler/Card'
import Pill from '../../components/traveler/Pill'
import Badge from '../../components/traveler/Badge'

const CITY_FILTERS = ['All 6 days', 'Accra', 'Kumasi', 'Cape Coast']

const DAYS = [
  {
    n: '01', city: 'Accra', date: 'Thu 12 Nov', cost: '$142',
    items: [
      { est: 'Est. 1 hr', title: 'Arrival, Kotoka International', by: 'Airport transfer · Yaw, Moovai transport partner', price: 'Included' },
      { est: 'Overnight', title: 'Check in, Villa Monticello', by: 'Boutique hotel, Airport Residential', price: '$68' },
      { est: 'Est. 3 hrs', title: 'Jamestown walk and lighthouse', by: 'Kofi Mensah · local guide', price: '$34' },
      { est: 'Est. 2 hrs', title: 'Dinner, Buka restaurant', by: 'Booked table for one', price: '$18' },
    ],
  },
  {
    n: '02', city: 'Accra', date: 'Fri 13 Nov', cost: '$96',
    items: [
      { est: 'Est. half day', title: 'Makola market, food stalls first', by: 'Kofi Mensah · local guide', price: '$28' },
      { est: 'Est. 90 min', title: 'Kwame Nkrumah Memorial Park', by: 'Entry and guided context', price: '$9' },
      { est: 'Est. 4 hrs', title: 'Osu chop bar crawl', by: 'Kofi Mensah · four stops, transport included', price: '$41' },
    ],
  },
  {
    n: '03', city: 'Accra → Kumasi', date: 'Sat 14 Nov', cost: '$174',
    items: [
      { est: 'Est. 55 min', title: 'Flight ACC → KMS', by: 'Africa World Airlines · not selected yet', price: 'from $61' },
      { est: 'Overnight', title: 'Check in, Four Villages Inn', by: 'Family-run guesthouse, Bantama', price: '$54' },
      { est: 'Est. 2 hrs', title: 'Manhyia Palace Museum', by: 'Adwoa Boateng · local guide', price: '$26' },
    ],
  },
]

const COST_BREAKDOWN = [
  { label: 'Flights', value: '$186' },
  { label: 'Accommodation, 5 nights', value: '$310' },
  { label: 'Guides & experiences', value: '$204' },
  { label: 'Transport & transfers', value: '$62' },
  { label: 'Moovai fee', value: '$18' },
]

const READINESS = [
  { label: '3 of 3 city guides confirmed', ok: true },
  { label: 'Stays held for 24 hours', ok: true },
  { label: 'Flight ACC → KMS not selected yet', ok: false },
]

function DayCard({ day }) {
  return (
    <Card style={{ padding: '24px 26px' }}>
      <div className="tv-row" style={{ gap: 12, alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid rgba(26,23,18,0.08)' }}>
        <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 100, background: 'var(--tv-accent-tint)', color: 'var(--tv-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 16px/1 'Inter Tight','Inter',sans-serif" }}>{day.n}</span>
        <div>
          <p style={{ margin: '0 0 3px', font: "700 18px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>{day.city}</p>
          <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{day.date}</p>
        </div>
        <span style={{ marginLeft: 'auto', font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{day.cost}</span>
      </div>
      <div className="tv-col" style={{ gap: 2, paddingTop: 6 }}>
        {day.items.map((item) => (
          <div key={item.title} className="tv-row" style={{ alignItems: 'flex-start', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(26,23,18,0.06)' }}>
            <div style={{ flex: '1 1 0' }}>
              <p style={{ margin: '0 0 4px', font: "600 15px/1.35 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{item.title}</p>
              <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{item.by}</p>
            </div>
            <Badge tone="neutral" style={{ flex: 'none' }}>{item.est}</Badge>
            <span style={{ width: 56, textAlign: 'right', font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{item.price}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Itinerary() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Itinerary">
      <div className="tv-topbar">
        <div style={{ marginRight: 'auto' }}>
          <p className="tv-topbar-eyebrow">Itinerary · draft</p>
          <p className="tv-topbar-title">Accra · Kumasi · Cape Coast</p>
        </div>
        <Pill variant="outline" onClick={() => navigate('/app/itinerary/edit')}>Edit manually</Pill>
        <Pill variant="outline">Share</Pill>
        <Pill variant="outline">Export PDF</Pill>
        <Pill variant="accent" onClick={() => navigate('/app/checkout')}>Book this trip</Pill>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 26, padding: '30px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 14 }}>
          <div className="tv-row" style={{ gap: 8, marginBottom: 4 }}>
            {CITY_FILTERS.map((filter, i) => (
              <Pill key={filter} variant={i === 0 ? 'dark' : 'muted-outline'} size="sm">{filter}</Pill>
            ))}
          </div>

          {DAYS.map((day) => (
            <DayCard key={day.n} day={day} />
          ))}

          <div className="tv-row" style={{ justifyContent: 'center', gap: 10, border: '1.5px dashed rgba(26,23,18,0.18)', borderRadius: 26, padding: 22, font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
            Days 4 to 6 continue below · Kumasi crafts, Lake Bosomtwe, Cape Coast castles
          </div>
        </div>

        <div className="tv-col" style={{ width: 320, flex: 'none', gap: 14 }}>
          <Card style={{ padding: 24 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Cost breakdown</p>
            <div className="tv-col" style={{ gap: 12, font: "400 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
              {COST_BREAKDOWN.map((row) => (
                <div key={row.label} className="tv-row" style={{ justifyContent: 'space-between' }}>
                  <span>{row.label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--tv-ink)' }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(26,23,18,0.1)' }}>
              <span style={{ font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Total</span>
              <span style={{ font: "800 30px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-accent)' }}>$780</span>
            </div>
            <p style={{ margin: '10px 0 0', font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Paid once, split automatically to each local operator.</p>
          </Card>

          <Card variant="sand" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 14px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Before you book</p>
            <div className="tv-col" style={{ gap: 12 }}>
              {READINESS.map((row) => (
                <div key={row.label} className="tv-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 7, height: 7, marginTop: 6, borderRadius: '50%', flex: 'none', background: row.ok ? 'var(--tv-green)' : 'var(--tv-accent)' }} />
                  <span style={{ font: "500 14px/1.4 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{row.label}</span>
                </div>
              ))}
            </div>
            <Pill variant="dark" style={{ width: '100%', marginTop: 18 }} onClick={() => navigate('/app/flights')}>Choose flights</Pill>
          </Card>
        </div>
      </div>
    </TravelerShell>
  )
}

export default Itinerary
