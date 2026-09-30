import { useLocation, useNavigate, useParams } from "react-router-dom";

type BiddingLocationState = {
  participantId?: string;
  fullName?: string;
  biddingId?: string;
};

const Bidding = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as BiddingLocationState | null;

  const participantName = state?.fullName || "Participant";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>

            <div>
              <p className="text-base font-black tracking-tight sm:text-lg">
                Nova<span className="text-red-500">.</span>
              </p>

              <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 sm:block">
                Live Bidding
              </p>
            </div>
          </div>

          {/* Event Status */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Event
              </p>

              <p className="text-sm font-black">Bidding-2026</p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />

              <span className="text-[11px] font-black uppercase tracking-wider text-red-600">
                Ended
              </span>
            </div>

            <button
              type="button"
              className="hidden cursor-pointer rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 sm:block"
            >
              Pay Round
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Page Heading */}
        <section className="mb-6 sm:mb-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500">
            Participant Workspace
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Bidding<span className="text-red-500">.</span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
                Monitor your bidding round, track the pool and follow live
                bidding activity from one place.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Status
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Event Closed
              </p>
            </div>
          </div>
        </section>

        {/* Participant Card */}
        <section className="rounded-3xl bg-white p-5 shadow-2xl shadow-black/20 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-xl font-black text-white sm:h-16 sm:w-16">
                {participantName.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Authenticated Participant
                </p>

                <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                  {participantName}
                </h2>

                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-2.5 py-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-black text-white">
                    ✓
                  </span>

                  <span className="text-xs font-bold text-green-700">
                    Verified Participant
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Participant ID
              </p>

              <p className="mt-1 break-all text-sm font-bold text-neutral-800">
                {state?.participantId || "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Main Stats */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Remaining Pool */}
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/10 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Remaining Pool
                </p>

                <p className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  ₹0
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-red-600">
                ₹
              </div>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full w-0 rounded-full bg-red-500" />
            </div>

            <p className="mt-2 text-xs font-medium text-neutral-400">
              No active round
            </p>
          </div>

          {/* Current Round */}
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/10 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Current Round
                </p>

                <p className="mt-3 text-xl font-black tracking-tight sm:text-2xl">
                  No round selected
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-xs font-black">
                01
              </div>
            </div>

            <p className="mt-5 text-xs font-medium text-neutral-400">
              Waiting for the next bidding round
            </p>
          </div>

          {/* Target Amount */}
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/10 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Target Amount
                </p>

                <p className="mt-3 text-xl font-black tracking-tight sm:text-2xl">
                  No round selected
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-xs font-black text-white">
                →
              </div>
            </div>

            <p className="mt-5 text-xs font-medium text-neutral-400">
              Amount will appear when a round begins
            </p>
          </div>
        </section>

        {/* Timer / Pool */}
        <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/10">
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            {/* Timer */}
            <div className="border-b border-neutral-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    Round Timer
                  </p>

                  <h2 className="mt-2 text-xl font-black sm:text-2xl">
                    Time Remaining
                  </h2>
                </div>

                <span className="rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-red-600">
                  Closed
                </span>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="font-mono text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                  00:00
                </span>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-0 rounded-full bg-red-500" />
              </div>
            </div>

            {/* Total Pool */}
            <div className="bg-neutral-950 p-6 text-white sm:p-8 lg:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Total Pool
              </p>

              <p className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                ₹1,00,000
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-xs font-medium text-neutral-500">
                  Event
                </span>

                <span className="text-sm font-bold">
                  Bidding-2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Bid */}
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                Fast Actions
              </p>

              <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                Quick Bid Options
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                Select a preset amount during an active round.
              </p>
            </div>

            <span className="self-start rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-neutral-400 sm:self-auto">
              Currently Disabled
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[5000, 4000, 3000, 2000].map((amount) => (
              <button
                key={amount}
                type="button"
                disabled
                className="cursor-not-allowed rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-5 text-lg font-black text-neutral-300"
              >
                ₹{amount.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-neutral-50 p-4 text-center">
            <p className="text-xs font-semibold text-neutral-400">
              Bidding options will become available when a round is active.
            </p>
          </div>
        </section>

        {/* Live Ledger */}
        <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-xl shadow-black/10">
          <div className="border-b border-neutral-100 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                  Activity
                </p>

                <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                  Live Ledger
                </h2>

                <p className="mt-1 text-sm text-neutral-400">
                  Real-time bidding activity
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-xs font-black text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                0 Total Bids
              </div>
            </div>
          </div>

          <div className="flex min-h-[260px] flex-col items-center justify-center px-5 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
              <span className="text-xl font-black text-neutral-300">
                —
              </span>
            </div>

            <h3 className="mt-5 text-lg font-black">
              No activity yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
              Bids will appear here in real-time once the bidding round
              begins.
            </p>
          </div>
        </section>

        {/* Back */}
        <div className="flex justify-center py-8 sm:py-10">
          <button
            type="button"
            onClick={() => navigate(`/bidding-entry/${id}`)}
            className="group flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm font-bold text-white transition hover:border-red-500 hover:bg-red-500"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Back to Entry
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-black text-white">
              Nova<span className="text-red-500">.</span>
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Live Bidding Platform
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-xs font-bold text-neutral-500">
              System Online
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Bidding;