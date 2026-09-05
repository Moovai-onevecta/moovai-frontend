import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import ChatBubble from '../../components/traveler/ChatBubble'
import Card from '../../components/traveler/Card'
import Pill from '../../components/traveler/Pill'
import Badge from '../../components/traveler/Badge'
import { chatAssistant, resolveChatAction } from '../../lib/ai'
import { addActivity, addDestination, createItinerary, getItinerary, listItineraries } from '../../lib/itineraries'
import { addDaysIso, formatShortDate, todayIso } from '../../lib/dates'

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Tell me about the trip you're picturing — where, when, and what you want out of it.",
}

function LegCard({ destination, activities }) {
  return (
    <Card style={{ padding: 26 }}>
      <div className="tv-row" style={{ gap: 12, marginBottom: 12, alignItems: 'baseline' }}>
        <h3 style={{ margin: 0, font: "700 22px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>{destination.city}</h3>
        <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
          {formatShortDate(destination.arrival_date)} – {formatShortDate(destination.departure_date)}
        </span>
      </div>
      <div className="tv-col" style={{ gap: 2, paddingTop: 6, borderTop: '1px solid rgba(26,23,18,0.08)' }}>
        {activities.length === 0 && (
          <p style={{ margin: '10px 0 0', font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
            No activities yet — ask the assistant for ideas here.
          </p>
        )}
        {activities.map((item, i) => (
          <div key={item.order} className="tv-row" style={{ gap: 14, padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(26,23,18,0.06)' }}>
            <span style={{ flex: '1 1 0', font: "600 15px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{item.title}</span>
            {item.est && <Badge tone="neutral">{item.est}</Badge>}
            {item.price != null && (
              <span style={{ width: 56, textAlign: 'right', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>${item.price}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

function SystemNote({ content, kind }) {
  const isAdded = kind === 'added'
  return (
    <div className="tv-row" style={{ justifyContent: 'center' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          maxWidth: '90%',
          padding: '7px 14px',
          borderRadius: 999,
          background: isAdded ? 'rgba(127,211,154,0.16)' : 'rgba(255,255,255,0.08)',
          color: isAdded ? '#7fd39a' : 'rgba(255,255,255,0.55)',
          font: "600 12px/1.4 'Inter',sans-serif",
          textAlign: 'center',
        }}
      >
        {isAdded ? '✓' : '–'} {content}
      </span>
    </div>
  )
}

// Fixed height so a long blurb never pushes the Approve/Skip row down and
// out of view — that row is pinned to the bottom (marginTop: 'auto' on a
// flex column) and the blurb is clamped instead of growing the card.
const ACTION_CARD_HEIGHT = 208

function ActionCard({ action, onRespond, style }) {
  const price = action.price
  const priceLabel = price?.amount != null ? `$${price.amount}${price.is_estimate ? ' est.' : ''}` : null

  return (
    <div
      className="tv-col"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 18,
        padding: '14px 16px',
        height: ACTION_CARD_HEIGHT,
        ...style,
      }}
    >
      <div className="tv-row" style={{ gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <p style={{ margin: '0 0 4px', font: "600 15px/1.3 'Inter',sans-serif", color: '#f3f2f6' }}>{action.title}</p>
          {action.city && (
            <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)' }}>{action.city}</p>
          )}
        </div>
        {action.est && (
          <span style={{ flex: 'none', padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', font: "600 11px/1 'Inter',sans-serif" }}>
            {action.est}
          </span>
        )}
      </div>
      {action.blurb && (
        <p
          style={{
            margin: '0 0 12px',
            font: "400 13px/1.45 'Inter',sans-serif",
            color: 'rgba(255,255,255,0.62)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {action.blurb}
        </p>
      )}
      <div className="tv-row" style={{ gap: 8, marginTop: 'auto' }}>
        {priceLabel && (
          <span style={{ marginRight: 'auto', font: "700 15px/1 'Inter Tight','Inter',sans-serif", color: '#fff' }}>{priceLabel}</span>
        )}
        <Pill size="sm" style={{ background: 'var(--tv-accent)', color: '#fff', border: 'none' }} onClick={() => onRespond(action, true)}>
          Approve
        </Pill>
        <Pill variant="outline-light" size="sm" onClick={() => onRespond(action, false)}>
          Skip
        </Pill>
      </div>
    </div>
  )
}

function Chat() {
  const navigate = useNavigate()
  const location = useLocation()
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [suggestedActions, setSuggestedActions] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [itineraryId, setItineraryId] = useState(null)
  const [itinerary, setItinerary] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, suggestedActions])

  // The chat assistant persists each turn to a Firestore-backed itinerary,
  // so it needs a real itinerary id before it can send anything. Onboarding
  // navigates here with one already created (location.state.itineraryId) —
  // otherwise reuse the traveler's existing draft, or start a blank one.
  useEffect(() => {
    let cancelled = false
    const stateItineraryId = location.state?.itineraryId

    async function ensureItinerary() {
      try {
        if (stateItineraryId) {
          if (!cancelled) setItineraryId(stateItineraryId)
          return
        }
        const existing = await listItineraries()
        if (cancelled) return
        if (existing.length > 0) {
          setItineraryId(existing[0].id)
          return
        }
        const created = await createItinerary({
          name: 'New Trip',
          startDate: todayIso(),
          endDate: addDaysIso(todayIso(), 6),
        })
        if (!cancelled) setItineraryId(created.id)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not start your itinerary.')
      }
    }

    ensureItinerary()
    return () => {
      cancelled = true
    }
  }, [location.state])

  // Keeps the builder panel on the right showing the itinerary's real,
  // live Firestore state rather than anything held only in this component.
  useEffect(() => {
    if (!itineraryId) return
    let cancelled = false

    getItinerary(itineraryId)
      .then((data) => {
        if (!cancelled) setItinerary(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load your itinerary.')
      })

    return () => {
      cancelled = true
    }
  }, [itineraryId])

  // Shared by sendMessage and retryLastMessage — takes the message history to
  // send as-is (already includes the pending user turn) so a retry doesn't
  // re-append and duplicate the user's bubble.
  const requestAssistantReply = async (history) => {
    if (!itineraryId) {
      setError('Still setting up your itinerary — try again in a moment.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const response = await chatAssistant(
        itineraryId,
        // System notes (action confirmations) are a UI-only concept — the
        // backend's ChatMessage schema only knows about user/assistant turns.
        history
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map(({ role, content }) => ({ role, content })),
        { cities: (itinerary?.destinations || []).map((d) => d.city) }
      )
      setMessages((cur) => [...cur, { role: 'assistant', content: response.reply }])
      setSuggestedActions(response.suggested_actions || [])
    } catch (err) {
      setError(err.message || 'Something went wrong — try again.')
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const nextMessages = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    requestAssistantReply(nextMessages)
  }

  const retryLastMessage = () => {
    if (loading) return
    requestAssistantReply(messages)
  }

  // Approving a suggestion writes it straight to the itinerary's Firestore
  // document (via the add_destination/add_activity endpoints) so the
  // builder panel reflects it immediately — not just a client-side note.
  const respondToAction = async (action, accepted) => {
    setSuggestedActions((cur) => cur.filter((a) => a.id !== action.id))
    setMessages((cur) => [
      ...cur,
      {
        role: 'system',
        kind: accepted ? 'added' : 'skipped',
        content: accepted ? `Added "${action.title}" to your itinerary.` : `Skipped "${action.title}".`,
      },
    ])

    if (itineraryId) {
      resolveChatAction(itineraryId, action.id, accepted).catch(() => {})
    }

    if (!accepted || !itineraryId || !itinerary) return

    try {
      if (action.kind === 'add_stop') {
        const lastDestination = itinerary.destinations[itinerary.destinations.length - 1]
        const fallbackArrival = lastDestination ? addDaysIso(lastDestination.departure_date, 1) : itinerary.start_date
        // The assistant infers real stay dates from the trip's context
        // (see chat_assistant_system_prompt) — prefer those over a naive
        // "day after the last stop" guess, and only fall back when it
        // genuinely couldn't infer one.
        const arrival = action.arrival_date || fallbackArrival
        const departure = action.departure_date || addDaysIso(arrival, 1)
        // The backend assigns the destination's order itself (it's the
        // source of truth for the itinerary's current state) — the client
        // sending a computed guess here could race a stale `itinerary` and
        // collide with an order another update already assigned.
        const updated = await addDestination(itineraryId, {
          order: null,
          city: action.city || action.title,
          country: action.country || null,
          arrival_date: arrival,
          departure_date: departure,
        })
        setItinerary(updated)
      } else if (action.kind === 'add_activity') {
        const destination = itinerary.destinations.find(
          (d) => d.city.toLowerCase() === (action.city || '').toLowerCase()
        )
        if (!destination) return // nothing to attach this activity to yet
        const updated = await addActivity(itineraryId, {
          order: itinerary.activities.length + 1,
          destination_order: destination.order,
          title: action.title,
          est: action.est || null,
          price: action.price?.amount ?? null,
        })
        setItinerary(updated)
      }
    } catch (err) {
      setError(err.message || 'Could not update your itinerary.')
    }
  }

  const legs = (itinerary?.destinations || [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((destination) => ({
      destination,
      activities: (itinerary?.activities || [])
        .filter((a) => a.destination_order === destination.order)
        .sort((a, b) => a.order - b.order),
    }))

  const runningTotal = (itinerary?.activities || []).reduce((sum, a) => sum + (a.price || 0), 0)

  return (
    <TravelerShell active="Chat">
      <div className="tv-row" style={{ alignItems: 'stretch', minHeight: '100vh' }}>
        <div className="tv-col tv-pane-sticky" style={{ order: 2, width: 400, flex: 'none', background: 'var(--tv-dark)' }}>
          <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ margin: '0 0 6px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Planning with</p>
            <p style={{ margin: 0, font: "600 16px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: '#f3f2f6' }}>
              Moovai · {itinerary ? itinerary.name : 'Loading…'}
            </p>
          </div>

          <div ref={scrollRef} className="tv-col tv-pane-scroll" style={{ padding: 22, gap: 14 }}>
            {messages.map((m, i) =>
              m.role === 'system' ? (
                <SystemNote key={i} content={m.content} kind={m.kind} />
              ) : (
                <ChatBubble key={i} align={m.role === 'user' ? 'right' : 'left'} tone={m.role === 'user' ? 'dark-soft' : 'accent'}>
                  {m.content}
                </ChatBubble>
              )
            )}
            {loading && <ChatBubble align="left" tone="accent">…</ChatBubble>}

            {suggestedActions.length === 1 && (
              <div className="tv-col" style={{ gap: 10, marginTop: 2 }}>
                <ActionCard action={suggestedActions[0]} onRespond={respondToAction} />
              </div>
            )}

            {suggestedActions.length > 1 && (
              <div
                className="tv-row tv-hide-scrollbar"
                style={{
                  gap: 10,
                  marginTop: 2,
                  overflowX: 'auto',
                  flexWrap: 'nowrap',
                  paddingBottom: 4,
                }}
              >
                {suggestedActions.map((action) => (
                  <ActionCard
                    key={action.id}
                    action={action}
                    onRespond={respondToAction}
                    style={{ flex: '0 0 260px', width: 260 }}
                  />
                ))}
              </div>
            )}

            {error && (
              <div style={{ background: 'rgba(255,37,0,0.08)', border: '1px solid rgba(255,37,0,0.3)', borderRadius: 14, padding: '12px 14px' }}>
                <p style={{ margin: '0 0 10px', font: "500 13px/1.4 'Inter',sans-serif", color: 'var(--tv-accent)' }}>{error}</p>
                <Pill variant="soft-accent" size="sm" onClick={retryLastMessage} disabled={loading}>
                  {loading ? 'Retrying…' : 'Retry'}
                </Pill>
              </div>
            )}

          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="tv-col"
            style={{ padding: '18px 22px 22px', borderTop: '1px solid rgba(255,255,255,0.1)', gap: 10 }}
          >
            <div className="tv-row" style={{ gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 100, padding: '12px 8px 12px 18px' }}>
              <input
                className="tv-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for a change…"
                disabled={loading}
                style={{ flex: '1 1 0', background: 'transparent', border: 'none', outline: 'none', font: "400 14px/1 'Inter',sans-serif", color: '#fff' }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{ width: 34, height: 34, flex: 'none', borderRadius: 100, background: 'var(--tv-accent)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px/1 'Inter',sans-serif", cursor: loading ? 'default' : 'pointer', opacity: loading || !input.trim() ? 0.6 : 1 }}
              >
                ↑
              </button>
            </div>
            <p style={{ margin: 0, font: "400 12px/1 'Inter',sans-serif", color: 'rgba(255,255,255,0.35)' }}>Nothing is booked until you confirm.</p>
          </form>
        </div>

        <div className="tv-col" style={{ flex: '1 1 0', minWidth: 0 }}>
          <div className="tv-topbar">
            <div style={{ marginRight: 'auto' }}>
              <p className="tv-topbar-eyebrow">Draft itinerary · updating live</p>
              <p className="tv-topbar-title">
                {itinerary ? `${itinerary.name} — ${formatShortDate(itinerary.start_date)} to ${formatShortDate(itinerary.end_date)}` : 'Loading…'}
              </p>
            </div>
            <Badge tone="neutral">{legs.length} stop{legs.length === 1 ? '' : 's'}</Badge>
            <Pill variant="outline" onClick={() => navigate('/app/itinerary')}>Review day by day</Pill>
          </div>

          <div className="tv-col" style={{ padding: '26px 34px 30px', gap: 16 }}>
            <div className="tv-row" style={{ gap: 12 }}>
              <div className="tv-row" style={{ flex: '1 1 0', gap: 12, background: 'var(--tv-white)', border: '1px solid rgba(26,23,18,0.14)', borderRadius: 100, padding: '14px 20px', boxShadow: 'var(--tv-shadow-card)' }}>
                <span style={{ width: 15, height: 15, flex: 'none', borderRadius: '50%', border: '2px solid var(--tv-muted)' }} />
                <span style={{ flex: '1 1 0', font: "400 15px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Search a place, activity or provider to add manually…</span>
              </div>
              <Pill variant="outline" onClick={() => sendMessage('I want to add another city to my itinerary.')}>+ Add a city</Pill>
            </div>

            {legs.length === 0 && (
              <Card variant="dashed" style={{ padding: 26 }}>
                <p style={{ margin: 0, font: "400 15px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                  No stops yet — tell the assistant where you want to go and it'll show up here.
                </p>
              </Card>
            )}

            {legs.map(({ destination, activities }) => (
              <LegCard key={destination.order} destination={destination} activities={activities} />
            ))}

            <div className="tv-row" style={{ marginTop: 'auto', gap: 20, background: 'var(--tv-sand)', borderRadius: 22, padding: '20px 24px' }}>
              <div>
                <p style={{ margin: '0 0 4px', font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Running estimate</p>
                <p style={{ margin: 0, font: "800 28px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>
                  ${runningTotal}
                  {itinerary?.budget != null && (
                    <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}> of ~${itinerary.budget} budget</span>
                  )}
                </p>
              </div>
              <Pill variant="dark" style={{ marginLeft: 'auto' }} onClick={() => navigate('/app/itinerary')}>Open full itinerary</Pill>
            </div>
          </div>
        </div>
      </div>
    </TravelerShell>
  )
}

export default Chat
