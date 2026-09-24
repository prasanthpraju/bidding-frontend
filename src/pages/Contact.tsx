import { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <div className="bg-white text-black">
      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <span className="text-xs font-semibold tracking-wider text-neutral-500">
            GET IN TOUCH
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold leading-tight mt-3 mb-6 max-w-3xl">
            Questions?
            <br />
            We're listening.
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl">
            Whether you're curious about a live auction, need help with a draw,
            or just want to say hi — drop us a line.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 6l8 6 8-6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Email</p>
                <p className="text-base font-medium">hello@nova.app</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Phone</p>
                <p className="text-base font-medium">+91 00000 00000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Office</p>
                <p className="text-base font-medium">Mumbai, India</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
            <h2 className="font-heading text-2xl font-semibold mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className={`w-full text-sm font-semibold py-3 rounded-full transition-all ${
                  sent
                    ? 'bg-neutral-800 text-white'
                    : 'bg-black text-white hover:bg-neutral-800 hover:-translate-y-0.5'
                }`}
              >
                {sent ? '✓ Message Sent' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact