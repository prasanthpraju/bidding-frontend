import { useCallback, useEffect, useState } from "react";

/* Content is unchanged */
const slides = [
  {
    id: "bidding",
    eyebrow: "LIVE BIDDING PLATFORM",
    title: "Bid Smart.",
    highlight: "Win Your Round.",
    description:
      "Participate in secure and transparent bidding rounds, track your bidding activity, and stay updated with every event in real time.",
    concept: "Real-Time • Transparent • Competitive",
    background:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "lucky",
    eyebrow: "GAMIFY YOUR EVENT",
    title: "Fair, Fun, & Fast",
    highlight: "Lucky Draws.",
    description:
      "Turn your events into exciting experiences with automated and transparent lucky draws that keep everyone engaged.",
    concept: "Instant • Fair • Exciting",
    background:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=90",
  },
];

const SLIDE_MS = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), []);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = slides[active];
  const words = slide.concept.split("•").map((w) => w.trim());

  return (
    <section
      id="hero-slider"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="hs2 relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F3EDE6] text-[#14100F] lg:flex-row"
    >
      {/* ================= TEXT PANEL ================= */}
      <div className="relative z-20 flex flex-1 flex-col justify-between overflow-hidden px-6 pb-8 pt-28 sm:px-10 lg:w-[54%] lg:flex-none lg:px-16 lg:pt-32">
        {/* animated background: counter-scrolling word bands */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none"
        >
          {[0, 1].map((row) => (
            <div
              key={`${slide.id}-${row}`}
              className="absolute left-0 w-max"
              style={{ top: row ? "62%" : "10%" }}
            >
              <div
                className={`hs2-band hs2-display flex whitespace-nowrap text-[clamp(5rem,12vw,11rem)] font-extrabold leading-none tracking-[-0.04em] ${
                  row ? "hs2-band-rev hs2-band-solid" : "hs2-band-outline"
                }`}
              >
                {Array.from({ length: 8 }).map((_, k) => (
                  <span key={k} className="px-8">
                    {words.join(" · ")}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="hs2-orb absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#D91E2E]/15 blur-[90px]" />
        </div>

        <div key={slide.id} aria-live="polite" className="relative z-10">
          <h1 className="hs2-display text-[clamp(3rem,6.6vw,6.75rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                className="hs2-line block"
                style={{ animationDelay: "80ms" }}
              >
                {slide.title}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] text-[#D91E2E]">
              <span
                className="hs2-line block"
                style={{ animationDelay: "200ms" }}
              >
                {slide.highlight}
              </span>
            </span>
          </h1>

          <p
            className="hs2-fade mt-8 max-w-md text-base leading-7 text-[#14100F]/70 sm:text-[17px]"
            style={{ animationDelay: "450ms" }}
          >
            {slide.description}
          </p>
        </div>

        {/* controls */}
        <div className="relative z-10 mt-12 flex items-end gap-6 sm:gap-10">
          <div className="hs2-display leading-none">
            <span className="text-6xl font-extrabold tracking-tighter tabular-nums sm:text-7xl">
              {pad(active + 1)}
            </span>
            <span className="ml-2 text-sm font-semibold text-[#14100F]/40 tabular-nums">
              / {pad(slides.length)}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-4 pb-1">
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${s.id} slide`}
                  aria-current={active === i}
                  className="group h-5 flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2E]"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden bg-[#14100F]/15 group-hover:bg-[#14100F]/30">
                    {active === i && (
                      <span
                        key={`p-${active}`}
                        onAnimationEnd={next}
                        className="hs2-progress absolute inset-0 origin-left bg-[#D91E2E]"
                        style={{
                          animationDuration: `${SLIDE_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex">
            {[
              {
                label: "Previous slide",
                fn: prev,
                d: "M19 12H5m0 0l6-6m-6 6l6 6",
              },
              {
                label: "Next slide",
                fn: next,
                d: "M5 12h14m0 0l-6-6m6 6l-6 6",
              },
            ].map((b, i) => (
              <button
                key={b.label}
                onClick={b.fn}
                aria-label={b.label}
                className={`flex h-14 w-14 items-center justify-center border border-[#14100F] transition-colors hover:bg-[#D91E2E] hover:border-[#D91E2E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2E] sm:h-16 sm:w-16 ${
                  i ? "-ml-px bg-[#14100F] text-white" : ""
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                >
                  <path d={b.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= IMAGE PANEL ================= */}
      <div className="hs2-cut relative order-first h-[42vh] flex-none overflow-hidden bg-[#14100F] lg:order-none lg:-ml-[7vw] lg:h-auto lg:flex-1">
        {slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={active !== i}
            className={`absolute inset-0 ${active === i ? "hs2-wipe z-10" : "z-0"}`}
          >
            <div
              className={`hs2-photo absolute inset-0 bg-cover bg-center ${active === i ? "hs2-photo-on" : ""}`}
              style={{ backgroundImage: `url("${s.background}")` }}
            />
            {/* duotone */}
            <div className="absolute inset-0 bg-[#D91E2E] mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100F]/85 via-[#14100F]/10 to-transparent" />
            {active === i && <div className="hs2-sweep absolute inset-0" />}
          </div>
        ))}

        {/* eyebrow, set vertically along the edge */}
        <div
          key={`e-${slide.id}`}
          className="hs2-fade absolute right-5 top-6 z-20 hidden text-xs font-semibold tracking-[0.35em] text-white/90 lg:block"
          style={{ writingMode: "vertical-rl", animationDelay: "500ms" }}
        >
          {slide.eyebrow}
        </div>

        {/* mobile eyebrow */}
        <div className="absolute left-6 top-24 z-20 text-[11px] font-semibold tracking-[0.25em] text-white lg:hidden">
          {slide.eyebrow}
        </div>

        {/* concept words */}
        <ul
          key={`c-${slide.id}`}
          className="absolute bottom-6 left-6 z-20 lg:bottom-14 lg:left-[calc(7vw+2rem)]"
        >
          {words.map((w, i) => (
            <li key={w} className="overflow-hidden">
              <span
                className="hs2-line hs2-display block text-[clamp(1.5rem,3.6vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
                style={{ animationDelay: `${350 + i * 120}ms` }}
              >
                {w}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&display=swap');

        .hs2 { font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif; }
        .hs2-display { font-family: 'Bricolage Grotesque', 'Arial Narrow', ui-sans-serif, sans-serif; font-variation-settings: 'opsz' 96; }

        .hs2-cut { clip-path: none; }
        @media (min-width: 1024px) {
          .hs2-cut { clip-path: polygon(7vw 0, 100% 0, 100% 100%, 0 100%); }
        }

        .hs2-line { transform: translateY(105%); animation: hs2Line 900ms cubic-bezier(.2,.8,.2,1) forwards; }
        .hs2-fade { opacity: 0; animation: hs2Fade 800ms ease-out forwards; }
        @property --w { syntax: '<percentage>'; inherits: false; initial-value: 12.5%; }

        /* image reveal: vertical blinds opening */
        .hs2-wipe {
          -webkit-mask-image: repeating-linear-gradient(90deg, #000 0, #000 var(--w), transparent var(--w), transparent 12.5%);
          mask-image: repeating-linear-gradient(90deg, #000 0, #000 var(--w), transparent var(--w), transparent 12.5%);
          animation: hs2Blinds 1200ms cubic-bezier(.65,0,.25,1) both;
        }
        .hs2-photo { filter: grayscale(1) contrast(1.15); transform: scale(1.14); }
        .hs2-photo-on { animation: hs2Drift 14s ease-in-out infinite alternate; }
        .hs2-sweep {
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.28) 50%, transparent 65%);
          transform: translateX(-120%);
          animation: hs2Sweep 4.5s ease-in-out 1.2s infinite;
        }

        /* text-panel background */
        .hs2-band { animation: hs2Band 45s linear infinite; }
        .hs2-band-rev { animation-direction: reverse; animation-duration: 60s; }
        .hs2-band-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(20,16,15,.14); }
        .hs2-band-solid { color: rgba(217,30,46,.07); }
        .hs2-orb { animation: hs2Orb 9s ease-in-out infinite alternate; }
        .hs2-progress { animation-name: hs2Progress; animation-timing-function: linear; animation-fill-mode: forwards; }

        @keyframes hs2Line { to { transform: translateY(0); } }
        @keyframes hs2Fade { to { opacity: 1; } }
        @keyframes hs2Blinds { from { --w: 0%; } to { --w: 12.5%; } }
        @keyframes hs2Drift { from { transform: scale(1.14) translateX(-3%); } to { transform: scale(1.14) translateX(3%); } }
        @keyframes hs2Sweep { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(120%); } }
        @keyframes hs2Band { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes hs2Orb { from { transform: translate(0, 0) scale(1); } to { transform: translate(120px, -80px) scale(1.3); } }
        @keyframes hs2Progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .hs2 *, .hs2 *::before, .hs2 *::after { animation: none !important; transition: none !important; }
          .hs2-line { transform: none; }
          .hs2-fade { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
