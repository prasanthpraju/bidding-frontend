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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-neutral-200 border-t-black animate-spin" />

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
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
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
          404
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-black">
          Bidding not found
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          The bidding scheme you're looking for doesn't exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/bidding-dashboard")}
          className="mt-8 bg-black text-white px-6 py-3.5 rounded-full font-bold hover:bg-neutral-800 transition-colors"
        >
          Back to Bidding
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => navigate("/bidding-dashboard")}
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 hover:text-black transition-colors"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-black transition-all">
            ←
          </span>
          Back to Bidding
        </button>

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Bidding Information */}

            <div>
              <span className="inline-flex items-center bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]">
                {bidding.bidCode}
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-black">
                {bidding.name}
              </h1>

              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Total Amount
                </p>

                <p className="mt-1 text-4xl sm:text-5xl font-black tracking-tight text-black">
                  ₹{Number(bidding.pool).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* ======================================
                ACTION BUTTONS
            ====================================== */}

            <div className="flex flex-col sm:items-end gap-3">
              {/* Manage Members */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/bidding-dashboard/manage/${bidding.id}/members`)
                }
                className="w-full sm:w-auto inline-flex items-center justify-between gap-8 bg-black text-white px-5 py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
              >
                <span>Manage Members</span>

                <span className="text-neutral-400">→</span>
              </button>

              {/* Open Admin Panel */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/bidding-dashboard/manage/${bidding.id}/admin`)
                }
                className="w-full sm:w-auto inline-flex items-center justify-between gap-8 bg-white border border-neutral-200 text-black px-5 py-3.5 rounded-xl font-bold hover:border-black transition-colors"
              >
                <span>Open Admin Panel</span>

                <span className="text-neutral-400">→</span>
              </button>

              {/* ====================================
                  VIEW PAYMENTS
              ==================================== */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/bidding-dashboard/manage/${bidding.id}/payments`)
                }
                className="w-full sm:w-auto inline-flex items-center justify-between gap-8 bg-white border border-neutral-200 text-black px-5 py-3.5 rounded-xl font-bold hover:border-black transition-colors"
              >
                <span>View Payments</span>

                <span className="text-neutral-400">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-neutral-200 mt-12" />

        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {/* Bidding Progress */}

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              📈
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Bidding Progress
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-400">Total Rounds</p>

                <p className="mt-1 text-2xl font-black text-black">5</p>
              </div>

              <div>
                <p className="text-xs text-neutral-400">Completed</p>

                <p className="mt-1 text-2xl font-black text-black">0</p>
              </div>
            </div>
          </div>

          {/* Winners */}

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              🏆
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Winners
            </p>

            <div className="mt-4 flex items-end gap-2">
              <p className="text-4xl font-black text-black">0</p>

              <p className="mb-1 text-sm font-semibold text-neutral-400">/ 5</p>
            </div>

            <p className="mt-1 text-xs text-neutral-400">Total Crowned</p>
          </div>

          {/* Participants */}

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              👥
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Participants
            </p>

            <p className="mt-4 text-4xl font-black text-black">
              {bidding.members}
            </p>

            <p className="mt-1 text-xs text-neutral-400">Registered members</p>
          </div>
        </div>

        {/* ==========================================
            HALL OF FAME
        ========================================== */}

        <div className="mt-8 bg-white rounded-3xl border border-neutral-200 overflow-hidden">
          <div className="px-6 sm:px-8 py-7 border-b border-neutral-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
                🏆
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black">
                  Hall of Fame
                </h2>

                <p className="mt-1 text-sm text-neutral-500 font-medium">
                  Verified winning participants across all rounds
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-2xl">
              🏅
            </div>

            <h3 className="mt-5 text-lg font-black text-black">
              No winners crowned yet
            </h3>

            <p className="mt-2 max-w-md mx-auto text-sm text-neutral-500">
              The first winner will appear here after the draw.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBidding;
