import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBiddingById } from "../../services/biddingApi";

interface Bidding {
  id: string;
  bidCode: string;
  name: string;
  pool: number;
  members: number;
}

const ManageMembers = () => {
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

  const handleCopyLink = async () => {
    if (!bidding) return;

    const registrationLink = `${window.location.origin}/register/${bidding.bidCode}`;

    try {
      await navigator.clipboard.writeText(registrationLink);
      alert("Registration link copied!");
    } catch (error) {
      console.error("COPY LINK ERROR:", error);
      alert("Unable to copy link");
    }
  };

  const handleExportCSV = () => {
    alert("CSV export will be available after participants are added.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-neutral-200 border-t-black animate-spin" />

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Loading participants
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
          onClick={() => navigate("/bidding-dashboard")}
          className="mt-8 bg-black text-white px-6 py-3.5 rounded-full font-bold hover:bg-neutral-800 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14">

        <button
          onClick={() =>
            navigate(`/bidding-dashboard/manage/${bidding.id}`)
          }
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 hover:text-black transition-colors"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-black transition-all">
            ←
          </span>

          Back to Dashboard
        </button>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <div>
            <div className="flex flex-wrap items-center gap-3">

              <span className="inline-flex items-center bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em]">
                ID: {bidding.bidCode}
              </span>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500">
                👥 0 Participants
              </span>

            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-black">
              Manage Participants
            </h1>

            <p className="mt-2 text-sm font-medium text-neutral-500">
              Manage participants registered for {bidding.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              <span>⛓</span>
              <span>Copy Link</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 bg-white border border-neutral-200 text-black px-5 py-3 rounded-xl font-bold hover:border-black transition-colors"
            >
              <span>⇩</span>
              <span>Export CSV</span>
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              👥
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Total Entries
            </p>

            <p className="mt-3 text-4xl font-black text-black">
              0
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              All registered participants
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              ✅
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Verified
            </p>

            <p className="mt-3 text-4xl font-black text-black">
              0
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Successfully verified
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              🏆
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Winners
            </p>

            <p className="mt-3 text-4xl font-black text-black">
              0
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Lucky drawn winners
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 p-6">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl">
              ⏳
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Pending
            </p>

            <p className="mt-3 text-4xl font-black text-black">
              0
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Awaiting verification
            </p>
          </div>

        </div>

        <div className="mt-8 bg-white rounded-3xl border border-neutral-200 overflow-hidden">

          <div className="px-6 sm:px-8 py-7 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black">
                Participant Roster
              </h2>

              <p className="mt-1 text-sm text-neutral-500 font-medium">
                Showing 0 results
              </p>
            </div>

          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">

              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/70">

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    S.No
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    Participant
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    Draw ID
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    Winner
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody></tbody>

            </table>
          </div>

          <div className="px-6 sm:px-8 py-20 text-center border-t border-neutral-100">

            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-2xl">
              👥
            </div>

            <h3 className="mt-5 text-lg font-black text-black">
              No participants found
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Share the registration link to get started.
            </p>

            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-6 bg-black text-white px-5 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              Copy Registration Link
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageMembers;