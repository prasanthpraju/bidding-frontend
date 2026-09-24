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

const PaymentVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bidding, setBidding] = useState<Bidding | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRound, setSelectedRound] = useState("All");

  useEffect(() => {
    const loadBidding = async () => {
      try {
        if (!id) {
          setBidding(null);
          return;
        }

        const data = await getBiddingById(id);

        console.log("GET BIDDING BY UUID:", data);

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
  // BACK TO MANAGE BIDDING
  // ==========================================

  const handleBack = () => {
    if (!id) {
      navigate("/bidding-dashboard");
      return;
    }

    navigate(`/bidding-dashboard/manage/${id}`);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-neutral-200 border-t-black animate-spin" />

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Loading payments
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // BIDDING NOT FOUND
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
          onClick={handleBack}
          className="mt-8 bg-black text-white px-6 py-3.5 rounded-full font-bold hover:bg-neutral-800 transition-colors"
        >
          Back to Bidding
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-5">

          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-semibold text-neutral-500 hover:text-black transition-colors"
          >
            ← Back to Bidding
          </button>

        </div>
      </header>

      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">

          {/* ========================================
              TITLE
          ======================================== */}

          <div className="px-6 sm:px-8 py-7 border-b border-neutral-100">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 shrink-0 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
                💳
              </div>

              <div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                  Payment Verification
                </h1>

                <p className="mt-2 text-sm font-medium text-neutral-500">
                  {bidding.name} - Review and approve candidate transactions
                </p>

              </div>

            </div>

          </div>

          {/* ========================================
              FILTER
          ======================================== */}

          <div className="px-6 sm:px-8 py-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                Filter by Round
              </p>

              <div className="relative mt-2">

                <select
                  value={selectedRound}
                  onChange={(event) =>
                    setSelectedRound(event.target.value)
                  }
                  className="appearance-none bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-black outline-none focus:border-black transition-colors"
                >

                  <option value="All">
                    All
                  </option>

                  {Array.from(
                    {
                      length: Math.min(
                        Number(bidding.duration) || 5,
                        5
                      ),
                    },
                    (_, index) => (
                      <option
                        key={index}
                        value={String(index + 1)}
                      >
                        Round {index + 1}
                      </option>
                    )
                  )}

                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  ▼
                </span>

              </div>

            </div>

            {/* Later this number will come from backend */}

            <div className="text-sm font-bold text-neutral-400">
              0 Transactions
            </div>

          </div>

          {/* ========================================
              EMPTY STATE

              LATER:
              Replace this section with API data.
          ======================================== */}

          <div className="px-6 sm:px-8 py-24 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-3xl">
              👥
            </div>

            <h2 className="mt-6 text-xl sm:text-2xl font-black text-black">
              No Participants Found
            </h2>

            <p className="mt-2 max-w-lg mx-auto text-sm leading-6 text-neutral-500">
              No participants have initiated payments for this bidding
              scheme yet.
            </p>

          </div>

          {/* ========================================
              FOOTER
          ======================================== */}

          <div className="px-6 sm:px-8 py-5 border-t border-neutral-100 flex justify-end">

            <button
              type="button"
              onClick={handleBack}
              className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              Close Window
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PaymentVerification;