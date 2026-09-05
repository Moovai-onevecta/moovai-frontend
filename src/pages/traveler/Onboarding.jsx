import { useState } from 'react'
import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import Pill from '../../components/traveler/Pill'
import { createItinerary } from '../../lib/itineraries'
import { addDaysIso, todayIso } from '../../lib/dates'
import '../../assets/css/traveler.css'

const INTEREST_OPTIONS = ['Street food', 'History', 'Live music', 'Markets', 'Nature', 'Nightlife', 'Craft & textiles']

// Splits [startDate, endDate] into `count` contiguous, non-overlapping legs
// covering the full range — evenly, with any leftover days going to the
// earliest legs. Onboarding only collects a trip-level date range, not a
// date per city, so this is the best default until the traveler adjusts
// individual stays later.
function splitDateRange(startDate, endDate, count) {
  if (count === 0) return []

  const totalDays = Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1
  const base = Math.floor(totalDays / count)
  const remainder = totalDays % count

  const legs = []
  let cursor = startDate
  for (let i = 0; i < count; i++) {
    const span = base + (i < remainder ? 1 : 0)
    const arrival = cursor
    const departure = addDaysIso(arrival, Math.max(span - 1, 0))
    legs.push({ arrival_date: arrival, departure_date: departure })
    cursor = addDaysIso(departure, 1)
  }
  return legs
}

function Onboarding() {
  const navigate = useNavigate()
  const [cities, setCities] = useState([])
  const [cityInput, setCityInput] = useState('')
  const [startDate, setStartDate] = useState(todayIso())
  const [endDate, setEndDate] = useState(addDaysIso(todayIso(), 6))
  const [travelerCount, setTravelerCount] = useState(1)
  const [budget, setBudget] = useState('')
  const [departureCity, setDepartureCity] = useState('')
  const [interests, setInterests] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleInterest = (label) => {
    setInterests((cur) => (cur.includes(label) ? cur.filter((i) => i !== label) : [...cur, label]))
  }

  const addCity = () => {
    const trimmed = cityInput.trim()
    if (!trimmed || cities.includes(trimmed)) return
    setCities((cur) => [...cur, trimmed])
    setCityInput('')
  }

  const removeCity = (city) => {
    setCities((cur) => cur.filter((c) => c !== city))
  }

  const handleContinue = async () => {
    if (endDate < startDate) {
      setError('End date must be on or after the start date.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const legs = splitDateRange(startDate, endDate, cities.length)
      const destinations = cities.map((city, i) => ({
        order: i + 1,
        city,
        arrival_date: legs[i].arrival_date,
        departure_date: legs[i].departure_date,
      }))

      const created = await createItinerary({
        name: cities.length > 0 ? `${cities.join(' & ')} Trip` : 'New Trip',
        startDate,
        endDate,
        departureCity: departureCity.trim() || null,
        travelerCount: Number(travelerCount) || 1,
        budget: budget ? Number(budget) : null,
        interests,
        destinations,
      })

      navigate('/app/chat', { state: { itineraryId: created.id } })
    } catch (err) {
      setError(err.message || 'Could not save your trip — try again.')
    } finally {
      setLoading(false)
    }
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

          {error && (
            <p style={{ margin: '0 0 20px', font: "500 14px/1.4 'Inter',sans-serif", color: 'var(--tv-accent)' }}>{error}</p>
          )}

          <p style={{ margin: '0 0 12px', font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Cities</p>
          <div className="tv-row" style={{ flexWrap: 'wrap', gap: 9, marginBottom: 12, alignItems: 'center' }}>
            {cities.map((city) => (
              <Pill key={city} variant="dark" onClick={() => removeCity(city)}>{city} ×</Pill>
            ))}
            <input
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addCity()
                }
              }}
              placeholder="Add a city and press Enter"
              style={{ padding: '10px 14px', borderRadius: 999, border: '1px solid rgba(26,23,18,0.14)', font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)', minWidth: 200 }}
            />
          </div>
          <div className="tv-row" style={{ gap: 20, marginBottom: 32 }}>
            <label className="tv-col" style={{ gap: 6 }}>
              <span style={{ font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Start date</span>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(26,23,18,0.14)', font: "500 14px/1 'Inter',sans-serif" }} />
            </label>
            <label className="tv-col" style={{ gap: 6 }}>
              <span style={{ font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>End date</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(26,23,18,0.14)', font: "500 14px/1 'Inter',sans-serif" }} />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32, maxWidth: 560 }}>
            <label className="tv-col" style={{ gap: 6 }}>
              <span style={{ font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Travelers</span>
              <input type="number" min="1" value={travelerCount} onChange={(e) => setTravelerCount(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(26,23,18,0.14)', font: "500 14px/1 'Inter',sans-serif" }} />
            </label>
            <label className="tv-col" style={{ gap: 6 }}>
              <span style={{ font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Budget, all in (optional)</span>
              <input type="number" min="0" placeholder="$800" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(26,23,18,0.14)', font: "500 14px/1 'Inter',sans-serif" }} />
            </label>
            <label className="tv-col" style={{ gap: 6, gridColumn: '1 / -1' }}>
              <span style={{ font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Arriving from (optional)</span>
              <input type="text" placeholder="London (LHR)" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(26,23,18,0.14)', font: "500 14px/1 'Inter',sans-serif" }} />
            </label>
          </div>

          <p style={{ margin: '0 0 12px', font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>What you&apos;re here for</p>
          <div className="tv-row" style={{ flexWrap: 'wrap', gap: 9, marginBottom: 44, maxWidth: 620 }}>
            {INTEREST_OPTIONS.map((label) => (
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
            <Pill variant="accent" onClick={handleContinue} disabled={loading}>
              {loading ? 'Saving…' : 'Continue to chat'}
            </Pill>
            <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
              or <a href="#" onClick={(e) => { e.preventDefault(); navigate('/app/chat') }}>skip and start from a blank conversation</a>
            </span>
          </div>
        </div>

        <div className="tv-col tv-pane-sticky" style={{ width: 520, flex: 'none', background: 'var(--tv-darker)', padding: '56px 48px', justifyContent: 'center', gap: 26, overflowY: 'auto' }}>
          <p style={{ margin: 0, font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>What happens next</p>
          <div className="tv-col" style={{ background: 'var(--tv-dark)', borderRadius: 32, padding: 26, gap: 12, boxShadow: '0 50px 110px -40px rgba(0,0,0,0.6)' }}>
            <div style={{ alignSelf: 'flex-end', maxWidth: '88%', background: 'rgba(255,255,255,0.1)', color: '#f3f2f6', borderRadius: 16, borderBottomRightRadius: 4, padding: '12px 16px', font: "400 14px/1.4 'Inter',sans-serif" }}>
              {cities.length > 0 ? `${cities.length} ${cities.length === 1 ? 'city' : 'cities'}, ${Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1} days${budget ? `, ~$${budget}` : ''}.` : 'Tell me where you want to go.'}
            </div>
            <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: 'var(--tv-accent)', color: '#fff', borderRadius: 16, borderBottomLeftRadius: 4, padding: '12px 16px', font: "400 14px/1.4 'Inter',sans-serif" }}>
              Got it — let&apos;s shape the details together in chat.
            </div>
            {cities.length > 0 && (
              <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 18 }}>
                <p style={{ margin: '0 0 12px', font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Your itinerary</p>
                <div className="tv-col" style={{ gap: 10 }}>
                  {cities.map((city) => (
                    <div key={city} className="tv-row" style={{ justifyContent: 'space-between', font: "400 15px/1 'Inter',sans-serif", color: '#f3f2f6' }}>
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p style={{ margin: 0, font: "400 15px/1.55 'Inter',sans-serif", color: 'rgba(255,255,255,0.72)', maxWidth: '38ch' }}>
            This creates your draft itinerary — you can keep shaping it, city by city, in the chat that opens next.
          </p>
        </div>
      </div>
    </TravelerShell>
  )
}

export default Onboarding
