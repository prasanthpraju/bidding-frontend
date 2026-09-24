import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Real-time Auctions',
    desc: 'Every bid updates instantly — watch prices move live and never miss a moment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M14 12l6 6-2 2-6-6" />
        <path d="M4 14l6-6 4 4-6 6z" />
        <path d="M14 4l4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Instant Lucky Draws',
    desc: 'Each bid earns you a free ticket. Winners are drawn in real time — no waiting.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M20 12v10H4V12" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    title: 'Fair & Transparent',
    desc: 'Every bid and draw is logged and verifiable. What you see is what you get.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const About = () => {
  return (
    <div className="bg-white text-black">
      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <span className="text-xs font-semibold tracking-wider text-neutral-500">
            ABOUT NOVA
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold leading-tight mt-3 mb-6 max-w-3xl">
            Where every bid
            <br />
            tells a story.
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl">
            Nova is a real-time bidding platform built for speed and fairness.
            Every second counts, every bid is transparent, and every participant
            gets a shot at winning — through auctions or our instant lucky draws.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold mb-10">
            What makes us different
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group border border-neutral-200 rounded-2xl p-7 hover:border-black hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-black text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-heading text-5xl font-bold">12K+</p>
              <p className="text-xs text-neutral-500 mt-2">Active Bidders</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold">₹4.2Cr</p>
              <p className="text-xs text-neutral-500 mt-2">Total Bids Placed</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold">850+</p>
              <p className="text-xs text-neutral-500 mt-2">Draws Won</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold">24/7</p>
              <p className="text-xs text-neutral-500 mt-2">Live Auctions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-5">
            Ready to start bidding?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Join thousands of bidders winning electronics and cash prizes every day.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-neutral-200 hover:-translate-y-0.5 transition-all"
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About