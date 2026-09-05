import { useNavigate } from 'react-router'
import TravelerShell from '../../components/traveler/TravelerShell'
import ChatBubble from '../../components/traveler/ChatBubble'
import Card from '../../components/traveler/Card'
import Pill from '../../components/traveler/Pill'
import Badge from '../../components/traveler/Badge'

const MESSAGES_BEFORE_APPROVAL = [
  { align: 'left', tone: 'accent', text: 'Six days across Accra, Kumasi and Cape Coast is comfortable. Do you want the coast at the end, so you finish slow?' },
  { align: 'right', tone: 'dark-soft', text: "Yes. And I'd rather not spend a whole day on a bus." },
  { align: 'left', tone: 'accent', text: "Then Accra → Kumasi flies (55 min) and Kumasi → Cape Coast goes by private car with a stop at Lake Bosomtwe. I've put that in the draft on the right." },
  { align: 'right', tone: 'dark-soft', text: 'Can day 2 be mostly food?' },
  { align: 'left', tone: 'accent', text: "Done. One more city would fit without rushing you — Elmina, 30 minutes from Cape Coast. Approve it and I'll rebuild days 5 and 6 around it." },
]

const MESSAGES_AFTER_APPROVAL = [
  { align: 'right', tone: 'dark-soft', text: 'Approved. What would we do there?' },
  { align: 'left', tone: 'accent', text: 'Elmina is in. Here are three activities for the coast — approve the ones you want.' },
]

const ELMINA_TAGS = ['Est. half day', '+$34 total', 'No extra night']

const SUGGESTIONS = [
  { title: 'Cape Coast Castle, with a historian', city: 'Cape Coast', by: 'Esi Amoah · local guide', est: 'Est. 3 hrs', blurb: 'The dungeons and the door of no return, told slowly. Best in the morning before the coaches arrive.', price: '$24', btn: 'Added to day 5', btnVariant: 'added', alt: 'Undo' },
  { title: 'Kakum canopy walk at dawn', city: 'Cape Coast', by: 'Park entry + transfer', est: 'Est. half day', blurb: 'Leave at 05:30 to have the walkways to yourself. Includes the 40 min drive each way.', price: '$31', btn: 'Approve', btnVariant: 'accent', alt: 'Skip' },
  { title: 'Elmina fishing harbour and lunch', city: 'Elmina, 20 min west', by: 'Esi Amoah · local guide', est: 'Est. 4 hrs', blurb: 'The busiest harbour on the coast, then grilled fish at a stall she has used for years.', price: '$19', btn: 'Approve', btnVariant: 'accent', alt: 'Skip' },
]

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

const SUGGESTION_BTN_STYLE = {
  added: { background: 'rgba(127,211,154,0.16)', color: '#7fd39a', border: 'none' },
  accent: { background: 'var(--tv-accent)', color: '#fff', border: 'none' },
}

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

