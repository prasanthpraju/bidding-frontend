import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ===================================================== */}
      {/* HERO / HEADER */}
      {/* ===================================================== */}

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              group
              inline-flex
              cursor-pointer
              items-center
              gap-3
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-neutral-500
              transition-colors
              duration-300
              hover:text-black
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200
                bg-white
                text-base
                shadow-sm
                transition-all
                duration-300
                group-hover:-translate-x-1
                group-hover:border-black
              "
            >
              ←
            </span>

            Back to Home
          </button>


          {/* Header */}
          <div className="mt-14 max-w-3xl">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-red-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
                Workspace
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl font-black leading-none tracking-tight sm:text-6xl">
              Dashboard
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-neutral-500 sm:text-lg">
              Choose what you want to manage and access
              your bidding tools.
            </p>

          </div>


          {/* Accent */}
          <div className="mt-12 flex items-center gap-3">
            <span className="h-1 w-16 rounded-full bg-black" />
            <span className="h-1 w-6 rounded-full bg-red-500" />
            <span className="h-1 w-2 rounded-full bg-neutral-300" />
          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* DASHBOARD CARDS */}
      {/* ===================================================== */}

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* ================================================= */}
            {/* LIVE BIDDING */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={() => navigate("/bidding-dashboard")}
              className="
                group
                cursor-pointer
                rounded-[28px]
                border
                border-black
                bg-black
                p-8
                text-left
                text-white
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.55)]
                sm:p-10
              "
            >

              {/* Top Row */}
              <div className="flex items-start justify-between">

                {/* Icon */}
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-2xl
                    text-black
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:bg-red-500
                    group-hover:text-white
                  "
                >
                  🔨
                </div>

                {/* Number */}
                <span className="text-[11px] font-black tracking-[0.25em] text-white/30">
                  01
                </span>

              </div>


              {/* Content */}
              <div className="mt-10">

                {/* Status */}
                <div
                  className="
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-3
                    py-1.5
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-red-500" />

                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/60">
                    Available
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl">
                  Live Bidding
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-md font-medium leading-7 text-white/50">
                  Create, manage, and monitor your live
                  bidding schemes from one place.
                </p>

              </div>


              {/* Footer */}
              <div
                className="
                  mt-10
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/10
                  pt-6
                "
              >
                <span className="text-sm font-black">
                  Open Live Bidding
                </span>

                <span
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-lg
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:bg-red-500
                  "
                >
                  →
                </span>
              </div>

            </button>


            {/* ================================================= */}
            {/* LUCKY DRAW */}
            {/* ================================================= */}

            <div
              className="
                rounded-[28px]
                border
                border-neutral-200
                bg-neutral-50
                p-8
                sm:p-10
              "
            >

              {/* Top Row */}
              <div className="flex items-start justify-between">

                {/* Icon */}
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    text-2xl
                    opacity-50
                    grayscale
                  "
                >
                  🎯
                </div>

                {/* Badge */}
                <span
                  className="
                    rounded-full
                    border
                    border-neutral-200
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-neutral-400
                  "
                >
                  Coming Soon
                </span>

              </div>


              {/* Content */}
              <div className="mt-10">

                <h2 className="font-heading text-3xl font-black tracking-tight text-neutral-300 sm:text-4xl">
                  Lucky Draw
                </h2>

                <p className="mt-4 max-w-md font-medium leading-7 text-neutral-400">
                  Lucky draw functionality is currently
                  under development and will be available
                  soon.
                </p>

              </div>


              {/* Footer */}
              <div
                className="
                  mt-10
                  flex
                  items-center
                  justify-between
                  border-t
                  border-neutral-200
                  pt-6
                "
              >
                <span className="text-sm font-black text-neutral-300">
                  Coming Soon
                </span>

                <span
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-neutral-200
                    bg-white
                    text-neutral-300
                  "
                >
                  →
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* BOTTOM INFO */}
      {/* ===================================================== */}

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div
            className="
              flex
              flex-col
              gap-4
              border-t
              border-neutral-200
              pt-8
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">
              Nova Workspace
            </p>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs font-bold text-neutral-500">
                System Online
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;