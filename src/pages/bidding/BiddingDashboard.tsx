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
        setBiddings((previous) =>
          previous.filter((item) => item.id !== id),
        );
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
      <div className="min-h-screen flex items-center justify-center bg-white text-black font-['Inter',system-ui,sans-serif] antialiased">
        <div className="text-center">
          <div className="relative mx-auto h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-200" />

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 animate-spin" />
          </div>

          <p className="mt-5 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Loading bidding
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

      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-7 py-8 sm:flex-row sm:items-end sm:justify-between">
            {/* LEFT */}

            <div>
              <button
                onClick={() => navigate("/dashboard")}
                className="group inline-flex cursor-pointer items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-black"
              >
                <span className="text-base transition-transform duration-200 group-hover:-translate-x-1">
                  ←
                </span>

                Back to Dashboard
              </button>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">
                  Live Bidding
                </span>
              </div>

              <h1 className="mt-3 text-4xl font-black leading-none tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
                Bidding
                <span className="text-red-500">.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-neutral-500 sm:text-base">
                Create, manage and monitor all your bidding schemes from one
                place.
              </p>
            </div>

            {/* CREATE BUTTON */}

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-red-500 active:scale-[0.97]"
            >
              <span className="text-xl font-normal leading-none">+</span>

              New Bidding
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* SECTION HEADER */}

        {biddings.length > 0 && (
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                Your workspace
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-3xl">
                Bidding Schemes
              </h2>
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {biddings.length}{" "}
              {biddings.length === 1 ? "Scheme" : "Schemes"}
            </p>
          </div>
        )}

        {/* =========================
            EMPTY STATE
        ========================= */}

        {biddings.length === 0 ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-black">
              <span className="text-4xl font-light leading-none text-white">
                +
              </span>
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                Bidding Workspace
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl">
                No Schemes Yet
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-6 text-neutral-500">
                You haven't created any bidding schemes yet. Create your first
                scheme and start managing your bidding event.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-8 cursor-pointer rounded-full bg-red-500 px-7 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-black active:scale-[0.97]"
            >
              Create Your First Bidding
            </button>
          </div>
        ) : (
          /* =========================
             BIDDING CARDS
          ========================= */

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {biddings.map((bidding) => (
              <div
                key={bidding.id}
                className="group flex flex-col rounded-3xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl sm:p-6"
              >
                {/* TOP */}

                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-red-500">
                    {bidding.bidCode}
                  </span>

                  <button
                    onClick={() => handleDelete(bidding.id)}
                    className="cursor-pointer rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>

                {/* NAME */}

                <div className="mt-7 min-h-[62px]">
                  <h2 className="text-2xl font-black leading-tight tracking-tight text-black">
                    {bidding.name}
                  </h2>
                </div>

                {/* DIVIDER */}

                <div className="my-6 h-px bg-neutral-100" />

                {/* TOTAL POOL */}

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Total Pool
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight text-black">
                    ₹{Number(bidding.pool).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* DETAILS */}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {/* MEMBERS */}

                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-neutral-400">
                      Members
                    </p>

                    <p className="mt-2 text-xl font-black tracking-tight text-black">
                      {bidding.members}
                    </p>
                  </div>

                  {/* DURATION */}

                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-neutral-400">
                      Duration
                    </p>

                    <p className="mt-2 text-xl font-black tracking-tight text-black">
                      {bidding.duration}

                      <span className="ml-1 text-[10px] font-black uppercase tracking-wide text-neutral-400">
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
                  className="mt-6 flex w-full cursor-pointer items-center justify-between rounded-2xl bg-black px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-red-500 active:scale-[0.98]"
                >
                  <span>Manage Scheme</span>

                  <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
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