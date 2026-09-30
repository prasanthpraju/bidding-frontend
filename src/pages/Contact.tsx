import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSent(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setSent(false);
    }, 3500);
  };

  return (
    <div className="bg-white text-black">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">

          <div className="max-w-4xl">

            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-red-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
                Get In Touch
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Questions?
              <br />

              <span className="text-neutral-400">
                We're listening.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              Have a question about bidding, lucky draws,
              or your account? Send us a message and our team
              will get back to you.
            </p>

          </div>

          {/* Accent */}
          <div className="mt-14 flex items-center gap-3">
            <span className="h-1 w-16 rounded-full bg-black" />
            <span className="h-1 w-6 rounded-full bg-red-500" />
            <span className="h-1 w-2 rounded-full bg-neutral-300" />
          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* CONTACT SECTION */}
      {/* ===================================================== */}

      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">

          {/* ================================================= */}
          {/* CONTACT INFORMATION */}
          {/* ================================================= */}

          <div>

            {/* Header */}
            <div className="mb-10">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-7 bg-red-500" />

                <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                  Contact Details
                </span>
              </div>

              <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl">
                Let's talk.
              </h2>

              <p className="mt-4 max-w-md leading-7 text-neutral-600">
                Whether you need assistance or simply want
                to learn more about Nova, we're here to help.
              </p>

            </div>


            {/* Email */}
            <a
              href="mailto:hello@nova.app"
              className="
                group
                flex
                cursor-pointer
                items-start
                gap-4
                rounded-2xl
                border
                border-neutral-200
                bg-white
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-black
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  text-white
                  transition-colors
                  duration-300
                  group-hover:bg-red-500
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 6l8 6 8-6" />
                </svg>
              </div>

              <div>
                <p className="mb-1 text-xs font-bold text-neutral-500">
                  Email
                </p>

                <p className="text-sm font-black sm:text-base">
                  hello@nova.app
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Send us an email anytime
                </p>
              </div>
            </a>


            {/* Phone */}
            <a
              href="tel:+910000000000"
              className="
                group
                mt-4
                flex
                cursor-pointer
                items-start
                gap-4
                rounded-2xl
                border
                border-neutral-200
                bg-white
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-black
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  text-white
                  transition-colors
                  duration-300
                  group-hover:bg-red-500
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z" />
                </svg>
              </div>

              <div>
                <p className="mb-1 text-xs font-bold text-neutral-500">
                  Phone
                </p>

                <p className="text-sm font-black sm:text-base">
                  +91 00000 00000
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  We're available to help
                </p>
              </div>
            </a>


            {/* Location */}
            <div
              className="
                group
                mt-4
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-neutral-200
                bg-white
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-black
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  text-white
                  transition-colors
                  duration-300
                  group-hover:bg-red-500
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <div>
                <p className="mb-1 text-xs font-bold text-neutral-500">
                  Office
                </p>

                <p className="text-sm font-black sm:text-base">
                  Mumbai, India
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Nova headquarters
                </p>
              </div>
            </div>


            {/* Simple Status */}
            <div className="mt-7 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs font-bold text-neutral-500">
                We'll get back to you as soon as possible.
              </span>
            </div>

          </div>


          {/* ================================================= */}
          {/* CONTACT FORM */}
          {/* ================================================= */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200
              bg-neutral-50
              p-7
              sm:p-9
            "
          >

            {/* Top Accent */}
            <div className="mb-8 flex items-center gap-2">
              <span className="h-1 w-12 rounded-full bg-black" />
              <span className="h-1 w-5 rounded-full bg-red-500" />
            </div>

            {/* Form Header */}
            <div className="mb-8">

              <span className="mb-3 inline-block text-xs font-black uppercase tracking-[0.15em] text-neutral-500">
                Message Us
              </span>

              <h2 className="font-heading text-2xl font-black sm:text-3xl">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Fill in the details below and we'll get back
                to you.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-black text-neutral-700"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-neutral-300
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    text-black
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-neutral-400
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/5
                  "
                  placeholder="Your name"
                />
              </div>


              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-black text-neutral-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-neutral-300
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    text-black
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-neutral-400
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/5
                  "
                  placeholder="you@example.com"
                />
              </div>


              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-black text-neutral-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-neutral-300
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    text-black
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-neutral-400
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/5
                  "
                  placeholder="How can we help?"
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                className={`
                  group
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  py-3.5
                  text-sm
                  font-black
                  transition-all
                  duration-300
                  ${
                    sent
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg"
                  }
                `}
              >
                {sent ? (
                  <>
                    <span className="text-base">
                      ✓
                    </span>

                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message

                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>
      </section>


      {/* ===================================================== */}
      {/* BOTTOM CTA */}
      {/* ===================================================== */}

      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">

          <span className="mb-5 inline-block text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
            Nova Support
          </span>

          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-4xl">
            We're here when you
            <span className="text-neutral-500">
              {" "}need us.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-neutral-400">
            Questions about bidding, lucky draws, or your
            account? Reach out and let's get things sorted.
          </p>

        </div>
      </section>

    </div>
  );
};

export default Contact;