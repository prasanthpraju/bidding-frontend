import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBiddingById } from "../../services/biddingApi";

interface Bidding {
  id: string;
  bidCode: string;
  name: string;
  pool: number;
  members: number;
  duration: number;
  durationType: string;
  upiId: string;
  qrCodeImage: string | null;
}

const ManageBidding = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bidding, setBidding] = useState<Bidding | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBidding = async () => {
      try {
        if (!id) {
          setBidding(null);
          return;
        }

        const data = await getBiddingById(id);

        console.log("GET BIDDING BY UUID:", id, JSON.stringify(data, null, 2));

        if (data.success) {
          setBidding(data.data);
        } else {
          setBidding(null);
        }
      } catch (error) {
        console.error("LOAD BIDDING ERROR:", error);
        setBidding(null);
      } finally {
        setLoading(false);
      }
    };

    loadBidding();
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-black font-['Inter',system-ui,sans-serif] antialiased">
        <div className="text-center">
          <div className="relative w-10 h-10 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-200" />

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 animate-spin" />
          </div>

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Loading bidding
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!bidding) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center font-['Inter',system-ui,sans-serif] antialiased">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-black">
          <span className="text-2xl font-black text-white">404</span>
        </div>

        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
          Bidding Workspace
        </p>

        <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-black">
          Bidding not found
        </h1>

        <p className="mt-3 max-w-md text-sm font-medium leading-6 text-neutral-500">
          The bidding scheme you're looking for doesn't exist or is no longer
          available.
        </p>

        <button
          type="button"
          onClick={() => navigate("/bidding-dashboard")}
          className="mt-8 cursor-pointer rounded-full bg-black px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-red-500 active:scale-[0.97]"
        >
          Back to Bidding
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-['Inter',system-ui,sans-serif] antialiased">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => navigate("/bidding-dashboard")}
          className="group inline-flex cursor-pointer items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-black"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-base transition-all duration-200 group-hover:border-black group-hover:-translate-x-0.5">
            ←
          </span>

          Back to Bidding
        </button>

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mt-10 border-b border-neutral-200 pb-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* BIDDING INFORMATION */}

            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                  Bidding Scheme
                </span>

                <span className="h-1 w-1 rounded-full bg-neutral-300" />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  {bidding.bidCode}
                </span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-[-0.04em] text-black">
                {bidding.name}
                <span className="text-red-500">.</span>
              </h1>

              <div className="mt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                  Total Pool
                </p>

                <p className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-black">
                  ₹{Number(bidding.pool).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* ======================================
                ACTION BUTTONS
            ====================================== */}

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-auto lg:grid-cols-1">
              {/* MANAGE MEMBERS */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/bidding-dashboard/manage/${bidding.id}/members`)
                }
                className="group inline-flex w-full cursor-pointer items-center justify-between gap-8 rounded-2xl bg-black px-5 py-4 text-left text-xs font-black uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-red-500 active:scale-[0.98] lg:min-w-[230px]"
              >
                <span>Manage Members</span>

                <span className="text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </button>

              {/* OPEN ADMIN PANEL */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/bidding-dashboard/manage/${bidding.id}/admin`)
                }
                className="group inline-flex w-full cursor-pointer items-center justify-between gap-8 rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left text-xs font-black uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black active:scale-[0.98] lg:min-w-[230px]"
              >
                <span>Open Admin Panel</span>

                <span className="text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
              </button>

              {/* VIEW PAYMENTS */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/bidding-dashboard/manage/${bidding.id}/payments`)
                }
                className="group inline-flex w-full cursor-pointer items-center justify-between gap-8 rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left text-xs font-black uppercase tracking-[0.08em] text-black transition-all duration-200 hover:border-black active:scale-[0.98] lg:min-w-[230px]"
              >
                <span>View Payments</span>

                <span className="text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            OVERVIEW
        ========================================== */}

        <div className="mt-10">
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
              Overview
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-black">
              Scheme Statistics
            </h2>
          </div>

          {/* ==========================================
              STATISTICS
          ========================================== */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* BIDDING PROGRESS */}

            <div className="group rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                <span className="text-lg font-black">↗</span>
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Bidding Progress
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-neutral-400">
                    Total Rounds
                  </p>

                  <p className="mt-1 text-3xl font-black tracking-tight text-black">
                    5
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-400">
                    Completed
                  </p>

                  <p className="mt-1 text-3xl font-black tracking-tight text-black">
                    0
                  </p>
                </div>
              </div>
            </div>

            {/* WINNERS */}

            <div className="group rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <span className="text-lg font-black">★</span>
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Winners
              </p>

              <div className="mt-4 flex items-end gap-2">
                <p className="text-4xl font-black tracking-tight text-black">
                  0
                </p>

                <p className="mb-1 text-sm font-bold text-neutral-400">
                  / 5
                </p>
              </div>

              <p className="mt-1 text-xs font-medium text-neutral-400">
                Total Crowned
              </p>
            </div>

            {/* PARTICIPANTS */}

            <div className="group rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100 text-black">
                <span className="text-lg font-black">+</span>
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Participants
              </p>

              <p className="mt-4 text-4xl font-black tracking-tight text-black">
                {bidding.members}
              </p>

              <p className="mt-1 text-xs font-medium text-neutral-400">
                Registered members
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            HALL OF FAME
        ========================================== */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          {/* HEADER */}

          <div className="flex flex-col gap-5 border-b border-neutral-100 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                <span className="text-lg font-black">★</span>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                  Winners
                </p>

                <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-black">
                  Hall of Fame
                </h2>

                <p className="mt-1 text-sm font-medium text-neutral-500">
                  Verified winning participants across all rounds
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit rounded-full bg-neutral-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
              0 Winners
            </div>
          </div>

          {/* EMPTY STATE */}

          <div className="px-6 py-20 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
              <span className="text-xl font-black text-neutral-300">★</span>
            </div>

            <h3 className="mt-6 text-lg font-black tracking-tight text-black">
              No winners crowned yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-neutral-500">
              The first winner will appear here after the draw.
            </p>
          </div>
        </div>

        {/* ==========================================
            BOTTOM INFO
        ========================================== */}

        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
            Nova Bidding Workspace
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
              System Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBidding;