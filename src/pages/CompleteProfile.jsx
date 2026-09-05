import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { upsertMyProfile } from '../lib/users'
import heroImg from '../assets/img/hero.png'
import Pill from '../components/traveler/Pill'
import '../assets/css/traveler.css'

const INTEREST_OPTIONS = [
  'Street food',
  'History',
  'Live music',
  'Markets',
  'Nature',
  'Nightlife',
  'Craft & textiles',
]

function CompleteProfile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [homeCity, setHomeCity] = useState('')
  const [interests, setInterests] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleInterest = (label) => {
    setInterests((cur) => (cur.includes(label) ? cur.filter((i) => i !== label) : [...cur, label]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!displayName.trim() || !homeCity.trim()) {
      setError('Name and home city are required.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await upsertMyProfile({
        display_name: displayName.trim(),
        home_city: homeCity.trim(),
        interests,
        roles: ['traveler'],
      })
      navigate('/app/home')
    } catch (err) {
      setError(err.message || 'Failed to save your profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tv-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        <div className="tv-row" style={{ gap: 10, marginBottom: 36, justifyContent: 'center' }}>
          <img src={heroImg} alt="" width="26" height="26" style={{ width: 26, height: 26, borderRadius: 8 }} />
          <span style={{ font: "700 19px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>Moovai</span>
        </div>

        <form onSubmit={handleSubmit} className="tv-card" style={{ padding: 40 }}>
          <p style={{ margin: '0 0 8px', font: "700 12px/1 'Inter',sans-serif", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tv-accent)' }}>
            One last thing
          </p>
          <h1 style={{ margin: '0 0 12px', font: "800 32px/1.05 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>
            Tell us a bit about you
          </h1>
          <p style={{ margin: '0 0 32px', font: "400 15px/1.55 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
            This helps Moovai tailor itinerary and destination suggestions to you.
          </p>

          {error && (
            <p style={{ margin: '0 0 20px', font: "500 14px/1.4 'Inter',sans-serif", color: 'var(--tv-accent)' }}>{error}</p>
          )}

          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ display: 'block', marginBottom: 8, font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>
              Your name
            </span>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ama Owusu"
              required
              style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid rgba(26,23,18,0.14)', font: "500 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 28 }}>
            <span style={{ display: 'block', marginBottom: 8, font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>
              Home city
            </span>
            <input
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              placeholder="London"
              required
              style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1px solid rgba(26,23,18,0.14)', font: "500 15px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}
            />
            <span style={{ display: 'block', marginTop: 6, font: "400 13px/1.4 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
              Used as your default departure city when planning trips.
            </span>
          </label>

          <span style={{ display: 'block', marginBottom: 8, font: "600 13px/1 'Inter',sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>
            What are you into? <span style={{ textTransform: 'none', fontWeight: 400 }}>(optional)</span>
          </span>
          <div className="tv-row" style={{ flexWrap: 'wrap', gap: 9, marginBottom: 32 }}>
            {INTEREST_OPTIONS.map((label) => (
              <Pill
                key={label}
                type="button"
                variant={interests.includes(label) ? 'soft-accent' : 'muted-outline'}
                size="sm"
                onClick={() => toggleInterest(label)}
              >
                {label}
              </Pill>
            ))}
          </div>

          <Pill type="submit" variant="accent" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Saving…' : 'Continue to Moovai'}
          </Pill>
        </form>
      </div>
    </div>
  )
}

export default CompleteProfile
