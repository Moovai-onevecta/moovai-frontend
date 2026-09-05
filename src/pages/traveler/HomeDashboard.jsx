import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import Card from '../../components/traveler/Card'
import Badge from '../../components/traveler/Badge'
import DotNote from '../../components/traveler/DotNote'
import { listItineraries } from '../../lib/itineraries'
import { formatShortDate } from '../../lib/dates'

const READINESS = [
  { label: 'Guides, 3 of 3', note: 'Kofi, Adwoa and Esi confirmed', dot: '#7fd39a' },
  { label: 'Accommodation, 5 nights', note: 'Held for 19 more hours', dot: '#7fd39a' },
  { label: 'Flight ACC → KMS', note: 'Fare not selected yet', dot: '#ff2500' },
  { label: 'Transfers and car', note: 'Booked, drivers assigned later', dot: '#7fd39a' },
]

// Draft trip stage is derived from what the itinerary actually has on it —
// there's no separate "stage" field on the backend model.
function draftStage(itinerary) {
  if (itinerary.destinations.length === 0) return 'Idea'
  if (!itinerary.start_date || !itinerary.end_date) return 'Needs dates'
  return 'Draft'
}

function draftNote(itinerary) {
  const stopCount = itinerary.destinations.length
  if (stopCount === 0) return 'No stops yet — continue the chat to start planning.'
  const activityCount = itinerary.activities.length
  return `${stopCount} stop${stopCount === 1 ? '' : 's'}, ${activityCount} activit${activityCount === 1 ? 'y' : 'ies'} planned so far.`
}

const OPERATORS = [
  { initials: 'EA', name: 'Esi Amoah', rating: '4.9', meta: 'Cape Coast · history and coast', price: 'From $24 / day' },
  { initials: 'MD', name: 'Mariama Diallo', rating: '4.8', meta: 'Dakar · music and food', price: 'From $38 / day' },
  { initials: 'TN', name: 'Thabo Ndlovu', rating: '4.7', meta: 'Cape Town · driver-guide', price: 'From $55 / day' },
]

const ATTENTION = [
  { title: 'Flight fare not selected', note: 'ACC → KMS, 14 Nov. Prices rise inside 30 days.', dot: 'var(--tv-accent)' },
  { title: 'Stays held for 19 more hours', note: 'Villa Monticello and Four Villages Inn.', dot: 'var(--tv-accent)' },
  { title: 'Passport expires Mar 2027', note: 'Valid for this trip. No action needed.', dot: 'var(--tv-muted)' },
]

const PAST_TRIPS = [
  { name: 'Lagos and Abeokuta', when: 'Apr 2026' },
  { name: 'Zanzibar, 9 days', when: 'Nov 2025' },
  { name: 'Marrakech', when: 'Feb 2025' },
]

const QUICK_STARTS = ['A long weekend', 'Repeat Ghana', 'Surprise me']

function HomeDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const firstName = user?.displayName?.split(' ')[0] || 'there'

  const [drafts, setDrafts] = useState([])
  const [draftsLoading, setDraftsLoading] = useState(true)
  const [draftsError, setDraftsError] = useState('')

  useEffect(() => {
    let cancelled = false

    listItineraries()
      .then((data) => {
        if (!cancelled) setDrafts(data)
      })
      .catch((err) => {
        if (!cancelled) setDraftsError(err.message || 'Could not load your trips.')
      })
      .finally(() => {
        if (!cancelled) setDraftsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <TravelerShell active="Home">
      <div className="tv-topbar">
        <div style={{ marginRight: 'auto' }}>
          <p className="tv-topbar-eyebrow">Friday 4 September</p>
          <p style={{ margin: 0, font: "700 30px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.035em', color: 'var(--tv-ink)' }}>Good morning, {firstName}</p>
        </div>
        <Pill variant="outline">Saved places</Pill>
        <Pill variant="accent" onClick={() => navigate('/app/onboarding')}>Plan a new trip</Pill>
      </div>

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 20, padding: '28px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 18 }}>
          <Card variant="dark" style={{ padding: 30, display: 'flex', gap: 28, boxShadow: '0 26px 60px -28px rgba(38,34,28,0.4)' }}>
            <div style={{ flex: '1 1 0' }}>
              <p className="tv-row" style={{ margin: '0 0 12px', gap: 9, font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--tv-accent)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tv-accent)', boxShadow: '0 0 0 5px rgba(255,37,0,0.18)' }} />
                Next trip · in 68 days
              </p>
              <p style={{ margin: '0 0 10px', font: "700 36px/1.02 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.035em', color: '#fff' }}>Ghana — Accra, Kumasi, Cape Coast</p>
              <p style={{ margin: '0 0 24px', font: "400 15px/1.55 'Inter',sans-serif", color: 'rgba(255,255,255,0.7)', maxWidth: '52ch' }}>
                12 to 17 November 2026, 6 days. Guides confirmed for all three cities. One flight still needs a fare selected before we can lock the price.
              </p>
              <div className="tv-row" style={{ gap: 10 }}>
                <Pill variant="accent" onClick={() => navigate('/app/flights')}>Choose the ACC → KMS flight</Pill>
                <Pill variant="outline-light" onClick={() => navigate('/app/itinerary')}>Open itinerary</Pill>
              </div>
            </div>
            <div style={{ width: 280, flex: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 22, padding: 22 }}>
              <p style={{ margin: '0 0 16px', font: "600 11px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Ready to book</p>
              <div className="tv-col" style={{ gap: 13 }}>
                {READINESS.map((r) => (
                  <DotNote key={r.label} dot={r.dot} title={r.label} note={r.note} titleColor="#f3f2f6" noteColor="rgba(255,255,255,0.55)" />
                ))}
              </div>
              <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                <span style={{ font: "500 13px/1 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)' }}>Estimated total</span>
                <span style={{ font: "800 24px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-accent)' }}>$780</span>
              </div>
            </div>
          </Card>

          <div>
            <div className="tv-row" style={{ gap: 12, marginBottom: 12, alignItems: 'baseline' }}>
              <p style={{ margin: 0, font: "700 18px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>Pick up where you left off</p>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/app/chat') }} style={{ marginLeft: 'auto', font: "600 14px/1 'Inter',sans-serif" }}>All drafts</a>
            </div>
            {draftsLoading && (
              <p style={{ margin: 0, font: "400 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Loading your trips…</p>
            )}
            {!draftsLoading && draftsError && (
              <p style={{ margin: 0, font: "400 14px/1 'Inter',sans-serif", color: 'var(--tv-accent)' }}>{draftsError}</p>
            )}
            {!draftsLoading && !draftsError && drafts.length === 0 && (
              <Card variant="dashed" style={{ padding: 22 }}>
                <p style={{ margin: 0, font: "400 15px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                  No draft trips yet — tell Moovai where you want to go to start one.
                </p>
              </Card>
            )}
            {!draftsLoading && !draftsError && drafts.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {drafts.map((d) => (
                  <Card key={d.id} className="tv-col" style={{ padding: 20, gap: 12 }}>
                    <div className="tv-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                      <div style={{ flex: '1 1 0' }}>
                        <p style={{ margin: '0 0 4px', font: "700 18px/1.15 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>{d.name}</p>
                        <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                          {formatShortDate(d.start_date)} – {formatShortDate(d.end_date)}
                        </p>
                      </div>
                      <span style={{ flex: 'none', padding: '6px 10px', borderRadius: 999, background: 'var(--tv-paper)', color: 'var(--tv-muted)', font: "600 11px/1 'Inter',sans-serif" }}>{draftStage(d)}</span>
                    </div>
                    <p style={{ margin: 0, font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{draftNote(d)}</p>
                    <Pill variant="outline" size="sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }} onClick={() => navigate('/app/chat', { state: { itineraryId: d.id } })}>Continue in chat</Pill>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="tv-row" style={{ gap: 12, marginBottom: 12, alignItems: 'baseline' }}>
              <p style={{ margin: 0, font: "700 18px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>Local operators near your saved places</p>
              <span style={{ marginLeft: 'auto', font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Vetted in the last 60 days</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {OPERATORS.map((o) => (
                <Card key={o.name} className="tv-row" style={{ padding: 20, gap: 14 }}>
                  <span style={{ width: 52, height: 52, flex: 'none', borderRadius: 15, background: 'var(--tv-sand)', color: 'var(--tv-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px/1 'Inter',sans-serif" }}>{o.initials}</span>
                  <div style={{ flex: '1 1 0' }}>
                    <div className="tv-row" style={{ gap: 8, marginBottom: 4, alignItems: 'baseline' }}>
                      <p style={{ margin: 0, font: "600 16px/1.2 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{o.name}</p>
                      <span style={{ font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{o.rating}</span>
                    </div>
                    <p style={{ margin: '0 0 10px', font: "500 13px/1.35 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{o.meta}</p>
                    <Badge tone="pending">{o.price}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="tv-col" style={{ width: 320, flex: 'none', gap: 16 }}>
          <Card variant="highlight" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 10px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--tv-accent)' }}>Start a trip</p>
            <p style={{ margin: '0 0 16px', font: "600 17px/1.4 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Tell Moovai where you want to go and what you want out of it.</p>
            <div className="tv-row" style={{ gap: 10, background: 'var(--tv-paper)', border: '1px solid rgba(26,23,18,0.12)', borderRadius: 100, padding: '12px 8px 12px 16px', marginBottom: 14 }}>
              <span style={{ flex: '1 1 0', font: "400 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Two weeks in Senegal…</span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => navigate('/app/chat')}
                style={{ width: 32, height: 32, flex: 'none', borderRadius: 100, background: 'var(--tv-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px/1 'Inter',sans-serif", cursor: 'pointer' }}
              >
                ↑
              </span>
            </div>
            <div className="tv-row" style={{ flexWrap: 'wrap', gap: 8 }}>
              {QUICK_STARTS.map((q) => (
                <Pill key={q} variant="muted-outline" size="sm" onClick={() => navigate('/app/chat')}>{q}</Pill>
              ))}
            </div>
          </Card>

          <Card style={{ padding: 24 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Needs your attention</p>
            <div className="tv-col" style={{ gap: 16 }}>
              {ATTENTION.map((a) => (
                <DotNote key={a.title} dot={a.dot} title={a.title} note={a.note} />
              ))}
            </div>
          </Card>

          <Card variant="sand" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 16px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Past trips</p>
            <div className="tv-col" style={{ gap: 14 }}>
              {PAST_TRIPS.map((t) => (
                <div key={t.name} className="tv-row" style={{ alignItems: 'baseline', gap: 10 }}>
                  <span style={{ flex: '1 1 0', font: "600 15px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{t.name}</span>
                  <span style={{ font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{t.when}</span>
                </div>
              ))}
            </div>
            <Pill variant="dark" style={{ width: '100%', marginTop: 18, justifyContent: 'center' }} onClick={() => navigate('/app/chat')}>Rebook a past trip</Pill>
          </Card>
        </div>
      </div>
    </TravelerShell>
  )
}

export default HomeDashboard
