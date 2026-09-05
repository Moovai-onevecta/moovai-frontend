import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import ChatBubble from '../../components/traveler/ChatBubble'
import Card from '../../components/traveler/Card'
import Pill from '../../components/traveler/Pill'
import Badge from '../../components/traveler/Badge'
import { chatAssistant } from '../../lib/ai'

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Tell me about the trip you're picturing — where, when, and what you want out of it.",
}

const QUICK_ACTIONS = ['Add a rest day', 'Cheaper stays', 'More history']

const LEGS = [
  {
    city: 'Accra',
    days: 'Days 1–2 · 12–13 Nov',
    tiles: [
      { label: 'Guide', value: 'Kofi Mensah · food & history' },
      { label: 'Stay', value: 'Villa Monticello, Airport Res.' },
      { label: 'Getting around', value: 'Private car, 2 days' },
    ],
    items: [
      { title: 'Jamestown walk and lighthouse', est: 'Est. 3 hrs', price: '$34' },
      { title: 'Makola market, food stalls first', est: 'Est. half day', price: '$28' },
      { title: 'Osu chop bar crawl', est: 'Est. 4 hrs', price: '$41' },
    ],
  },
  {
    city: 'Kumasi',
    days: 'Days 3–4 · 14–15 Nov',
    tiles: [
      { label: 'Guide', value: 'Adwoa Boateng · craft & textiles' },
      { label: 'Stay', value: 'Four Villages Inn' },
      { label: 'Getting there', value: 'Flight ACC → KMS, 55 min' },
    ],
    items: [
      { title: 'Manhyia Palace Museum', est: 'Est. 2 hrs', price: '$26' },
      { title: 'Bonwire kente workshop', est: 'Est. half day', price: '$30' },
    ],
  },
]

