import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Bidding {
  id: string;
  bidCode: string;
  name: string;
  pool: string;
  members: number;
  duration: number;
  durationType: string;
}

interface ApiResponse {
  success: boolean;
  data: Bidding;
}

const BiddingEntry = () => {
  const { id } = useParams<{ id: string }>();
  console.log("BIDDING ENTRY ID:", id);
  const navigate = useNavigate();

  const [bidding, setBidding] = useState<Bidding | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBidding = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Invalid bidding link.");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/v1/bidding/${id}`,
        );

        const result: ApiResponse = await response.json();

        console.log("Bidding API response:", result);

        if (!response.ok || !result.success || !result.data) {
          setError("Bidding not found.");
          return;
        }

        setBidding(result.data);
      } catch (err) {
        console.error("Bidding fetch error:", err);
        setError("Unable to load bidding.");
      } finally {
        setLoading(false);
      }
    };

    fetchBidding();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("Invalid bidding link.");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Please enter your registered mobile number.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(
        "http://localhost:3000/api/v1/bidding/entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            biddingId: id,
            phoneNumber: phoneNumber.trim(),
          }),
        },
      );

      const result = await response.json();

      console.log("Entry API response:", result);

      if (!response.ok || !result.success) {
        setError(
          result.message || "You are not allowed to enter this bidding.",
        );
        return;
      }

      navigate(`/bidding/${id}`, {
        state: {
          participantId: result.data.participantId,
          fullName: result.data.fullName,
          biddingId: result.data.biddingId,
        },
      });
    } catch (err) {
      console.error("Bidding entry error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-red-500" />
          </div>

          <p className="mt-5 text-sm font-bold text-white">
            Loading bidding...
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Preparing your secure entry
          </p>
        </div>
      </div>
    );
  }

  if (error && !bidding) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-5">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-2xl font-black text-white">
            !
          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-red-500">
            Entry Error
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            Bidding unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 w-full cursor-pointer rounded-xl bg-white px-6 py-3.5 text-sm font-black text-neutral-950 transition hover:bg-red-500 hover:text-white"
          >
            Try Again
          </button>

          <p className="mt-6 text-xs font-medium text-neutral-600">
            Nova · Live Bidding Platform
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>

            <div>
              <p className="text-base font-black tracking-tight">
                Nova<span className="text-red-500">.</span>
              </p>

              <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:block">
                Live Bidding
              </p>
            </div>
          </div>

          {/* Secure status */}
          <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
              Secure Entry
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Top heading */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500">
            Participant Entry
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Enter the Bidding<span className="text-red-500">.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
            Verify your registered mobile number to securely access this
            bidding session.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
          {/* Bidding information */}
          <section className="rounded-3xl bg-white p-5 text-neutral-950 shadow-2xl shadow-black/20 sm:p-7 lg:p-8">
            {/* Event heading */}
            <div className="border-b border-neutral-100 pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                    Bidding Event
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                    {bidding?.name}
                  </h2>
                </div>

                <div className="w-fit rounded-xl bg-neutral-950 px-4 py-2.5">
                  <p className="text-[9px] font-black uppercase tracking-wider text-neutral-500">
                    Reference
                  </p>

                  <p className="mt-0.5 text-sm font-black text-white">
                    {bidding?.bidCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                  Total Pool
                </p>

                <p className="mt-2 text-xl font-black sm:text-2xl">
                  ₹{bidding?.pool}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                  Participants
                </p>

                <p className="mt-2 text-xl font-black sm:text-2xl">
                  {bidding?.members}
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-neutral-50 p-4 sm:col-span-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                  Duration
                </p>

                <p className="mt-2 text-xl font-black sm:text-2xl">
                  {bidding?.duration}
                  <span className="ml-1 text-sm font-bold text-neutral-400">
                    {bidding?.durationType}
                  </span>
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="mt-6 rounded-2xl border border-neutral-200 p-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm font-black text-red-500">
                  !
                </div>

                <div>
                  <p className="text-sm font-black">
                    Before you continue
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Use the same mobile number that was registered for this
                    bidding event. Only verified participants can enter.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-sm font-black text-green-600">
                ✓
              </div>

              <div>
                <p className="text-xs font-black">
                  Verified participant access
                </p>

                <p className="mt-0.5 text-[11px] text-neutral-400">
                  Your entry is checked against the registered participant
                  record.
                </p>
              </div>
            </div>
          </section>

          {/* Entry form */}
          <section className="rounded-3xl bg-white p-5 text-neutral-950 shadow-2xl shadow-black/20 sm:p-7 lg:p-8">
            <div className="mb-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                    Step 01
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight">
                    Verify Your Entry
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-xs font-black text-white">
                  01
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Enter your registered mobile number to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label
                htmlFor="phoneNumber"
                className="mb-2.5 block text-sm font-black text-neutral-900"
              >
                Registered mobile number
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-sm font-black text-neutral-400">
                    +91
                  </span>
                </div>

                <input
                  id="phoneNumber"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter mobile number"
                  className="h-14 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-14 pr-4 text-base font-bold text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                    !
                  </div>

                  <p className="text-xs font-bold leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group mt-5 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-neutral-950 px-4 text-sm font-black text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {submitting ? "Checking..." : "Enter Bidding"}
                </span>

                {!submitting && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>

            {/* Footer note */}
            <div className="mt-6 border-t border-neutral-100 pt-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xs font-black text-green-500">
                  ✓
                </span>

                <p className="text-[11px] leading-5 text-neutral-400">
                  Your mobile number is used only to verify your registered
                  participant account for this bidding session.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom brand */}
        <div className="flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
          <p className="text-xs font-black text-white">
            Nova<span className="text-red-500">.</span>
            <span className="ml-2 font-medium text-neutral-600">
              Live Bidding Platform
            </span>
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
              Secure System
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BiddingEntry;