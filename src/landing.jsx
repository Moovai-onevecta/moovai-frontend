import { useState } from 'react'
import heroImg from './assets/img/hero.png'
import "./assets/css/App.css"
import { Link } from 'react-router'


const STATS = [
  { value: '3', label: 'Cities matched per trip, on average' },
  { value: '<24h', label: 'From itinerary request to guide match' },
  { value: '100%', label: 'Vetted local operators, no exceptions' },
]

const MARQUEE_WORDS = [
  'Accra',
  'Kumasi',
  'Cape Coast',
  'Lagos',
  'Abidjan',
  'Lomé',
  'Dakar',
  'Freetown',
]


const STEPS = [
  {
    number: '1',
    title: 'Tell us about your trip',
    body: 'A conversation, not a form. Dates, cities, budget, and what you actually want to do.',
  },
  {
    number: '2',
    title: 'Get a matched itinerary',
    body: 'Every city leg is fulfilled by a vetted local operator — transport, stay and guide, matched to your trip.',
  },
  {
    number: '3',
    title: 'Travel with a safety net',
    body: 'Scheduled check-ins along the way, and a human on call the moment something needs one.',
  },
]

const FEATURES = [
  {
    title: 'Effortless Trip Planning',
    body: 'Tell us what you want and we build the itinerary — no research, no guesswork, no dozens of tabs open.',
  },
  {
    title: 'Local Expert Fulfillment',
    body: 'A vetted network of independent guides, boutique hotels and transport providers, matched city by city.',
  },
  {
    title: 'End-to-End Journey Support',
    body: 'Covered from the SIM card and transfer at arrival through to the ride to departure — not just the fun parts.',
  },
  {
    title: 'A Safety Net While You Travel',
    body: 'Your trip is checked in on while it happens, so problems get caught early instead of becoming a bad review.',
  },
]



const FAQS = [
  {
    q: 'Do I have to book everything upfront?',
    a: 'No. You build and preview your full itinerary for free, and only pay when you confirm the trip.',
  },
  {
    q: 'Who are the guides and operators?',
    a: 'Independent guides, boutique hotels and small transport providers, checked before they ever get matched with a traveler.',
  },
  {
    q: 'What happens if something goes wrong on my trip?',
    a: 'Your trip is monitored through scheduled check-ins. Anything urgent or ambiguous gets escalated to a real person, not left to a bot.',
  },
  {
    q: 'How is this different from a travel agency?',
    a: 'A big agency sells you a fixed package. Moovai builds your itinerary around your actual preferences, then fulfills it through local operators — usually at a lower cost.',
  },
  {
    q: 'Is this available outside Ghana?',
    a: 'Moovai is starting in Ghana, matching demand to the local SME network city by city. Other markets are a future step, not a current one.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button type="button" className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <span className="faq-chevron" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && <p className="faq-answer">{item.a}</p>}
    </div>
  )
}

function Landing() {
  const [openFaq, setOpenFaq] = useState(0)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <>
      <header className="nav">
        <Link id="#top" to="/signup" className="brand">
          <img src={heroImg} className="brand-mark" alt="" width="26" height="26" />
          Moovai
        </Link>
        <nav className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#impact">Impact</a>
          <a href="#partners">For Partners</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <Link className="btn btn-primary nav-cta" to="/signup">
          Start planning
        </Link>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="tagline">
              <span className="dot" aria-hidden="true" />
              Personalised itineraries fulfilled by local guides.
            </p>
            <h1>
              Personalised Travel.
              <br />
              Fulfilled by <em>experts</em>
            </h1>
            <p className="lede">
              Moovai helps you create travel itineraries to cities you travel to for the first time.
              We collaborate with local service providers to ensure you get the authentic local experience.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/signup">
                Plan My Trip
              </a>
              <a className="btn btn-ghost" href="#how-it-works">
                How does it work
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="trip-card">
              <div className="chat-bubble chat-bubble-user">
                3 cities, 6 days, ~$800. Love street food and history.
              </div>
              <div className="chat-bubble chat-bubble-ai">
                Got it — matching you with 3 local guides now.
              </div>
              <div className="trip-summary">
                <p className="trip-summary-label">Your itinerary</p>
                <ul className="trip-legs">
                  <li>
                    <span>Accra</span>
                    <span className="trip-status">Guide matched</span>
                  </li>
                  <li>
                    <span>Kumasi</span>
                    <span className="trip-status">Guide matched</span>
                  </li>
                  <li>
                    <span>Cape Coast</span>
                    <span className="trip-status">Guide matched</span>
                  </li>
                </ul>
                <div className="trip-total">
                  <span>Estimated total</span>
                  <strong>$780</strong>
                </div>
              </div>
              <div className="glass glass--a">
                <span className="glass__k">Response time</span>
                <span className="glass__v">2 min</span>
              </div>
              <div className="glass glass--b">
                <span className="glass__k">Escalation</span>
                <span className="glass__v">Human</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stats-row">
            {STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-track" aria-hidden="true">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span key={`${word}-${i}`}>
                {word} <i>&bull;</i>
              </span>
            ))}
          </div>
        </div>

        <section className="split">
          <div className="section-head">
            <p className="eyebrow">Overview</p>
            <h2>Travel shouldn't be complicated.</h2>
            <p className="section-lede">
              The operators with the marketing budget to be visible aren&apos;t always the
              ones best suited to you. The people who know a city best have no reliable
              channel to reach travelers — so you pay more for a generic trip, and they stay
              invisible.
            </p>
          </div>
          <div className="problem-cards">
            <div className="problem-card">
              <h3>
                Big agencies win visibility, not fit
                </h3>
              <p>
                A handful of large agencies have the marketing budget to be seen — not necessarily the operators best suited to you.
              </p>
            </div>
            <div className="problem-card">
              <h3>
                SMEs have the knowledge, not the channel
                </h3>
              <p>
                Independent guides, boutique hotels and small transport providers know their city best, but have no reliable way to reach travelers.
              </p>
            </div>
            <div className="problem-card">
              <h3>
                Travelers default to caution
                </h3>
              <p>
                Anxious about SIMs, transport and fair pricing, first-timers book the big name out of caution — not genuine preference.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="split">
          <p className="eyebrow">How it works</p>
          <h2 className="section-head-title">
            Three steps. One trip that actually fits.
          </h2>
          <div className="split-grid">
            <ol className="steps">
              {STEPS.map((step) => (
                <li className="step" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bento">
          <p className="eyebrow">What&apos;s inside</p>
          <h2>Built for the first trip, not the tenth.</h2>
          <div className="bento-grid">
            {FEATURES.map((feature) => (
              <div className="bento-cell" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="partners" className="partners">
          <p className="eyebrow eyebrow--invert">For local operators</p>
          <h2>Demand you couldn&apos;t reach on your own.</h2>
          <p className="section-lede" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Moovai is free to join. We only get paid when you do — a share of each booking,
            priced below what a legacy agency markup costs the traveler. No subscription, no
            listing fee.
          </p>
          <ul className="partner-list">
            <li>Free onboarding, no listing fee</li>
            <li>Bookings matched to your city and specialty</li>
            <li>Paid per trip, not per lead</li>
          </ul>
          <a className="btn btn-primary" href="#pricing">
            Apply as a partner
          </a>
        </section>

        <section className="trust">
          <p className="eyebrow">Trust</p>
          <h2>Vetted, not just listed.</h2>
          <p className="section-lede">
            Every guide and operator in the network is checked before they&apos;re matched
            with a traveler. Trips are monitored while they happen, so problems get caught
            early instead of becoming a bad review.
          </p>
          <ul className="trust-list">
              <li>Vetted local operators</li>
              <li>Real-time in app support</li>
              <li>Competitive price offers</li>
              <li>Price negotiation with service providers</li>
          </ul>
        </section>

        <section id="impact" className="split impact">
          <div className="section-head">
            <p className="eyebrow">Impact</p>
            <h2>Keeping travel spending in the local economy.</h2>
            <p className="section-lede">
              Support your destination&apos;s local economy by booking guided trips with local providers.
              Rather than booking with conglomorates that take money out of the country
              Moovai routes bookings directly to the
              guides, drivers and hosts who actually deliver the trip so your money works
              for the local economy, not around it.
            </p>
          </div>
          <div className="problem-cards">
             <div className="problem-card">
                <h3>Paid direct to local operators</h3>
                <p>Every booking fee finds its way to the guide, driver or host who did the work — not swallowed by an outside agency markup.</p>
              </div>
             <div className="problem-card">
                <h3>Money stays in the city you visit</h3>
                <p>Local guides and hosts spend locally too — on food, transport and staff drawn from the same city — keeping tourism spending circulating at home.</p>
              </div>
             <div className="problem-card">
                <h3>A real channel for small operators</h3>
                <p>Independent guides and boutique hosts finally get a way to reach travelers, without paying an agency just to be found.</p>
              </div>
          </div>
        </section>

        <section className="manifesto">
          <p>
            &ldquo;You shouldn&apos;t have to choose between overpaying a big agency and
            gambling on someone you found in a Facebook group.&rdquo;
          </p>
        </section>

        <section id="pricing" className="pricing">
          <div className="pricing-head">
            <div className="section-head">
              <p className="eyebrow">Pricing</p>
              <h2>No subscriptions. Just a fair cut of the trip.</h2>
            </div>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <p className="pricing-kicker">For travelers</p>
              <p className="pricing-price">Free to plan</p>
              <p className="pricing-body">
                Build and preview your itinerary for free. Pay only when you confirm your
                trip.
              </p>
              <Link to="/signup" className='btn btn-primary'>
                Start planning
              </Link>
            </div>
            <div className="pricing-card pricing-card-highlight">
              <p className="pricing-kicker">For partners</p>
              <p className="pricing-price">Free to join</p>
              <p className="pricing-body">
                List your services at no cost. We take a small commission only when you get
                booked.
              </p>
              <Link className="btn btn-primary" to="/provider_auth.tsx">
                Apply as a partner
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="faq">
          <div className="faq-head">
            <p className="eyebrow">Good questions</p>
            <h2>FAQ</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="cta-card">
            <div className="cta-blob" aria-hidden="true" />
            <h2>Get early access to Moovai.</h2>
            {submitted ? (
              <p className="signup-confirm">Thanks — we&apos;ll be in touch.</p>
            ) : (
              <form className="signup-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-dark">
                  Notify me
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-cta">Plan it. Live it.</span>
        <div className="footer-row">
          <div className="footer-brand">
            <img src={heroImg} className="brand-mark" alt="" width="24" height="24" />
            <span>Moovai</span>
          </div>
          <p className="footer-note">A Meridian product.</p>
          <p className="footer-copy">© {new Date().getFullYear()} Moovai. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Landing
