import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBiddingById,
  getParticipantsByBiddingId,
} from "../../services/biddingApi";

interface Bidding {
  id: string;
  bidCode: string;
  name: string;
  pool: number;
  members: number;
}

interface Participant {
  id: string;
  fullName: string;
  photo: string | null;
  idProof: string | null;
  age: number;
  gender: string;
  phoneNumber: string;
  whatsappNumber: string;
  biddingId: string;
  status: string;
  isWinner: boolean;
  createdAt: string;
}

const API_BASE_URL = "http://localhost:3000";

const ManageMembers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bidding, setBidding] = useState<Bidding | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const [loading, setLoading] = useState(true);
  const [participantsLoading, setParticipantsLoading] = useState(true);

  const [verifyingParticipantId, setVerifyingParticipantId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) {
          setBidding(null);
          return;
        }

        const biddingData = await getBiddingById(id);

        if (biddingData.success) {
          setBidding(biddingData.data);
        } else {
          setBidding(null);
          return;
        }

        const participantData = await getParticipantsByBiddingId(id);

        if (participantData.success) {
          setParticipants(participantData.data || []);
        } else {
          setParticipants([]);
        }
      } catch (error) {
        console.error("LOAD MANAGE MEMBERS ERROR:", error);
        setBidding(null);
        setParticipants([]);
      } finally {
        setLoading(false);
        setParticipantsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleCopyRegistrationLink = async () => {
    if (!bidding) return;

    const registrationLink = `${window.location.origin}/register/${bidding.id}`;

    try {
      await navigator.clipboard.writeText(registrationLink);
      alert("Registration link copied!");
    } catch (error) {
      console.error("COPY LINK ERROR:", error);
      alert("Unable to copy link");
    }
  };

  const handleCopyBiddingLink = async () => {
    if (!bidding) return;

    const biddingLink = `${window.location.origin}/bidding-entry/${bidding.id}`;

    try {
      await navigator.clipboard.writeText(biddingLink);
      alert("Bidding link copied!");
    } catch (error) {
      console.error("COPY BIDDING LINK ERROR:", error);
      alert("Unable to copy bidding link");
    }
  };

  const handleVerifyParticipant = async (participantId: string) => {
    try {
      setVerifyingParticipantId(participantId);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/participants/${encodeURIComponent(
          participantId,
        )}/verify`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Failed to verify participant");
        return;
      }

      setParticipants((current) =>
        current.map((participant) =>
          participant.id === participantId
            ? {
                ...participant,
                status: "Verified",
              }
            : participant,
        ),
      );

      setSelectedParticipant((current) =>
        current && current.id === participantId
          ? {
              ...current,
              status: "Verified",
            }
          : current,
      );

      alert("Participant verified successfully!");
    } catch (error) {
      console.error("VERIFY PARTICIPANT ERROR:", error);
      alert("Unable to verify participant");
    } finally {
      setVerifyingParticipantId(null);
    }
  };

  const totalParticipants = participants.length;

  const verifiedParticipants = participants.filter(
    (participant) => participant.status === "Verified",
  ).length;

  const pendingParticipants = participants.filter(
    (participant) => participant.status === "Pending",
  ).length;

  const winnerParticipants = participants.filter(
    (participant) => participant.isWinner,
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm font-semibold text-neutral-500">
            Loading participants...
          </p>
        </div>
      </div>
    );
  }

  if (!bidding) {
    return (
      <div className="min-h-screen bg-[#f6f6f4] flex items-center justify-center p-6">
        <div className="bg-white border border-neutral-200 w-full max-w-md p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
            Error
          </p>

          <h1 className="mt-3 text-2xl font-bold text-black">
            Bidding not found
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            The requested bidding scheme could not be found.
          </p>

          <button
            onClick={() => navigate("/bidding-dashboard")}
            className="mt-7 w-full bg-black text-white py-3.5 text-sm font-bold hover:bg-red-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-black">
      {/* Top navigation */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="h-20 flex items-center justify-between">
            <button
              onClick={() =>
                navigate(`/bidding-dashboard/manage/${bidding.id}`)
              }
              className="flex items-center gap-3 text-sm font-bold text-neutral-600 hover:text-black transition-colors"
            >
              <span className="text-xl">←</span>
              Back
            </button>

            <div className="hidden sm:block text-right">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-neutral-400">
                Bidding Reference
              </p>

              <p className="mt-1 text-sm font-bold">{bidding.bidCode}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
        {/* Page heading */}
        <section className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full" />

              <span className="text-xs uppercase tracking-[0.18em] font-bold text-neutral-500">
                Participant Management
              </span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-none">
              Manage Participants
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="font-bold">{bidding.name}</span>

              <span className="text-neutral-300">/</span>

              <span className="font-semibold text-neutral-500">
                {bidding.bidCode}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleCopyRegistrationLink}
              className="px-5 py-3.5 bg-white border border-neutral-300 text-sm font-bold hover:border-black transition-colors"
            >
              Copy Registration Link
            </button>

            <button
              onClick={handleCopyBiddingLink}
              className="px-5 py-3.5 bg-black text-white text-sm font-bold hover:bg-red-600 transition-colors"
            >
              Copy Bidding Link
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-10 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-200">
          <div className="bg-white border-r border-b border-neutral-200 p-5 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-neutral-400">
              Total Participants
            </p>

            <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              {totalParticipants}
            </p>
          </div>

          <div className="bg-white border-r border-b border-neutral-200 p-5 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-neutral-400">
              Verified
            </p>

            <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              {verifiedParticipants}
            </p>

            <div className="mt-4 h-1 bg-neutral-100">
              <div
                className="h-full bg-black"
                style={{
                  width:
                    totalParticipants > 0
                      ? `${Math.min(
                          (verifiedParticipants / totalParticipants) * 100,
                          100,
                        )}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          <div className="bg-white border-r border-b border-neutral-200 p-5 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-neutral-400">
              Pending Review
            </p>

            <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              {pendingParticipants}
            </p>

            <div className="mt-4 h-1 bg-neutral-100">
              <div
                className="h-full bg-red-600"
                style={{
                  width:
                    totalParticipants > 0
                      ? `${Math.min(
                          (pendingParticipants / totalParticipants) * 100,
                          100,
                        )}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          <div className="bg-black text-white border-r border-b border-black p-5 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-neutral-400">
              Winners
            </p>

            <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              {winnerParticipants}
            </p>

            <p className="mt-4 text-xs font-semibold text-neutral-500">
              Selected participants
            </p>
          </div>
        </section>

        {/* Table section */}
        <section className="mt-8 bg-white border border-neutral-200">
          <div className="px-5 sm:px-7 py-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Participant List
              </h2>

              <p className="mt-1.5 text-sm text-neutral-500">
                Review registration details and verification status.
              </p>
            </div>

            <button
              onClick={() =>
                alert(
                  "CSV export will be available after participants are added.",
                )
              }
              className="self-start sm:self-auto px-4 py-2.5 border border-neutral-300 text-xs font-bold uppercase tracking-[0.08em] hover:border-black transition-colors"
            >
              Export CSV
            </button>
          </div>

          {participantsLoading ? (
            <div className="py-24 text-center">
              <div className="w-7 h-7 border-2 border-neutral-300 border-t-black rounded-full animate-spin mx-auto" />

              <p className="mt-4 text-sm font-semibold text-neutral-500">
                Loading...
              </p>
            </div>
          ) : participants.length === 0 ? (
            <div className="py-24 px-6 text-center">
              <div className="w-12 h-12 border border-neutral-200 mx-auto flex items-center justify-center text-neutral-400">
                —
              </div>

              <h3 className="mt-5 text-lg font-bold">No participants yet</h3>

              <p className="mt-2 text-sm text-neutral-500">
                Share the registration link to receive participants.
              </p>

              <button
                onClick={handleCopyRegistrationLink}
                className="mt-6 bg-black text-white px-5 py-3 text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Copy Registration Link
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-neutral-200">
                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-400">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-400">
                      Participant
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-400">
                      Draw ID
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-400">
                      Mobile
                    </th>

                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map((participant, index) => (
                    <tr
                      key={participant.id}
                      className="border-b border-neutral-100 last:border-b-0 hover:bg-[#fafafa] transition-colors"
                    >
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-neutral-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {participant.photo ? (
                            <img
                              src={`${API_BASE_URL}${participant.photo}`}
                              alt={participant.fullName}
                              className="w-11 h-11 object-cover rounded-full border border-neutral-200"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-sm font-bold">
                              {participant.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-bold text-black">
                              {participant.fullName}
                            </p>

                            <p className="mt-1 text-xs text-neutral-400">
                              {participant.gender} · {participant.age} years
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-mono text-xs font-bold text-neutral-600">
                          {participant.id.slice(0, 8).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm font-semibold text-neutral-700">
                          {participant.phoneNumber}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {participant.status === "Verified" ? (
                          <span className="inline-flex items-center gap-2 text-xs font-bold text-black">
                            <span className="w-2 h-2 rounded-full bg-black" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-xs font-bold text-red-600">
                            <span className="w-2 h-2 rounded-full bg-red-600" />
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            onClick={() => setSelectedParticipant(participant)}
                            className="text-xs font-bold uppercase tracking-[0.08em] text-black hover:text-red-600 transition-colors"
                          >
                            View
                          </button>

                          {participant.status !== "Verified" && (
                            <button
                              disabled={
                                verifyingParticipantId === participant.id
                              }
                              onClick={() =>
                                handleVerifyParticipant(participant.id)
                              }
                              className="text-xs font-bold uppercase tracking-[0.08em] text-red-600 hover:text-black disabled:text-neutral-300 transition-colors"
                            >
                              {verifyingParticipantId === participant.id
                                ? "Verifying..."
                                : "Verify"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Participant details modal */}
      {selectedParticipant && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedParticipant(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal header */}
            <div className="px-6 sm:px-8 py-6 border-b border-neutral-200 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-red-600">
                  Participant Details
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
                  {selectedParticipant.fullName}
                </h2>
              </div>

              <button
                onClick={() => setSelectedParticipant(null)}
                className="w-9 h-9 border border-neutral-200 text-xl hover:border-black transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* Profile */}
              <div className="flex flex-col sm:flex-row gap-6">
                {selectedParticipant.photo ? (
                  <img
                    src={`${API_BASE_URL}${selectedParticipant.photo}`}
                    alt={selectedParticipant.fullName}
                    className="w-28 h-28 object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="w-28 h-28 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-3xl font-bold">
                    {selectedParticipant.fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-bold">
                    {selectedParticipant.fullName}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    Draw ID{" "}
                    <span className="font-mono font-bold text-black">
                      {selectedParticipant.id.slice(0, 8).toUpperCase()}
                    </span>
                  </p>

                  <div className="mt-4">
                    {selectedParticipant.status === "Verified" ? (
                      <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        VERIFIED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-2 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        PENDING VERIFICATION
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-8">
                <div className="border-b border-black pb-3">
                  <p className="text-xs uppercase tracking-[0.15em] font-bold">
                    Personal Information
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="py-5 border-b border-neutral-200 sm:pr-6">
                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-400">
                      Age
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {selectedParticipant.age}
                    </p>
                  </div>

                  <div className="py-5 border-b border-neutral-200 sm:pl-6">
                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-400">
                      Gender
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {selectedParticipant.gender}
                    </p>
                  </div>

                  <div className="py-5 border-b border-neutral-200 sm:pr-6">
                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-400">
                      Mobile Number
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {selectedParticipant.phoneNumber}
                    </p>
                  </div>

                  <div className="py-5 border-b border-neutral-200 sm:pl-6">
                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-neutral-400">
                      WhatsApp Number
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {selectedParticipant.whatsappNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* ID proof */}
              <div className="mt-8">
                <div className="flex items-center justify-between border-b border-black pb-3">
                  <p className="text-xs uppercase tracking-[0.15em] font-bold">
                    Identity Proof
                  </p>

                  {selectedParticipant.idProof && (
                    <a
                      href={`${API_BASE_URL}${selectedParticipant.idProof}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-red-600 hover:text-black"
                    >
                      Open Full Size →
                    </a>
                  )}
                </div>

                {selectedParticipant.idProof ? (
                  <div className="mt-5 bg-neutral-50 border border-neutral-200 p-3">
                    <img
                      src={`${API_BASE_URL}${selectedParticipant.idProof}`}
                      alt="Identity proof"
                      className="w-full max-h-[400px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="mt-5 py-10 bg-neutral-50 text-center">
                    <p className="text-sm font-semibold text-neutral-400">
                      No identity proof uploaded.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {selectedParticipant.status !== "Verified" && (
                  <button
                    disabled={verifyingParticipantId === selectedParticipant.id}
                    onClick={() =>
                      handleVerifyParticipant(selectedParticipant.id)
                    }
                    className="flex-1 bg-red-600 text-white py-3.5 text-sm font-bold hover:bg-black disabled:bg-neutral-300 transition-colors"
                  >
                    {verifyingParticipantId === selectedParticipant.id
                      ? "Verifying..."
                      : "Verify Participant"}
                  </button>
                )}

                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="flex-1 bg-black text-white py-3.5 text-sm font-bold hover:bg-neutral-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