function LegCard({ leg }) {
  return (
    <Card style={{ padding: 26 }}>
      <div className="tv-row" style={{ gap: 12, marginBottom: 16, alignItems: 'baseline' }}>
        <h3 style={{ margin: 0, font: "700 22px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>{leg.city}</h3>
        <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>{leg.days}</span>
        <Badge tone="success" style={{ marginLeft: 'auto' }}>Guide matched</Badge>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {leg.tiles.map((tile) => (
          <div key={tile.label} className="tv-info-tile">
            <p className="tv-info-tile-label">{tile.label}</p>
            <p className="tv-info-tile-value">{tile.value}</p>
          </div>
        ))}
      </div>
      <div className="tv-col" style={{ gap: 2, marginTop: 14, paddingTop: 6, borderTop: '1px solid rgba(26,23,18,0.08)' }}>
        {leg.items.map((item, i) => (
          <div key={item.title} className="tv-row" style={{ gap: 14, padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(26,23,18,0.06)' }}>
            <span style={{ flex: '1 1 0', font: "600 15px/1.3 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{item.title}</span>
            <Badge tone="neutral">{item.est}</Badge>
            <span style={{ width: 56, textAlign: 'right', font: "600 14px/1 'Inter',sans-serif", color: 'var(--tv-ink)' }}>{item.price}</span>
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

function ActionCard({ action, onRespond }) {
  const price = action.price
  const priceLabel = price?.amount != null ? `$${price.amount}${price.is_estimate ? ' est.' : ''}` : null

  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 18, padding: '14px 16px' }}>
      <div className="tv-row" style={{ gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ flex: '1 1 0' }}>
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
        <p style={{ margin: '0 0 12px', font: "400 13px/1.45 'Inter',sans-serif", color: 'rgba(255,255,255,0.62)' }}>{action.blurb}</p>
      )}
      <div className="tv-row" style={{ gap: 8 }}>
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
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [suggestedActions, setSuggestedActions] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, suggestedActions])

  // Shared by sendMessage and retryLastMessage — takes the message history to
  // send as-is (already includes the pending user turn) so a retry doesn't
  // re-append and duplicate the user's bubble.
  const requestAssistantReply = async (history) => {
    setError('')
    setLoading(true)
    try {
      const response = await chatAssistant(
        // System notes (action confirmations) are a UI-only concept — the
        // backend's ChatMessage schema only knows about user/assistant turns.
        history
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map(({ role, content }) => ({ role, content })),
        { cities: LEGS.map((leg) => leg.city) }
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

  const respondToAction = (action, accepted) => {
    setSuggestedActions((cur) => cur.filter((a) => a.id !== action.id))
    setMessages((cur) => [
      ...cur,
      {
        role: 'system',
        kind: accepted ? 'added' : 'skipped',
        content: accepted ? `Added "${action.title}" to your itinerary.` : `Skipped "${action.title}".`,
      },
    ])
  }

  return (
    <TravelerShell active="Chat">
      <div className="tv-row" style={{ alignItems: 'stretch', minHeight: '100vh' }}>
        <div className="tv-col tv-pane-sticky" style={{ order: 2, width: 400, flex: 'none', background: 'var(--tv-dark)' }}>
          <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ margin: '0 0 6px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Planning with</p>
            <p style={{ margin: 0, font: "600 16px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: '#f3f2f6' }}>Moovai · Ghana, 6 days</p>
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

            {suggestedActions.length > 0 && (
              <div className="tv-col" style={{ gap: 10, marginTop: 2 }}>
                {suggestedActions.map((action) => (
                  <ActionCard key={action.id} action={action} onRespond={respondToAction} />
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

            <div className="tv-row" style={{ flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {QUICK_ACTIONS.map((action) => (
                <Pill key={action} variant="outline-light" size="sm" onClick={() => sendMessage(action)}>
                  {action}
                </Pill>
              ))}
            </div>
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
              <p className="tv-topbar-title">Ghana — 12 to 17 Nov 2026</p>
            </div>
            <Badge tone="pending">2 of 3 legs matched</Badge>
            <Pill variant="outline" onClick={() => navigate('/app/itinerary')}>Review day by day</Pill>
          </div>

          <div className="tv-col" style={{ padding: '26px 34px 30px', gap: 16 }}>
            <div className="tv-row" style={{ gap: 12 }}>
              <div className="tv-row" style={{ flex: '1 1 0', gap: 12, background: 'var(--tv-white)', border: '1px solid rgba(26,23,18,0.14)', borderRadius: 100, padding: '14px 20px', boxShadow: 'var(--tv-shadow-card)' }}>
                <span style={{ width: 15, height: 15, flex: 'none', borderRadius: '50%', border: '2px solid var(--tv-muted)' }} />
                <span style={{ flex: '1 1 0', font: "400 15px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Search a place, activity or provider to add manually…</span>
                <Badge tone="neutral">Cape Coast</Badge>
              </div>
              <Pill variant="outline">+ Add a city</Pill>
            </div>

            {LEGS.map((leg) => (
              <LegCard key={leg.city} leg={leg} />
            ))}

            <Card variant="dashed" style={{ padding: 26 }}>
              <div className="tv-row" style={{ gap: 12, marginBottom: 14, alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, font: "700 22px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>Cape Coast</h3>
                <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Days 5–6 · 16–17 Nov</span>
                <Badge tone="pending" style={{ marginLeft: 'auto' }}>Matching guides…</Badge>
              </div>
              <p style={{ margin: '0 0 16px', font: "400 15px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)', maxWidth: '60ch' }}>
                Three castle-and-canopy guides are being checked for your dates. You&apos;ll see the match here in a few minutes, and can swap it for an alternative.
              </p>
              <div className="tv-row" style={{ gap: 10 }}>
                <Pill variant="accent" onClick={() => navigate('/app/providers')}>See candidates</Pill>
                <Pill variant="outline">Drop this city</Pill>
              </div>
            </Card>

            <div className="tv-row" style={{ marginTop: 'auto', gap: 20, background: 'var(--tv-sand)', borderRadius: 22, padding: '20px 24px' }}>
              <div>
                <p style={{ margin: '0 0 4px', font: "600 12px/1 'Inter',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--tv-muted)' }}>Running estimate</p>
                <p style={{ margin: 0, font: "800 28px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.03em', color: 'var(--tv-ink)' }}>
                  $780 <span style={{ font: "500 14px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>of ~$800 budget</span>
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
