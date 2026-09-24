import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface HeroProps {
  isLoggedIn: boolean
}

const slides = [
  {
    badge: 'LIVE BIDDING PLATFORM',
    line1: 'Bid Live.',
    line2: 'Win Big.',
    text: 'Join real-time auctions and instant lucky draws — every bid moves the price, every second counts.',
    image:
      'https://images.unsplash.com/photo-1560269166-0f0e6c99e4a2?auto=format&fit=crop&w=1800&q=70',
  },
  {
    badge: 'ELECTRONICS AUCTIONS',
    line1: 'Latest Gadgets.',
    line2: 'Lowest Bids.',
    text: 'From flagship phones to laptops — new electronics auctions go live every hour.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1800&q=70',
  },
  {
    badge: 'LUCKY DRAW EVENTS',
    line1: 'One Ticket.',
    line2: 'Any Prize.',
    text: 'Every bid you place earns a free entry into our instant lucky draws.',
    image:
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1800&q=70',
  },
]

const Hero = ({ isLoggedIn }: HeroProps) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const goTo = (i: number) => setActive(i)
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length)
  const next = () => setActive((p) => (p + 1) % slides.length)
  const slide = slides[active]

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-[680px] flex items-center">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ease-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${s.image}')` }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="absolute top-20 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-2xl animate-float" />
      <div className="absolute bottom-24 left-1/4 h-16 w-16 rounded-full bg-white/10 blur-xl animate-float-slow" />
      <div className="absolute top-1/3 right-10 h-32 w-32 rounded-full bg-white/5 blur-3xl animate-float-slow" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-24 w-full grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div key={active} className="animate-fade-up">
          <div className="inline-flex items-center gap-2 border border-white/25 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-xs font-semibold tracking-wider">{slide.badge}</span>
          </div>

          <h1 className="font-heading leading-[0.95] mb-6">
            <span className="block text-4xl sm:text-6xl font-light">{slide.line1}</span>
            <span className="block text-5xl sm:text-7xl font-bold">{slide.line2}</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg max-w-md mb-10">
            {slide.text}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={isLoggedIn ? '/dashboard' : '/contact'}
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-neutral-200 hover:-translate-y-0.5 transition-all shadow-lg shadow-white/5"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all"
            >
              Learn More
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-10 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/60" /> 12K+ Active Bidders
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/60" /> 850+ Draws Won
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/60" /> 100% Transparent
            </span>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative h-80 w-80 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-white/10 animate-spin-slow" />
            <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse-ring" />
            <div className="absolute inset-12 rounded-full border border-dashed border-white/10 animate-spin-slow" />
            <svg
              width="88"
              height="88"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M14 12l6 6-2 2-6-6" />
              <path d="M4 14l6-6 4 4-6 6z" />
              <path d="M14 4l4 4" strokeLinecap="round" />
              <circle cx="6" cy="18" r="1.4" fill="white" stroke="none" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 sm:left-8 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-white' : 'w-3 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-6 right-6 sm:right-8 flex items-center gap-3 z-10">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="h-9 w-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="h-9 w-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default Hero