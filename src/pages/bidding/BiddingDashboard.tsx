import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateBiddingModal from "../../components/bidding/CreateBiddingModal";

import { getBiddings, deleteBidding } from "../../services/biddingApi";

interface Bidding {
  id: string;
  bidCode: string;
  name: string;
  pool: number;
  members: number;
  duration: number;
  durationType: string;
  userId: string;
  createdAt: string;
}

const BiddingDashboard = () => {
  const navigate = useNavigate();

  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  /* =========================
     LOAD BIDDINGS
  ========================= */

  const loadBiddings = async () => {
    try {
      setLoading(true);

      const data = await getBiddings();
      console.log("GET BIDDINGS:", JSON.stringify(data, null, 2));

      if (data.success) {
        setBiddings(data.data || []);
      } else {
        console.error(data.error || "Failed to load biddings");
      }
    } catch (error) {
      console.error("FAILED TO LOAD BIDDINGS:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOAD ON PAGE OPEN
  ========================= */

  useEffect(() => {
    loadBiddings();
  }, []);

  /* =========================
     DELETE BIDDING
  ========================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bidding?",
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteBidding(id);

      console.log("DELETE BIDDING:", data);

      if (data.success) {
        setBiddings((previous) => previous.filter((item) => item.id !== id));
      } else {
        alert(data.error || "Failed to delete bidding");
      }
    } catch (error) {
      console.error("DELETE BIDDING ERROR:", error);
      alert("Something went wrong while deleting bidding");
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-['Inter',system-ui,sans-serif] antialiased">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Loading schemes
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     PAGE
  ========================= */

  return (
    <div className="min-h-screen bg-white text-black font-['Inter',system-ui,sans-serif] antialiased">
      {/* =========================
          HEADER
      ========================= */}

      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {/* LEFT */}

          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Back to Dashboard
            </button>

            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight leading-none text-black">
              Bidding
              <br className="sm:hidden" /> Dashboard
            </h1>

            <p className="mt-3 text-sm font-medium text-gray-500">
              Manage every bidding scheme you run.
            </p>
          </div>

          {/* CREATE */}

          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-red-700 active:scale-95"
          >
            <span className="text-lg leading-none">+</span>
            New Bidding
          </button>
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* EMPTY STATE */}

        {biddings.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[520px] text-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50">
            <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-8">
              <span className="text-4xl font-black text-red-600 leading-none">
                +
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tight text-black">
              No Schemes Yet
            </h2>

            <p className="mt-3 max-w-sm text-sm font-medium text-gray-500">
              You haven't created any bidding schemes. Start one and invite your
              members.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-9 rounded-full bg-red-600 px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-red-700 active:scale-95"
            >
              Create Your First Bidding
            </button>
          </div>
        ) : (
          /* BIDDING CARDS */

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {biddings.map((bidding) => (
              <div
                key={bidding.id}
                className="group flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
              >
                {/* TOP */}

                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-red-600">
                    {bidding.bidCode}
                  </span>

                  <button
                    onClick={() => handleDelete(bidding.id)}
                    className="rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>

                {/* NAME */}

                <h2 className="mt-6 text-2xl font-black tracking-tight leading-tight text-black">
                  {bidding.name}
                </h2>

                {/* POOL */}

                <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Total Pool
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight text-red-600">
                    ₹{Number(bidding.pool).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* MEMBERS + DURATION */}

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Members
                    </p>

                    <p className="mt-2 text-xl font-black tracking-tight text-black">
                      {bidding.members}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Duration
                    </p>

                    <p className="mt-2 text-xl font-black tracking-tight text-black">
                      {bidding.duration}

                      <span className="ml-1 text-xs font-bold uppercase text-gray-400">
                        {bidding.durationType}
                      </span>
                    </p>
                  </div>
                </div>

                {/* MANAGE */}

                <button
                  onClick={() =>
                    navigate(`/bidding-dashboard/manage/${bidding.id}`)
                  }
                  className="mt-7 w-full rounded-full bg-black py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all group-hover:bg-red-600 active:scale-[0.97]"
                >
                  Manage Scheme →
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* =========================
          CREATE MODAL
      ========================= */}

      {showModal && (
        <CreateBiddingModal
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false);
            loadBiddings();
          }}
        />
      )}
    </div>
  );
};

export default BiddingDashboard;
