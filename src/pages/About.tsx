import { Link } from "react-router-dom";

const features = [
  {
    title: "Real-Time Auctions",
    desc: "Every bid updates instantly, keeping participants connected to the action as prices move in real time.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-6 h-6"
      >
        <path d="M14 12l6 6-2 2-6-6" />
        <path d="M4 14l6-6 4 4-6 6z" />
        <path d="M14 4l4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Instant Lucky Draws",
    desc: "Turn participation into excitement with fast and engaging lucky draws designed for live events.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-6 h-6"
      >
        <path d="M20 12v10H4V12" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    title: "Fair & Transparent",
    desc: "Bidding activity and draw results are designed to remain clear, traceable, and easy for participants to understand.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path
          d="M9 12l2 2 4-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const About = () => {
  return (
    <div className="bg-white text-black">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">

          <div className="max-w-4xl">

            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-red-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
                About Nova
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl font-heading text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Where every bid
              <br />

              <span className="text-neutral-400">
                tells a story.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              Nova is a modern platform built around real-time
              bidding and exciting lucky draws. We bring speed,
              transparency, and engagement together to create
              a simple experience for every participant.
            </p>

          </div>

          {/* Simple Accent */}
          <div className="mt-14 flex items-center gap-3">
            <span className="h-1 w-16 rounded-full bg-black" />
            <span className="h-1 w-6 rounded-full bg-red-500" />
            <span className="h-1 w-2 rounded-full bg-neutral-300" />
          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* FEATURES */}
      {/* ===================================================== */}

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          {/* Header */}
          <div className="mb-12 max-w-2xl">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-7 bg-red-500" />

              <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                Why Nova
              </span>
            </div>

            <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl">
              Built around the
              <span className="text-neutral-400">
                {" "}experience.
              </span>
            </h2>

            <p className="mt-4 leading-7 text-neutral-600">
              Everything is designed to keep bidding simple,
              engaging, and easy to follow.
            </p>

          </div>


          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  cursor-pointer
                  overflow-hidden
                  rounded-3xl
                  border
                  border-neutral-200
                  bg-white
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-black
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                "
              >

                {/* Number */}
                <span
                  className="
                    absolute
                    right-7
                    top-6
                    text-xs
                    font-black
                    text-neutral-300
                    transition-colors
                    duration-300
                    group-hover:text-red-500
                  "
                >
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className="
                    mb-7
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-black
                    text-white
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-red-500
                  "
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 font-heading text-xl font-black">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-7 text-neutral-600">
                  {feature.desc}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================== */}

      <section className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left */}
            <div>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-7 bg-red-500" />

                <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                  Simple Process
                </span>
              </div>

              <h2 className="font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Participate.
                <br />

                <span className="text-neutral-400">
                  Compete. Win.
                </span>
              </h2>

              <p className="mt-6 max-w-lg leading-7 text-neutral-600">
                Nova keeps the experience straightforward.
                Join an event, participate in the bidding or
                draw, and follow the results as they happen.
              </p>

            </div>


            {/* Right */}
            <div className="space-y-4">

              {/* Step 01 */}
              <div
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-5
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-black
                  hover:shadow-lg
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-sm
                    font-black
                    text-white
                  "
                >
                  01
                </span>

                <div>
                  <h3 className="text-lg font-black">
                    Choose an Event
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Explore available bidding events and
                    lucky draw opportunities.
                  </p>
                </div>
              </div>


              {/* Step 02 */}
              <div
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-5
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-black
                  hover:shadow-lg
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-sm
                    font-black
                    text-white
                  "
                >
                  02
                </span>

                <div>
                  <h3 className="text-lg font-black">
                    Participate Live
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Place your bid or participate in an active
                    lucky draw while the event is live.
                  </p>
                </div>
              </div>


              {/* Step 03 */}
              <div
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-5
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-red-500
                  hover:shadow-lg
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    text-sm
                    font-black
                    text-white
                  "
                >
                  03
                </span>

                <div>
                  <h3 className="text-lg font-black">
                    Follow the Result
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Stay updated as the event progresses and
                    results are announced.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* CTA */}
      {/* ===================================================== */}

      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">

          {/* Label */}
          <div className="mb-6 flex justify-center">
            <span
              className="
                rounded-full
                border
                border-neutral-800
                bg-neutral-950
                px-4
                py-2
                text-xs
                font-black
                uppercase
                tracking-[0.15em]
                text-neutral-400
              "
            >
              Start Your Experience
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Ready to join
            <br />

            <span className="text-neutral-500">
              the action?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl leading-7 text-neutral-400">
            Explore live bidding events and exciting lucky
            draws built to keep every moment engaging.
          </p>

          {/* Button */}
          <Link
            to="/contact"
            className="
              group
              mt-9
              inline-flex
              cursor-pointer
              items-center
              gap-3
              rounded-full
              bg-white
              px-7
              py-3.5
              text-sm
              font-black
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-red-500
              hover:text-white
              hover:shadow-[0_10px_30px_rgba(239,68,68,0.25)]
            "
          >
            Get in Touch

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default About;