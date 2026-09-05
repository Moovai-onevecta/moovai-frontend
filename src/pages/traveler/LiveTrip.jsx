import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import Card from '../../components/traveler/Card'

const STATS = [
  { label: 'Next check-in', value: '18:00 today' },
  { label: 'Spent so far', value: '$412 of $780' },
]

const TODAY = [
  { time: '08:30', title: 'Breakfast at the inn', by: 'Included with your stay', status: 'Done', dot: 'var(--tv-green)', chipBg: 'var(--tv-green-tint)' },
  { time: '10:00', title: 'Manhyia Palace Museum', by: 'Adwoa Boateng · 2 hrs', status: 'Done', dot: 'var(--tv-green)', chipBg: 'var(--tv-green-tint)' },
  { time: '15:00', title: 'Bonwire kente workshop', by: 'Adwoa Boateng · pickup at the inn', status: 'Next', dot: 'var(--tv-accent)', chipBg: 'var(--tv-accent-tint)' },
  { time: '19:30', title: 'Dinner, Chopsticks Kumasi', by: 'Table for one, booked', status: 'Later', dot: 'var(--tv-muted)', chipBg: 'rgba(26,23,18,0.07)' },
]

const DOCS = [
  { title: 'Boarding pass AW 314', meta: 'Used · 14 Nov' },
  { title: 'Four Villages Inn', meta: 'Booking ref FV-8842' },
  { title: 'Cape Coast car, 16 Nov', meta: 'Driver details in 2 days' },
]

const CHECKINS = [
  { title: 'Arrival in Kumasi', note: 'All good — confirmed 11:40', dot: 'var(--tv-green)' },
  { title: 'Hotel check-in', note: 'All good — confirmed 12:15', dot: 'var(--tv-green)' },
  { title: 'Evening check-in', note: "We'll ask how the day went at 18:00", dot: 'var(--tv-accent)' },
]

const REPORT_ACTIONS = ["Guide hasn't arrived", 'Problem with my stay', 'I want to change tomorrow']

function LiveTrip() {
  return (
    <TravelerShell active="Live trip">
      <div className="tv-row" style={{ padding: '30px 34px', background: 'var(--tv-dark)', gap: 26 }}>
        <div>
          <p className="tv-row" style={{ margin: '0 0 8px', gap: 9, font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--tv-accent)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tv-accent)', boxShadow: '0 0 0 5px rgba(255,37,0,0.18)' }} />
            Trip in progress
          </p>
          <p style={{ margin: 0, font: "700 34px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.035em', color: '#fff' }}>Day 3 of 6 — Kumasi</p>
        </div>
        <div className="tv-row" style={{ marginLeft: 'auto', gap: 12 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '14px 20px' }}>
              <p style={{ margin: '0 0 5px', font: "600 11px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              <p style={{ margin: 0, font: "700 18px/1 'Inter Tight','Inter',sans-serif", color: '#f3f2f6' }}>{s.value}</p>
            </div>
          ))}
          <Pill variant="accent">Get help now</Pill>
        </div>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 20, padding: '28px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 16 }}>
          <Card variant="highlight" style={{ padding: 26 }}>
            <p style={{ margin: '0 0 16px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--tv-accent)' }}>Happening in 40 minutes</p>
            <div className="tv-row" style={{ gap: 20 }}>
              <span style={{ width: 56, height: 56, flex: 'none', borderRadius: 16, background: 'var(--tv-sand)', color: 'var(--tv-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 16px/1 'Inter',sans-serif" }}>AB</span>
              <div style={{ flex: '1 1 0' }}>
                <p style={{ margin: '0 0 5px', font: "700 22px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>Bonwire kente workshop</p>
                <p style={{ margin: 0, font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Adwoa Boateng is picking you up at Four Villages Inn · 15:00</p>
              </div>
              <Pill variant="dark">Call Adwoa</Pill>
              <Pill variant="outline">Running late</Pill>
            </div>
          </Card>

          <Card style={{ padding: '24px 26px' }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Today, Sat 14 Nov</p>
            <div className="tv-col">
              {TODAY.map((t) => (
                <div key={t.time} className="tv-row" style={{ gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(26,23,18,0.06)' }}>
                  <span style={{ width: 60, flex: 'none', font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{t.time}</span>
                  <span style={{ width: 8, height: 8, flex: 'none', borderRadius: '50%', background: t.dot }} />
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 4px', font: "600 15px/1.35 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{t.title}</p>
                    <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{t.by}</p>
                  </div>
                  <span style={{ font: "600 12px/1 'Inter',sans-serif", color: t.dot, background: t.chipBg, padding: '6px 11px', borderRadius: 999 }}>{t.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="sand" style={{ padding: '24px 26px' }}>
            <p style={{ margin: '0 0 16px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Tickets and documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {DOCS.map((doc) => (
                <div key={doc.title} style={{ background: 'var(--tv-white)', borderRadius: 18, padding: '16px 18px' }}>
                  <p style={{ margin: '0 0 5px', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{doc.title}</p>
                  <p style={{ margin: 0, font: "400 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{doc.meta}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="tv-col" style={{ width: 320, flex: 'none', gap: 16 }}>
          <Card style={{ padding: 24 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Check-ins</p>
            <div className="tv-col" style={{ gap: 16 }}>
              {CHECKINS.map((c) => (
                <div key={c.title} className="tv-row" style={{ gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 8, height: 8, marginTop: 6, borderRadius: '50%', flex: 'none', background: c.dot }} />
                  <div>
                    <p style={{ margin: '0 0 3px', font: "600 14px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{c.title}</p>
                    <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="dark" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 12px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Something wrong?</p>
            <p style={{ margin: '0 0 18px', font: "400 15px/1.55 'Inter',sans-serif", color: 'rgba(255,255,255,0.72)' }}>Report it here and it goes to a person in Kumasi, not a bot loop. Median response, 2 minutes.</p>
            <div className="tv-col" style={{ gap: 9 }}>
              {REPORT_ACTIONS.map((action) => (
                <Pill key={action} variant="ghost-dark" style={{ justifyContent: 'flex-start' }}>{action}</Pill>
              ))}
              <Pill variant="accent" style={{ justifyContent: 'center' }}>Talk to someone now</Pill>
            </div>
          </Card>

          <Card style={{ padding: 24 }}>
            <p style={{ margin: '0 0 10px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Coming up</p>
            <p style={{ margin: '0 0 14px', font: "600 16px/1.35 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Kumasi → Cape Coast by private car, Mon 16 Nov, 08:00</p>
            <p style={{ margin: 0, font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Stop at Lake Bosomtwe on the way. Driver assigned 24 hours before.</p>
          </Card>
        </div>
      </div>
    </TravelerShell>
  )
}

export default LiveTrip