function Chat() {
  const navigate = useNavigate()

  return (
    <TravelerShell active="Chat">
      <div className="tv-row" style={{ alignItems: 'stretch', minHeight: '100vh' }}>
        <div className="tv-col tv-pane-sticky" style={{ order: 2, width: 400, flex: 'none', background: 'var(--tv-dark)' }}>
          <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ margin: '0 0 6px', font: "700 11px/1 'Inter',sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Planning with</p>
            <p style={{ margin: 0, font: "600 16px/1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: '#f3f2f6' }}>Moovai · Ghana, 6 days</p>
          </div>
          <div className="tv-col tv-pane-scroll" style={{ padding: 22, gap: 14 }}>
            {MESSAGES_BEFORE_APPROVAL.map((m, i) => (
              <ChatBubble key={i} align={m.align} tone={m.tone}>{m.text}</ChatBubble>
            ))}

            <div style={{ background: 'var(--tv-white)', borderRadius: 20, padding: 18, boxShadow: '0 18px 40px -20px rgba(0,0,0,0.5)' }}>
              <div className="tv-row" style={{ gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ width: 44, height: 44, flex: 'none', borderRadius: 13, background: 'var(--tv-sand)', color: 'var(--tv-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px/1 'Inter',sans-serif" }}>04</span>
                <div style={{ flex: '1 1 0' }}>
                  <p style={{ margin: '0 0 4px', font: "700 19px/1.1 'Inter Tight','Inter',sans-serif", letterSpacing: '-0.02em', color: 'var(--tv-ink)' }}>Add Elmina as a stop</p>
                  <p style={{ margin: 0, font: "500 13px/1 'Inter',sans-serif", color: 'var(--tv-muted)' }}>Day 6 · 30 min from Cape Coast</p>
                </div>
                <Badge tone="pending" style={{ flex: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Needs approval</Badge>
              </div>
              <p style={{ margin: '0 0 14px', font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--tv-muted)' }}>
                Adds the harbour and St. George&apos;s Castle. Esi Amoah covers both cities, so no second guide is needed.
              </p>
              <div className="tv-row" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {ELMINA_TAGS.map((tag) => (
                  <Badge key={tag} tone="neutral">{tag}</Badge>
                ))}
              </div>
              <div className="tv-row" style={{ gap: 8, paddingTop: 14, borderTop: '1px solid rgba(26,23,18,0.08)' }}>
                <Pill variant="accent" size="sm" style={{ flex: '1 1 0', justifyContent: 'center' }}>Approve and add</Pill>
                <Pill variant="outline" size="sm">Not this trip</Pill>
                <Pill variant="outline" size="sm">Why?</Pill>
              </div>
            </div>

            {MESSAGES_AFTER_APPROVAL.map((m, i) => (
              <ChatBubble key={i} align={m.align} tone={m.tone}>{m.text}</ChatBubble>
            ))}

            <div className="tv-col" style={{ gap: 10, marginTop: 2 }}>
              {SUGGESTIONS.map((s) => (
                <div key={s.title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 18, padding: '14px 16px' }}>
                  <div className="tv-row" style={{ gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ flex: '1 1 0' }}>
                      <p style={{ margin: '0 0 4px', font: "600 15px/1.3 'Inter',sans-serif", color: '#f3f2f6' }}>{s.title}</p>
                      <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: 'rgba(255,255,255,0.6)' }}>{s.city} · {s.by}</p>
                    </div>
                    <span style={{ flex: 'none', padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', font: "600 11px/1 'Inter',sans-serif" }}>{s.est}</span>
                  </div>
                  <p style={{ margin: '0 0 12px', font: "400 13px/1.45 'Inter',sans-serif", color: 'rgba(255,255,255,0.62)' }}>{s.blurb}</p>
                  <div className="tv-row" style={{ gap: 8 }}>
                    <span style={{ marginRight: 'auto', font: "700 15px/1 'Inter Tight','Inter',sans-serif", color: '#fff' }}>{s.price}</span>
                    <Pill size="sm" style={SUGGESTION_BTN_STYLE[s.btnVariant]}>{s.btn}</Pill>
                    <Pill variant="outline-light" size="sm">{s.alt}</Pill>
                  </div>
                </div>
              ))}
            </div>

            <div className="tv-row" style={{ flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {QUICK_ACTIONS.map((action) => (
                <Pill key={action} variant="outline-light" size="sm">{action}</Pill>
              ))}
            </div>
          </div>
          <div className="tv-col" style={{ padding: '18px 22px 22px', borderTop: '1px solid rgba(255,255,255,0.1)', gap: 10 }}>
            <div className="tv-row" style={{ gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 100, padding: '12px 8px 12px 18px' }}>
              <span style={{ flex: '1 1 0', font: "400 14px/1 'Inter',sans-serif", color: 'rgba(255,255,255,0.45)' }}>Ask for a change…</span>
              <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 100, background: 'var(--tv-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 15px/1 'Inter',sans-serif" }}>↑</span>
            </div>
            <p style={{ margin: 0, font: "400 12px/1 'Inter',sans-serif", color: 'rgba(255,255,255,0.35)' }}>Nothing is booked until you confirm.</p>
          </div>
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
