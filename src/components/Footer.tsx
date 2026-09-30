import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-16">

          {/* ================= BRAND ================= */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 group cursor-pointer"
            >
              {/* Logo Icon */}
              <div
                className="
                  w-9 h-9
                  rounded-xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
              >
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              </div>

              {/* Logo */}
              <span
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-white
                  cursor-pointer
                "
              >
                Nova<span className="text-red-500">.</span>
              </span>
            </Link>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-neutral-400
                max-w-sm
              "
            >
              A modern platform for real-time bidding and
              exciting lucky draws — designed for speed,
              transparency, fairness, and engagement.
            </p>

            {/* Status */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                px-3
                py-2
                rounded-full
                border
                border-neutral-800
                bg-neutral-950
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-green-500
                    opacity-75
                    animate-ping
                  "
                />
                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-green-500
                  "
                />
              </span>

              <span className="text-xs font-bold text-neutral-300">
                Platform Online
              </span>
            </div>
          </div>

          {/* ================= NAVIGATE ================= */}
          <div>
            <h4
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                font-bold
                text-neutral-500
                mb-5
              "
            >
              Navigate
            </h4>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  Dashboard
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= COMPANY ================= */}
          <div>
            <h4
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                font-bold
                text-neutral-500
                mb-5
              "
            >
              Company
            </h4>

            <ul className="space-y-3">

              <li>
                <a
                  href="#"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  Privacy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    inline-block
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  Terms
                </a>
              </li>

            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h4
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                font-bold
                text-neutral-500
                mb-5
              "
            >
              Contact
            </h4>

            <ul className="space-y-3">

              <li>
                <a
                  href="mailto:hello@nova.app"
                  className="
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  hello@nova.app
                </a>
              </li>

              <li>
                <a
                  href="tel:+910000000000"
                  className="
                    text-sm
                    font-bold
                    text-neutral-400
                    cursor-pointer
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  +91 00000 00000
                </a>
              </li>

              <li className="text-sm font-bold text-neutral-400">
                Mumbai, India
              </li>

            </ul>

            {/* Contact Accent */}
            <div className="mt-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-red-500" />
              <span className="text-xs font-bold text-neutral-500">
                We&apos;re here to help
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-neutral-900">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            sm:px-8
            lg:px-10
            py-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          {/* Copyright */}
          <p className="text-xs font-medium text-neutral-600">
            © {year} Nova. All rights reserved.
          </p>

          {/* Bottom Text */}
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <span>Built for</span>

            <span className="font-bold text-neutral-400">
              Live Bidding
            </span>

            <span className="text-red-500">•</span>

            <span className="font-bold text-neutral-400">
              Lucky Draws
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;