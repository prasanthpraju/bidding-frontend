import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

interface BiddingDetails {
  id: string;
  bidCode: string;
  name: string;
  pool: string | number;
  members: number;
  duration: number;
  durationType: string;
}

function ParticipantRegistration() {
  const { id } = useParams();

  const [bidding, setBidding] = useState<BiddingDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fullName, setFullName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [idProof, setIdProof] = useState<File | null>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    async function fetchBidding() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/participants/registration/${encodeURIComponent(
            id || "",
          )}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          setError(result.error || "Bidding not found");
          return;
        }

        setBidding(result.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load bidding details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBidding();
    } else {
      setError("Invalid bidding link");
      setLoading(false);
    }
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!id) {
      setError("Invalid bidding link");
      return;
    }

    if (!photo) {
      setError("Please upload your photo");
      return;
    }

    if (!idProof) {
      setError("Please upload your ID proof");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("photo", photo);
      formData.append("idProof", idProof);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("phoneNumber", phoneNumber);
      formData.append("whatsappNumber", whatsappNumber);

      // Send bidding UUID
      formData.append("biddingId", id);

      const response = await fetch(`${API_URL}/participants`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Registration failed");
        return;
      }

      setSuccess("Registration completed successfully!");

      // Clear form
      setFullName("");
      setPhoto(null);
      setIdProof(null);
      setAge("");
      setGender("");
      setPhoneNumber("");
      setWhatsappNumber("");

      // Reset file inputs
      const fileInputs =
        document.querySelectorAll<HTMLInputElement>('input[type="file"]');

      fileInputs.forEach((input) => {
        input.value = "";
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-11 h-11 mx-auto rounded-full border-[3px] border-neutral-800 border-t-red-500 animate-spin" />

          <p className="mt-5 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
            Loading registration
          </p>
        </div>
      </div>
    );
  }

  if (error && !bidding) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md bg-white rounded-[28px] p-7 sm:p-10 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-black">
            !
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
            Registration Error
          </p>

          <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
            Invalid Registration Link
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-950">
      {/* Top Bar */}
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="h-[72px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-red-600" />
              </div>

              <div>
                <p className="text-xl font-black tracking-tight text-white">
                  Nova.
                </p>

                <p className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Live Bidding
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />

              <span className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Registration Open
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
        {/* Event Header */}
        <section className="bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-7">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />

                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em]">
                    Participant Registration
                  </span>
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[1.05] break-words">
                  {bidding?.name}
                </h1>

                <p className="mt-4 text-sm sm:text-base text-neutral-500 leading-6 max-w-xl">
                  Complete your details below to register as a participant
                  in this bidding scheme.
                </p>
              </div>

              <div className="lg:text-right shrink-0">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  Bidding ID
                </p>

                <p className="mt-2 text-sm font-black text-neutral-950 break-all">
                  {bidding?.bidCode}
                </p>
              </div>
            </div>

            {/* Event Information */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">
                  Pool
                </p>

                <p className="mt-2 text-lg sm:text-2xl font-black">
                  ₹{bidding?.pool}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">
                  Members
                </p>

                <p className="mt-2 text-lg sm:text-2xl font-black">
                  {bidding?.members}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">
                  Duration
                </p>

                <p className="mt-2 text-lg sm:text-2xl font-black">
                  {bidding?.duration}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">
                  Cycle
                </p>

                <p className="mt-2 text-lg sm:text-2xl font-black truncate">
                  {bidding?.durationType}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Card */}
        <section className="mt-5 sm:mt-7 bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden">
          {/* Form Header */}
          <div className="border-b border-neutral-200 px-6 py-6 sm:px-8 sm:py-8 lg:px-10">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-black text-white flex items-center justify-center font-black">
                01
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                  Registration Form
                </p>

                <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight">
                  Your Details
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  All fields are required unless stated otherwise.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Error */}
            {error && (
              <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 px-4 sm:px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 shrink-0 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-black">
                    !
                  </div>

                  <div>
                    <p className="text-sm font-black text-red-800">
                      Please check your details
                    </p>

                    <p className="mt-1 text-sm text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-7 rounded-2xl border border-green-200 bg-green-50 px-4 sm:px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 shrink-0 rounded-lg bg-green-600 text-white flex items-center justify-center text-xs font-black">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-black text-green-800">
                      Registration completed
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                      {success}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div>
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                    Enter your basic personal details.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-black text-neutral-800 mb-2">
                      Full Name
                      <span className="text-red-600 ml-1">*</span>
                    </label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full h-14 px-4 sm:px-5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm sm:text-base font-semibold text-neutral-950 placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Age + Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-neutral-800 mb-2">
                        Age
                        <span className="text-red-600 ml-1">*</span>
                      </label>

                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter your age"
                        required
                        className="w-full h-14 px-4 sm:px-5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm sm:text-base font-semibold text-neutral-950 placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-neutral-800 mb-2">
                        Gender
                        <span className="text-red-600 ml-1">*</span>
                      </label>

                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="w-full h-14 px-4 sm:px-5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm sm:text-base font-semibold text-neutral-950 outline-none focus:border-black focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-9 pt-8 border-t border-neutral-200">
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Contact Information
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                    Provide numbers that can be used to contact you.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black text-neutral-800 mb-2">
                      Phone Number
                      <span className="text-red-600 ml-1">*</span>
                    </label>

                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="w-full h-14 px-4 sm:px-5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm sm:text-base font-semibold text-neutral-950 placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition-colors"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-black text-neutral-800 mb-2">
                      WhatsApp Number
                      <span className="text-red-600 ml-1">*</span>
                    </label>

                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) =>
                        setWhatsappNumber(e.target.value)
                      }
                      placeholder="Enter your WhatsApp number"
                      required
                      className="w-full h-14 px-4 sm:px-5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm sm:text-base font-semibold text-neutral-950 placeholder:text-neutral-400 outline-none focus:border-black focus:bg-white transition-colors"
                    />

                    <p className="mt-2 text-[11px] text-neutral-400">
                      Make sure this number is active on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mt-9 pt-8 border-t border-neutral-200">
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Identity Verification
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                    Upload the required documents for participant verification.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Photo */}
                  <div>
                    <label className="block text-xs font-black text-neutral-800 mb-2">
                      Participant Photo
                      <span className="text-red-600 ml-1">*</span>
                    </label>

                    <label className="block border-2 border-dashed border-neutral-200 rounded-2xl p-5 sm:p-6 cursor-pointer hover:border-black hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-black text-white flex items-center justify-center text-lg font-black">
                          ↑
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-black text-neutral-950">
                            Upload Photo
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            Choose a clear photo of yourself
                          </p>

                          {photo && (
                            <p className="mt-2 text-xs font-bold text-red-600 truncate">
                              {photo.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setPhoto(e.target.files?.[0] || null)
                        }
                        required
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* ID Proof */}
                  <div>
                    <label className="block text-xs font-black text-neutral-800 mb-2">
                      ID Proof
                      <span className="text-red-600 ml-1">*</span>
                    </label>

                    <label className="block border-2 border-dashed border-neutral-200 rounded-2xl p-5 sm:p-6 cursor-pointer hover:border-black hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-neutral-100 text-neutral-950 flex items-center justify-center text-sm font-black">
                          ID
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-black text-neutral-950">
                            Upload ID Proof
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            PNG, JPG or PDF accepted
                          </p>

                          {idProof && (
                            <p className="mt-2 text-xs font-bold text-red-600 truncate">
                              {idProof.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          setIdProof(e.target.files?.[0] || null)
                        }
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div className="mt-9 pt-8 border-t border-neutral-200">
                <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5">
                  <p className="text-xs sm:text-sm font-bold text-neutral-700 leading-5">
                    Please review your information before submitting.
                    Make sure your phone number and uploaded documents are
                    correct.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-5 w-full min-h-14 sm:min-h-[60px] rounded-xl bg-black text-white text-sm sm:text-base font-black hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {submitting ? (
                    <span className="inline-flex items-center justify-center gap-3">
                      <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                      Submitting Registration...
                    </span>
                  ) : (
                    "Complete Registration"
                  )}
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-neutral-400">
                  By submitting this form, you confirm that the information
                  provided is accurate.
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-600">
            Nova. Live Bidding Platform
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600">
              Secure Registration
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ParticipantRegistration;