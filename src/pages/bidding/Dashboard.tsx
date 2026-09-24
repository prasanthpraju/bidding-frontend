import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Back Button → Home */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group mb-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 hover:text-black transition-colors"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-black group-hover:-translate-x-0.5 transition-all">
            ←
          </span>
          Back to Home
        </button>

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Workspace
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-black">
            Dashboard
          </h1>
          <p className="mt-4 text-neutral-500 font-medium text-lg max-w-lg">
            Choose what you want to manage.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LIVE BIDDING */}
          <button
            type="button"
            onClick={() => navigate("/bidding-dashboard")}
            className="group text-left bg-white rounded-3xl p-9 border border-neutral-200 hover:border-black hover:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)] hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black text-white text-2xl">
                🔨
              </div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-200">
                01
              </span>
            </div>

            <h2 className="mt-8 text-3xl font-black tracking-tight text-black">
              Live Bidding
            </h2>

            <p className="mt-3 text-neutral-500 font-medium">
              Create and manage your bidding schemes.
            </p>

            <div className="mt-10 flex items-center gap-2 text-sm font-bold tracking-tight text-black">
              Open Live Bidding
              <span className="transition-transform group-hover:translate-x-1.5">
                →
              </span>
            </div>
          </button>

          {/* LUCKY DRAW */}
          <div className="relative bg-white rounded-3xl p-9 border border-neutral-200 overflow-hidden">
            <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-[0.18em] bg-neutral-100 text-neutral-400 px-3 py-1.5 rounded-full">
              Coming Soon
            </span>

            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-neutral-100 text-2xl grayscale opacity-60">
              🎯
            </div>

            <h2 className="mt-8 text-3xl font-black tracking-tight text-neutral-300">
              Lucky Draw
            </h2>

            <p className="mt-3 text-neutral-400 font-medium">
              Lucky draw functionality will be available soon.
            </p>

            <div className="mt-10 text-sm font-bold tracking-tight text-neutral-300">
              Coming Soon
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;