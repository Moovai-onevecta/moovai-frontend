import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Card from '../../components/traveler/Card'
import Pill from '../../components/traveler/Pill'
import Badge from '../../components/traveler/Badge'
import { listItineraries } from '../../lib/itineraries'
import { addDaysIso, formatShortDate } from '../../lib/dates'

// Builds one entry per day actually covered by a destination's own
// arrival_date/departure_date span, in destination order — deliberately
// NOT a walk of itinerary.start_date..end_date, since a destination added
// via chat can land outside that range (e.g. a fresh itinerary created
// with a rough placeholder window before any real dates were known) and
// would then silently never appear on any day card.
function buildDays(itinerary) {
  const destinations = (itinerary.destinations || []).slice().sort((a, b) => a.order - b.order)
  if (destinations.length === 0) return []

  const days = []
  const firstDayIsoByDestOrder = new Map()

  destinations.forEach((destination, i) => {
    const next = destinations[i + 1]
    // A shared boundary day (this stop's departure_date == the next one's
    // arrival_date) is credited to the destination being arrived into, so
    // stop one day short here rather than emitting it twice.
    const rangeEndIso =
      next && next.arrival_date === destination.departure_date
        ? addDaysIso(destination.departure_date, -1)
        : destination.departure_date

    const arrival = new Date(`${destination.arrival_date}T00:00:00`)
    const rangeEnd = new Date(`${rangeEndIso}T00:00:00`)
    const spanDays = Math.round((rangeEnd - arrival) / 86400000) + 1
    if (spanDays <= 0) return

    for (let d = 0; d < spanDays; d++) {
      const iso = addDaysIso(destination.arrival_date, d)
      if (!firstDayIsoByDestOrder.has(destination.order)) {
        firstDayIsoByDestOrder.set(destination.order, iso)
      }
      days.push({
        iso,
        destination,
        prevDestination: days.length > 0 ? days[days.length - 1].destination : null,
        items: [],
      })
    }
  })

  // An activity with no activity_date is shown on the first day of its
  // destination rather than repeated across every day of that stay.
  ;(itinerary.activities || []).forEach((activity) => {
    const targetIso = activity.activity_date || firstDayIsoByDestOrder.get(activity.destination_order)
    const day = days.find((d) => d.iso === targetIso)
    if (day) day.items.push(activity)
  })
  days.forEach((day) => day.items.sort((a, b) => a.order - b.order))

  return days
}

function DayCard({ day, n }) {
  const dayCost = day.items.reduce((sum, item) => sum + (item.price || 0), 0)
  const cityLabel =
    day.destination && day.prevDestination && day.prevDestination.order !== day.destination.order
      ? `${day.prevDestination.city} → ${day.destination.city}`
      : day.destination?.city || 'No stop planned yet'

  return (
    <Card style={{ padding: '24px 26px' }}>
      <div className="tv-row" style={{ gap: 12, alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid rgba(26,23,18,0.08)' }}>
        <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 100, background: 'var(--tv-accent-tint)', color: 'var(--tv-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 16px/1 'Inter Tight','Inter',sans-serif" }}>{n}</span>
        <div>
          <p style={{ margin: '0 0 3px', font: "700 18px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>{cityLabel}</p>
          <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{formatShortDate(day.iso)}</p>
        </div>
        <span style={{ marginLeft: 'auto', font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>${dayCost}</span>
      </div>
      <div className="tv-col" style={{ gap: 2, paddingTop: 6 }}>
        {day.items.length === 0 && (
          <p style={{ margin: '10px 0 0', font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
            Nothing planned for this day yet.
          </p>
        )}
        {day.items.map((item) => (
          <div key={item.order} className="tv-row" style={{ alignItems: 'flex-start', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(26,23,18,0.06)' }}>
            <div style={{ flex: '1 1 0' }}>
              <p style={{ margin: '0 0 4px', font: "600 15px/1.35 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{item.title}</p>
            </div>
            {item.est && <Badge tone="neutral" style={{ flex: 'none' }}>{item.est}</Badge>}
            {item.price != null && (
              <span style={{ width: 56, textAlign: 'right', font: "600 13px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>${item.price}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

function Itinerary() {
  const navigate = useNavigate()
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    listItineraries()
      .then((data) => {
        if (!cancelled) setItinerary(data[0] || null)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load your itinerary.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const destinations = (itinerary?.destinations || []).slice().sort((a, b) => a.order - b.order)
  const days = itinerary ? buildDays(itinerary) : []
  const activitiesTotal = (itinerary?.activities || []).reduce((sum, a) => sum + (a.price || 0), 0)

  const cityFilters = [
    days.length > 0 ? `All ${days.length} day${days.length === 1 ? '' : 's'}` : 'All days',
    ...destinations.map((d) => d.city),
  ]

  const readiness = itinerary
    ? [
        { label: destinations.length > 0 ? `${destinations.length} stop${destinations.length === 1 ? '' : 's'} planned` : 'No stops added yet', ok: destinations.length > 0 },
        { label: itinerary.flights.length > 0 ? `${itinerary.flights.length} flight${itinerary.flights.length === 1 ? '' : 's'} added` : 'No flights added yet', ok: itinerary.flights.length > 0 },
        { label: itinerary.activities.length > 0 ? `${itinerary.activities.length} activit${itinerary.activities.length === 1 ? 'y' : 'ies'} planned` : 'No activities added yet', ok: itinerary.activities.length > 0 },
      ]
    : []

  return (
    <TravelerShell active="Itinerary">
      <div className="tv-topbar">
        <div style={{ marginRight: 'auto' }}>
          <p className="tv-topbar-eyebrow">Itinerary · draft</p>
          <p className="tv-topbar-title">
            {loading ? 'Loading…' : itinerary ? destinations.map((d) => d.city).join(' · ') || itinerary.name : 'No trip yet'}
          </p>
        </div>
        <Pill variant="outline" onClick={() => navigate('/app/itinerary/edit')}>Edit manually</Pill>
        <Pill variant="outline">Share</Pill>
        <Pill variant="outline">Export PDF</Pill>
        <Pill variant="accent" onClick={() => navigate('/app/checkout')}>Book this trip</Pill>
      </div>

      {error && (
        <p style={{ margin: '16px 34px 0', font: "500 14px/1.4 'Inter',sans-serif", color: 'var(--tv-accent)' }}>{error}</p>
      )}

      <div className="tv-row" style={{ alignItems: 'flex-start', gap: 26, padding: '30px 34px' }}>
        <div className="tv-col" style={{ flex: '1 1 0', gap: 14 }}>
          <div className="tv-row" style={{ gap: 8, marginBottom: 4 }}>
            {cityFilters.map((filter, i) => (
              <Pill key={filter} variant={i === 0 ? 'dark' : 'muted-outline'} size="sm">{filter}</Pill>
            ))}
          </div>

          {!loading && days.length === 0 && (
            <Card variant="dashed" style={{ padding: 26 }}>
              <p style={{ margin: 0, font: "400 15px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                No stops yet — add a city in chat and it'll show up here day by day.
              </p>
            </Card>
          )}

          {days.map((day, i) => (
            <DayCard key={day.iso} day={day} n={String(i + 1).padStart(2, '0')} />
          ))}
        </div>

        <div className="tv-col" style={{ width: 320, flex: 'none', gap: 14 }}>
          <Card style={{ padding: 24 }}>
            <p style={{ margin: '0 0 18px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Cost so far</p>
            <div className="tv-row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>Activities total</span>
              <span style={{ font: "800 30px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-accent)' }}>${activitiesTotal}</span>
            </div>
            {itinerary?.budget != null && (
              <p style={{ margin: '10px 0 0', font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>of ~${itinerary.budget} budget</p>
            )}
            <p style={{ margin: '10px 0 0', font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Flights and accommodation aren't priced yet — this is activities only.</p>
          </Card>

          <Card variant="sand" style={{ padding: 24 }}>
            <p style={{ margin: '0 0 14px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Before you book</p>
            <div className="tv-col" style={{ gap: 12 }}>
              {readiness.map((row) => (
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
