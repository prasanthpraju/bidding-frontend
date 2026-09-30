import { useState } from "react";

import { createBidding } from "../../services/biddingApi";

interface CreateBiddingModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const fieldClass =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-[15px] font-bold text-neutral-950 placeholder:font-medium placeholder:text-neutral-400 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10";

const labelClass =
  "mb-2.5 block text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500";

const CreateBiddingModal = ({
  onClose,
  onCreated,
}: CreateBiddingModalProps) => {
  const [name, setName] = useState("");
  const [pool, setPool] = useState("");
  const [members, setMembers] = useState("");
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] =
    useState("Monthly");

  const [upiId, setUpiId] = useState("");

  // Actual image File
  // NOT Base64
  const [qrCodeImage, setQrCodeImage] =
    useState<File | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // QR UPLOAD
  // ==========================================

  const handleQRUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "QR image must be less than 5MB"
      );
      return;
    }

    setError("");
    setQrCodeImage(file);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async () => {
    setError("");

    if (!name.trim()) {
      return setError(
        "Please enter bidding name"
      );
    }

    if (!pool) {
      return setError(
        "Please enter pool amount"
      );
    }

    if (!members) {
      return setError(
        "Please enter number of members"
      );
    }

    if (!duration) {
      return setError(
        "Please enter duration"
      );
    }

    if (!upiId.trim()) {
      return setError(
        "Please enter UPI ID"
      );
    }

    if (!qrCodeImage) {
      return setError(
        "Please upload payment QR code"
      );
    }

    try {
      setLoading(true);

      const data = await createBidding({
        name: name.trim(),
        pool: Number(pool),
        members: Number(members),
        duration: Number(duration),
        durationType,
        upiId: upiId.trim(),
        qrCodeImage,
      });

      console.log(
        "CREATE BIDDING RESPONSE:",
        data
      );

      if (!data.success) {
        setError(
          data.error ||
            "Failed to create bidding"
        );
        return;
      }

      onCreated();
    } catch (error) {
      console.error(
        "CREATE BIDDING ERROR:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-3 backdrop-blur-sm sm:p-5">
      <div className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/40">

        {/* HEADER */}
        <div className="shrink-0 border-b border-neutral-100 bg-white px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                  New Scheme
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-tight text-neutral-950 sm:text-3xl">
                  Create Bidding<span className="text-red-500">.</span>
                </h2>

                <p className="mt-1 text-xs font-medium leading-5 text-neutral-400 sm:text-sm">
                  Configure your new bidding scheme.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-black text-neutral-400 transition hover:border-red-500 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ×
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="overflow-y-auto">
          <div className="space-y-7 px-5 py-6 sm:px-7 sm:py-7">

            {/* SECTION: BASIC DETAILS */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 text-[10px] font-black text-white">
                  01
                </span>

                <div>
                  <p className="text-sm font-black text-neutral-950">
                    Basic Details
                  </p>

                  <p className="text-[11px] font-medium text-neutral-400">
                    Define your bidding scheme
                  </p>
                </div>
              </div>

              {/* NAME */}
              <div>
                <label className={labelClass}>
                  Bidding Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Example: Summer Special"
                  className={fieldClass}
                />
              </div>

              {/* POOL + MEMBERS */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Pool Amount (₹)
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-neutral-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      value={pool}
                      onChange={(e) =>
                        setPool(e.target.value)
                      }
                      placeholder="50000"
                      className={`${fieldClass} pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Members
                  </label>

                  <input
                    type="number"
                    value={members}
                    onChange={(e) =>
                      setMembers(e.target.value)
                    }
                    placeholder="20"
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-neutral-100" />

            {/* SECTION: SCHEDULE */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 text-[10px] font-black text-white">
                  02
                </span>

                <div>
                  <p className="text-sm font-black text-neutral-950">
                    Schedule
                  </p>

                  <p className="text-[11px] font-medium text-neutral-400">
                    Set the bidding duration
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* DURATION */}
                <div>
                  <label className={labelClass}>
                    Duration
                  </label>

                  <input
                    type="number"
                    value={duration}
                    onChange={(e) =>
                      setDuration(e.target.value)
                    }
                    placeholder="12"
                    className={fieldClass}
                  />
                </div>

                {/* DURATION TYPE */}
                <div>
                  <label className={labelClass}>
                    Duration Type
                  </label>

                  <select
                    value={durationType}
                    onChange={(e) =>
                      setDurationType(e.target.value)
                    }
                    className={`${fieldClass} cursor-pointer`}
                  >
                    <option value="Daily">
                      Daily
                    </option>

                    <option value="Weekly">
                      Weekly
                    </option>

                    <option value="Monthly">
                      Monthly
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-neutral-100" />

            {/* SECTION: PAYMENT */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 text-[10px] font-black text-white">
                  03
                </span>

                <div>
                  <p className="text-sm font-black text-neutral-950">
                    Payment Setup
                  </p>

                  <p className="text-[11px] font-medium text-neutral-400">
                    Add payment details for participants
                  </p>
                </div>
              </div>

              {/* UPI */}
              <div>
                <label className={labelClass}>
                  UPI ID
                </label>

                <input
                  type="text"
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(e.target.value)
                  }
                  placeholder="example@okhdfcbank"
                  className={fieldClass}
                />
              </div>

              {/* QR */}
              <div className="mt-5">
                <label className={labelClass}>
                  Payment QR Code
                </label>

                <label className="group flex min-h-[78px] cursor-pointer items-center justify-between gap-4 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-4 transition hover:border-red-400 hover:bg-red-50/30 sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-black text-neutral-400 shadow-sm">
                      QR
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-neutral-700">
                        {qrCodeImage
                          ? qrCodeImage.name
                          : "Upload payment QR code"}
                      </p>

                      <p className="mt-0.5 text-[10px] font-medium text-neutral-400">
                        PNG, JPG or WEBP · Max 5MB
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-lg bg-neutral-950 px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-white transition group-hover:bg-red-500">
                    Browse
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleQRUpload}
                    className="hidden"
                  />
                </label>

                {qrCodeImage && (
                  <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500 text-xs font-black text-white">
                        ✓
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase tracking-wider text-green-600">
                          Selected File
                        </p>

                        <p className="mt-0.5 truncate text-xs font-bold text-green-800">
                          {qrCodeImage.name}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setQrCodeImage(null)
                      }
                      className="shrink-0 cursor-pointer text-[10px] font-black uppercase tracking-wider text-neutral-400 transition hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-bold text-red-600">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                  !
                </span>

                <span className="leading-5">
                  {error}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="shrink-0 border-t border-neutral-100 bg-white px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="hidden text-[10px] font-bold uppercase tracking-wider text-neutral-400 sm:block">
              Nova · Bidding Management
            </p>

            <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={onClose}
                disabled={loading}
                className="w-full cursor-pointer rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-black text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-neutral-950 px-7 py-3.5 text-sm font-black text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {loading
                  ? "Creating..."
                  : "Create Bidding"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBiddingModal;