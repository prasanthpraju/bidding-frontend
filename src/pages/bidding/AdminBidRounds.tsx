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

const AdminBidRounds = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bidding, setBidding] = useState<Bidding | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-neutral-200 border-t-black animate-spin" />

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Loading admin panel
          </p>
        </div>
      </div>
    );
  }

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
          onClick={() =>
            navigate(`/bidding-dashboard/manage/${id}`)
          }
          className="mt-8 bg-black text-white px-6 py-3.5 rounded-full font-bold hover:bg-neutral-800 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleCreateRound = () => {
    setShowCreatePopup(true);
  };

  const handlePayNow = () => {
    setShowCreatePopup(false);
    setShowPaymentPopup(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/bidding-dashboard/manage/${bidding.id}`
                )
              }
              className="text-sm font-semibold text-neutral-500 hover:text-black transition-colors"
            >
              ← Back to Dashboard
            </button>

            <div className="flex items-center gap-3 mt-3">
              <h1 className="text-2xl font-black tracking-tight text-black">
                AdminBidROUNDS
              </h1>

              <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-bold">
                Rounds (0)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              alert("Bidding page will be available soon.")
            }
            className="bg-black text-white px-5 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
          >
            Bidding Page
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Bidding Overview */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                Live Bidding Session
              </p>

              <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-black">
                {bidding.name}
              </h2>

              <p className="mt-2 text-sm font-semibold text-neutral-500">
                Ref ID: {bidding.bidCode}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Create Round */}
              <button
                type="button"
                onClick={handleCreateRound}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
              >
                <span>＋</span>
                <span>Create Round</span>
              </button>
            </div>
          </div>

          {/* Empty Rounds */}
          <div className="mt-10 border border-dashed border-neutral-300 rounded-2xl py-20 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-2xl">
              📊
            </div>

            <h3 className="mt-5 text-xl font-black text-black">
              No Rounds Found
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Create your first bidding round
            </p>

            <button
              type="button"
              onClick={handleCreateRound}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              Create Round
            </button>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="mt-8 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                Step-by-Step Payment
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-black">
                {bidding.name}
              </h2>

              <p className="mt-1 text-sm font-semibold text-neutral-500">
                Ref ID: {bidding.bidCode}
              </p>
            </div>

            <span className="bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full text-xs font-bold">
              Cycle: {bidding.durationType}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from(
              { length: Math.min(bidding.duration, 5) },
              (_, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-2xl p-5"
                >
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-black">
                    {index + 1}
                  </div>

                  <p className="mt-4 text-sm font-bold text-black">
                    Month {index + 1} Payment
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-neutral-50 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                Admin Fee
              </p>

              <p className="mt-2 text-2xl font-black text-black">
                ₹200
              </p>

              <p className="text-xs text-neutral-400 mt-1">
                Calculated
              </p>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                Total Project Value
              </p>

              <p className="mt-2 text-2xl font-black text-black">
                ₹{Number(bidding.pool).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Create Round Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5">
          <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-xl">
              ⚠️
            </div>

            <h2 className="mt-5 text-2xl font-black text-black">
              Cannot Create Round
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Payment for Month 1 has not been verified yet. Please
              complete payment and wait for admin approval.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowCreatePopup(false)}
                className="flex-1 border border-neutral-200 text-black py-3.5 rounded-xl font-bold hover:border-black transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePayNow}
                className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5 py-8">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
            <div className="px-7 py-6 border-b border-neutral-100 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Step-by-Step Payment
                </p>

                <h2 className="mt-2 text-2xl font-black text-black">
                  {bidding.name}
                </h2>

                <p className="mt-1 text-sm text-neutral-500 font-semibold">
                  Ref ID: {bidding.bidCode}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPaymentPopup(false)}
                className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-7 py-7">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-black">
                  1
                </div>

                <div>
                  <p className="font-black text-black">
                    Month 1 Payment
                  </p>

                  <p className="text-xs text-neutral-400">
                    Complete this payment before creating the first round.
                  </p>
                </div>
              </div>

              <div className="mt-7 bg-neutral-50 rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Payment Amount
                </p>

                <p className="mt-2 text-3xl font-black text-black">
                  ₹
                  {(
                    Number(bidding.pool) /
                    Math.max(bidding.members, 1)
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-black text-black">
                  Scan the QR and upload the receipt
                </p>

                {bidding.qrCodeImage ? (
                  <div className="mt-4 flex justify-center bg-neutral-50 rounded-2xl p-6">
                    <img
                      src={`http://localhost:3000${bidding.qrCodeImage}`}
                      alt="Admin QR"
                      className="w-52 h-52 object-contain rounded-xl border border-neutral-200 bg-white p-2"
                    />
                  </div>
                ) : (
                  <div className="mt-4 bg-neutral-50 rounded-2xl p-8 text-center text-sm text-neutral-400">
                    Admin QR not available
                  </div>
                )}
              </div>

              <div className="mt-5 bg-neutral-50 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  UPI ID
                </p>

                <p className="mt-2 text-base font-black text-black break-all">
                  {bidding.upiId}
                </p>
              </div>

              <div className="mt-6">
                <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2">
                  Upload Screenshot
                </label>

                <label className="flex items-center justify-center border border-dashed border-neutral-300 rounded-2xl p-7 cursor-pointer hover:border-black hover:bg-neutral-50 transition-colors">
                  <div className="text-center">
                    <div className="text-2xl">
                      ↑
                    </div>

                    <p className="mt-2 text-sm font-bold text-black">
                      Choose payment screenshot
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      PNG, JPG or WEBP
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentPopup(false)}
                  className="flex-1 border border-neutral-200 text-black py-3.5 rounded-xl font-bold hover:border-black transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Payment proof API will be connected next."
                    )
                  }
                  className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
                >
                  Submit Payment Proof
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBidRounds;