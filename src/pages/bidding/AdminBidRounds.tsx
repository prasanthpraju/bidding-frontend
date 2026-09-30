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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-neutral-200 border-t-black animate-spin" />

          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
            Loading admin panel
          </p>
        </div>
      </div>
    );
  }

  if (!bidding) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-black">
          404
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-black tracking-tight text-black">
          Bidding not found
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
          The bidding scheme you're looking for doesn't exist or is no longer
          available.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate(`/bidding-dashboard/manage/${id}`)
          }
          className="mt-8 px-6 py-3.5 rounded-xl bg-black text-white font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
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
    <div className="min-h-screen bg-neutral-50 text-black">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/bidding-dashboard/manage/${bidding.id}`
                  )
                }
                className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                <span className="text-lg">←</span>
                Back to Dashboard
              </button>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  AdminBidROUNDS
                </h1>

                <span className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full text-[11px] font-black text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Rounds (0)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                alert("Bidding page will be available soon.")
              }
              className="hidden sm:inline-flex items-center justify-center px-5 py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Bidding Page
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              alert("Bidding page will be available soon.")
            }
            className="sm:hidden mt-4 w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Bidding Page
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
        {/* Page Intro */}
        <div className="mb-7">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
            Live Bidding Management
          </p>

          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Manage your rounds.
          </h2>

          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-neutral-500">
            Create and manage bidding rounds for this scheme. Payments must be
            verified before a new round can be created.
          </p>
        </div>

        {/* Bidding Overview */}
        <section className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-7">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    Live Bidding Session
                  </p>
                </div>

                <h3 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight break-words">
                  {bidding.name}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-xs font-bold text-neutral-600">
                    Ref ID
                  </span>

                  <span className="text-sm font-bold text-neutral-500 break-all">
                    {bidding.bidCode}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateRound}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span className="text-lg leading-none">+</span>
                Create Round
              </button>
            </div>

            {/* Round Status */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Total Rounds
                </p>

                <p className="mt-2 text-3xl font-black">
                  0
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  No rounds created
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Members
                </p>

                <p className="mt-2 text-3xl font-black">
                  {bidding.members}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Registered participants
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Pool Value
                </p>

                <p className="mt-2 text-3xl font-black">
                  ₹{Number(bidding.pool).toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Total project value
                </p>
              </div>
            </div>

            {/* Empty Rounds */}
            <div className="mt-8 border border-dashed border-neutral-300 rounded-3xl px-6 py-16 sm:py-20 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-black">
                0
              </div>

              <h4 className="mt-6 text-xl sm:text-2xl font-black">
                No Rounds Found
              </h4>

              <p className="mt-2 text-sm text-neutral-500">
                Create your first bidding round to get started.
              </p>

              <button
                type="button"
                onClick={handleCreateRound}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span className="text-lg">+</span>
                Create Round
              </button>
            </div>
          </div>
        </section>

        {/* Payment Schedule */}
        <section className="mt-8 bg-white rounded-3xl border border-neutral-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                  Step-by-Step Payment
                </p>

                <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                  Payment Schedule
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  Payments are required before each bidding round can be
                  created.
                </p>
              </div>

              <span className="self-start bg-neutral-100 border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full text-xs font-black">
                Cycle: {bidding.durationType}
              </span>
            </div>

            {/* Payment Steps */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Array.from(
                { length: Math.min(bidding.duration, 5) },
                (_, index) => (
                  <div
                    key={index}
                    className="group border border-neutral-200 rounded-2xl p-5 hover:border-black transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-black">
                        {index + 1}
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-300">
                        Pending
                      </span>
                    </div>

                    <p className="mt-5 text-sm font-black">
                      Month {index + 1} Payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-neutral-400">
                      Payment verification required
                    </p>
                  </div>
                ),
              )}
            </div>

            {/* Financial Information */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Admin Fee
                  </p>

                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Calculated
                  </span>
                </div>

                <p className="mt-3 text-3xl font-black">
                  ₹200
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Applicable administrative fee
                </p>
              </div>

              <div className="rounded-2xl bg-black text-white p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500">
                  Total Project Value
                </p>

                <p className="mt-3 text-3xl font-black">
                  ₹{Number(bidding.pool).toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Total bidding pool
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Status */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">
              Nova Workspace
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Bidding round management
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            System Online
          </div>
        </div>
      </main>

      {/* Create Round Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-7 sm:p-8">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center font-black text-lg">
                !
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                Payment Required
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                Cannot Create Round
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Payment for Month 1 has not been verified yet. Please complete
                the payment and wait for admin approval before creating the
                first bidding round.
              </p>

              <div className="mt-6 bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-neutral-500">
                    Required step
                  </span>

                  <span className="text-xs font-black text-red-500">
                    Month 1
                  </span>
                </div>

                <div className="mt-3 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="w-1/5 h-full bg-red-500 rounded-full" />
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreatePopup(false)}
                  className="flex-1 border border-neutral-200 text-black py-3.5 rounded-xl font-bold hover:border-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handlePayNow}
                  className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5 py-8">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 sm:px-7 py-6 border-b border-neutral-100 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                  Step-by-Step Payment
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight break-words">
                  {bidding.name}
                </h2>

                <p className="mt-2 text-sm text-neutral-500 font-semibold break-all">
                  Ref ID: {bidding.bidCode}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPaymentPopup(false)}
                className="shrink-0 w-9 h-9 rounded-xl border border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition-colors cursor-pointer flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="px-6 sm:px-7 py-7">
              {/* Step Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-black text-white flex items-center justify-center font-black">
                  1
                </div>

                <div>
                  <p className="font-black text-black">
                    Month 1 Payment
                  </p>

                  <p className="text-xs text-neutral-400 mt-0.5">
                    Complete this payment before creating the first round.
                  </p>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="mt-7 rounded-2xl bg-black text-white p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Payment Amount
                </p>

                <p className="mt-2 text-3xl sm:text-4xl font-black">
                  ₹
                  {(
                    Number(bidding.pool) /
                    Math.max(bidding.members, 1)
                  ).toLocaleString("en-IN")}
                </p>

                <p className="mt-2 text-xs text-neutral-400">
                  Calculated per participant
                </p>
              </div>

              {/* QR Section */}
              <div className="mt-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-black">
                      Make Payment
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      Scan the QR code using your UPI app.
                    </p>
                  </div>

                  <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    UPI
                  </span>
                </div>

                {bidding.qrCodeImage ? (
                  <div className="mt-5 flex justify-center bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                    <img
                      src={`http://localhost:3000${bidding.qrCodeImage}`}
                      alt="Admin QR"
                      className="w-52 h-52 object-contain rounded-xl border border-neutral-200 bg-white p-2"
                    />
                  </div>
                ) : (
                  <div className="mt-5 bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-10 text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-neutral-200 flex items-center justify-center font-black text-neutral-400">
                      QR
                    </div>

                    <p className="mt-4 text-sm font-bold text-neutral-500">
                      Admin QR not available
                    </p>
                  </div>
                )}
              </div>

              {/* UPI ID */}
              <div className="mt-5 rounded-2xl bg-neutral-50 border border-neutral-100 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  UPI ID
                </p>

                <p className="mt-2 text-base font-black text-black break-all">
                  {bidding.upiId}
                </p>
              </div>

              {/* Upload */}
              <div className="mt-7">
                <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400 mb-2">
                  Payment Proof
                </label>

                <label className="flex items-center justify-center border border-dashed border-neutral-300 rounded-2xl p-8 cursor-pointer hover:border-black hover:bg-neutral-50 transition-colors">
                  <div className="text-center">
                    <div className="w-11 h-11 mx-auto rounded-xl bg-black text-white flex items-center justify-center font-black text-xl">
                      ↑
                    </div>

                    <p className="mt-3 text-sm font-black text-black">
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

              {/* Modal Actions */}
              <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentPopup(false)}
                  className="flex-1 border border-neutral-200 text-black py-3.5 rounded-xl font-bold hover:border-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Payment proof API will be connected next.",
                    )
                  }
                  className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
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