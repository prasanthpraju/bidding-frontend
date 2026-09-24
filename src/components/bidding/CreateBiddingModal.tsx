import { useState } from "react";

import { createBidding } from "../../services/biddingApi";

interface CreateBiddingModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const fieldClass =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2.5";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.5)]">

        {/* HEADER */}

        <div className="relative flex items-start justify-between gap-6 px-7 py-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white rounded-t-3xl">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600">
              New Scheme
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Create Bidding
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Fill in the details below to launch
              a scheme.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-600 transition-colors disabled:opacity-50"
          >
            ✕
          </button>

        </div>

        {/* FORM */}

        <div className="px-7 py-7 space-y-6">

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className={labelClass}>
                Pool Amount (₹)
              </label>

              <input
                type="number"
                value={pool}
                onChange={(e) =>
                  setPool(e.target.value)
                }
                placeholder="50000"
                className={fieldClass}
              />
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

          {/* DURATION */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

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

          <div>
            <label className={labelClass}>
              Payment QR Code
            </label>

            <label className="flex items-center justify-between gap-4 w-full border border-dashed border-slate-300 bg-slate-50 rounded-xl px-4 py-3.5 cursor-pointer hover:border-blue-600 hover:bg-blue-50/40 transition-colors">

              <span className="text-sm font-semibold text-slate-500 truncate">
                {qrCodeImage
                  ? `${qrCodeImage.name} ✓`
                  : "Click to upload an image"}
              </span>

              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em] text-white bg-blue-600 rounded-full px-3.5 py-1.5">
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
              <div className="mt-4 flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">

                <div className="min-w-0">

                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                    Selected File
                  </p>

                  <p className="text-sm font-semibold text-slate-700 truncate mt-1">
                    {qrCodeImage.name}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setQrCodeImage(null)
                  }
                  className="shrink-0 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>

              </div>
            )}
          </div>

          {/* ERROR */}

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm font-semibold">

              <span className="mt-0.5">
                ⚠
              </span>

              <span>
                {error}
              </span>

            </div>
          )}

        </div>

        {/* FOOTER */}

        <div className="px-7 py-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-slate-200 py-3.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Bidding"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreateBiddingModal;