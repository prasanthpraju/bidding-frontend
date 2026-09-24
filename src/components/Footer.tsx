import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black text-white pt-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12">
        <div>
          <h3 className="font-heading text-xl font-semibold mb-3">
            Nova<span className="text-neutral-500">.</span>
          </h3>
          <p className="text-neutral-400 text-sm max-w-[240px] leading-relaxed">
            Real-time bidding and instant lucky draws — built for speed, fairness, and fun.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">Navigate</h4>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li>hello@nova.app</li>
            <li>+91 00000 00000</li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800 px-8 py-5 text-center text-xs text-neutral-500">
        © {year} Nova. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer