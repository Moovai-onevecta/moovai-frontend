import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import Card from '../../components/traveler/Card'
import Badge from '../../components/traveler/Badge'
import DotNote from '../../components/traveler/DotNote'

const SEARCH_RESULTS = [
  { kind: 'Activity', title: 'Kakum canopy walk at dawn', by: 'Park entry + transfer · Esi Amoah', est: 'Est. half day', price: '$31' },
  { kind: 'Activity', title: 'Kakum rainforest night walk', by: 'Park ranger led · groups of 8', est: 'Est. 3 hrs', price: '$22' },
  { kind: 'Stay', title: 'Rainforest Lodge, Kakum edge', by: 'Cabin, 1 night · free cancellation', est: 'Overnight', price: '$64' },
]

const EDIT_ROWS = [
  { title: 'Cape Coast Castle, with a historian', by: 'Esi Amoah · local guide', est: 'Est. 3 hrs', price: '$24', active: false },
  { title: 'Kakum canopy walk at dawn', by: 'Park entry + transfer · being edited', est: 'Est. half day', price: '$31', active: true },
  { title: 'Elmina fishing harbour and lunch', by: 'Esi Amoah · local guide', est: 'Est. 4 hrs', price: '$19', active: false },
  { title: 'Ridge Royal Hotel, Cape Coast', by: 'Sea view room · 2 nights', est: 'Overnight', price: '$44', active: false },
]

const DAY_OPTIONS = ['4', '5', '6']
const TIME_OPTIONS = ['1–2 hrs', '3–4 hrs', 'Half day', 'Full day']

const NOTICED = [
  { dot: 'var(--tv-accent)', text: 'Day 5 now has a half day and two 3-hour items. That is tight with the drive to Elmina.' },
  { dot: 'var(--tv-muted)', text: 'Moving the harbour walk to day 6 would even it out.' },
]

function EditItinerary() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Itinerary">
      <div className="tv-topbar">
        <div style={{ marginRight: 'auto' }}>
          <p className="tv-topbar-eyebrow" style={{ color: 'var(--tv-accent)' }}>Editing · unsaved changes</p>
          <p className="tv-topbar-title">Ghana — day 5, Cape Coast</p>
        </div>
        <span style={{ font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Autosaved 40 seconds ago</span>
        <Pill variant="outline">Undo</Pill>
        <Pill variant="outline">Ask Moovai to check</Pill>
        <Pill variant="dark" onClick={() => navigate('/app/itinerary')}>Save changes</Pill>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 22, padding: '26px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 16 }}>
          <div className="tv-row" style={{ gap: 12 }}>
            <div className="tv-row" style={{ flex: '1 1 0', gap: 12, background: 'var(--tv-white)', border: '1px solid rgba(26,23,18,0.14)', borderRadius: 100, padding: '14px 20px', boxShadow: 'var(--tv-shadow-card)' }}>
              <span style={{ width: 15, height: 15, flex: 'none', borderRadius: '50%', border: '2px solid var(--tv-muted)' }} />
              <span style={{ flex: '1 1 0', font: "400 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Kakum</span>
              <Badge tone="neutral">Day 5</Badge>
            </div>
            <Pill variant="outline">Move a day</Pill>
            <Pill variant="outline">Add a day</Pill>
          </div>

          <Card style={{ padding: 20 }}>
            <p style={{ margin: '0 0 12px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Search results for "Kakum"</p>
            <div className="tv-col">
              {SEARCH_RESULTS.map((r) => (
                <div key={r.title} className="tv-row" style={{ gap: 14, padding: '14px 0', borderTop: '1px solid rgba(26,23,18,0.07)' }}>
                  <span style={{ width: 40, height: 40, flex: 'none', borderRadius: 12, background: 'var(--tv-sand)', color: 'var(--tv-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 11px/1 'Inter',sans-serif" }}>{r.kind}</span>
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 4px', font: "600 15px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{r.title}</p>
                    <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{r.by}</p>
                  </div>
                  <Badge tone="neutral">{r.est}</Badge>
                  <span style={{ width: 52, textAlign: 'right', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{r.price}</span>
                  <Pill variant="accent" size="sm">Add</Pill>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: '24px 26px' }}>
            <div className="tv-row" style={{ gap: 12, alignItems: 'baseline', paddingBottom: 14, borderBottom: '1px solid rgba(26,23,18,0.08)' }}>
              <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 100, background: 'var(--tv-accent-tint)', color: 'var(--tv-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 16px/1 'Inter Tight','Inter',sans-serif" }}>05</span>
              <div style={{ flex: '1 1 0' }}>
                <p style={{ margin: '0 0 3px', font: "700 18px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>Cape Coast</p>
                <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Mon 16 Nov · drag rows to reorder</p>
              </div>
              <span style={{ font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>$118</span>
            </div>
            <div className="tv-col" style={{ gap: 2, paddingTop: 6 }}>
              {EDIT_ROWS.map((row) => (
                <div
                  key={row.title}
                  className="tv-row"
                  style={{
                    gap: 14,
                    padding: '14px 12px',
                    margin: '0 -12px',
                    borderRadius: 16,
                    background: row.active ? 'rgba(255,37,0,0.05)' : 'transparent',
                    border: row.active ? '1.5px solid rgba(255,37,0,0.4)' : '1px solid transparent',
                  }}
                >
                  <span style={{ width: 14, flex: 'none', font: "700 14px/1 'Inter',sans-serif", color: 'rgba(26,23,18,0.28)' }}>⠿</span>
                  <div style={{ flex: '1 1 0' }}>
                    <p style={{ margin: '0 0 4px', font: "600 15px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{row.title}</p>
                    <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{row.by}</p>
                  </div>
                  <Badge tone="neutral">{row.est}</Badge>
                  <span style={{ width: 52, textAlign: 'right', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{row.price}</span>
                  <span className="tv-row" style={{ gap: 6 }}>
                    {['↕', '✎', '✕'].map((icon) => (
                      <span key={icon} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid rgba(26,23,18,0.14)', color: 'var(--tv-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px/1 'Inter',sans-serif" }}>{icon}</span>
                    ))}
                  </span>
                </div>
              ))}
              <div className="tv-row" style={{ justifyContent: 'center', gap: 8, marginTop: 10, padding: 16, border: '1.5px dashed rgba(26,23,18,0.18)', borderRadius: 16, font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                + Add something to day 5
              </div>
            </div>
          </Card>
        </div>

        <div className="tv-col" style={{ width: 330, flex: 'none', gap: 16 }}>
          <Card variant="highlight" style={{ padding: 24 }}>
            <div className="tv-row" style={{ gap: 10, marginBottom: 18, alignItems: 'baseline' }}>
              <p style={{ margin: 0, font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Edit item</p>
              <span style={{ marginLeft: 'auto', font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>✕</span>
            </div>
            <p style={{ margin: '0 0 18px', font: "700 20px/1.2 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>Kakum canopy walk at dawn</p>
            <div className="tv-col" style={{ gap: 14 }}>
              <div>
                <p style={{ margin: '0 0 7px', font: "600 11px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Day</p>
                <div className="tv-row" style={{ gap: 7 }}>
                  {DAY_OPTIONS.map((d) => (
                    <Pill key={d} variant={d === '5' ? 'dark' : 'outline'} size="sm">{d}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 7px', font: "600 11px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Estimated time</p>
                <div className="tv-row" style={{ flexWrap: 'wrap', gap: 7 }}>
                  {TIME_OPTIONS.map((t) => (
                    <Pill key={t} variant={t === 'Half day' ? 'dark' : 'outline'} size="sm">{t}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 7px', font: "600 11px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Fulfilled by</p>
                <div className="tv-row" style={{ gap: 10, border: '1px solid rgba(26,23,18,0.12)', borderRadius: 14, padding: '12px 14px' }}>
                  <span style={{ width: 30, height: 30, flex: 'none', borderRadius: 9, background: 'var(--tv-sand)', color: 'var(--tv-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 11px/1 'Inter',sans-serif" }}>EA</span>
                  <span style={{ flex: '1 1 0', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Esi Amoah</span>
                  <span style={{ font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-accent)' }}>Change</span>
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 7px', font: "600 11px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Note for your guide</p>
                <div style={{ border: '1px solid rgba(26,23,18,0.12)', borderRadius: 14, padding: '12px 14px', minHeight: 64, font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                  Happy to start at 05:30 if it means fewer people.
                </div>
              </div>
            </div>
            <div className="tv-row" style={{ gap: 9, marginTop: 20 }}>
              <Pill variant="accent" style={{ flex: '1 1 0', justifyContent: 'center' }}>Apply</Pill>
              <Pill variant="outline">Cancel</Pill>
            </div>
          </Card>

          <Card variant="sand" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 14px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Moovai noticed</p>
            <div className="tv-col" style={{ gap: 14 }}>
              {NOTICED.map((n) => (
                <DotNote key={n.text} dot={n.dot} title={n.text} />
              ))}
            </div>
            <Pill variant="dark" style={{ width: '100%', marginTop: 18, justifyContent: 'center' }}>Apply that suggestion</Pill>
          </Card>

          <Card style={{ padding: 24 }}>
            <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>New total</span>
              <span style={{ font: "800 26px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-accent)' }}>$811</span>
            </div>
            <p style={{ margin: 0, font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Up $31 from your draft. $11 over your stated budget.</p>
          </Card>
        </div>
      </div>
    </TravelerShell>
  )
}

export default EditItinerary
