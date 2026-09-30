import { useState, useEffect } from "react";
import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-white/90 backdrop-blur-xl
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-neutral-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "border-b border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between h-[76px]">

        {/* ================= LOGO ================= */}
        <NavLink
          to="/"
          className="flex items-center gap-2 cursor-pointer group"
        >
          {/* Logo Icon */}
          <div
            className="
              w-9 h-9
              rounded-xl
              bg-black
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-105
              group-hover:bg-neutral-800
            "
          >
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          </div>

          {/* Logo Text */}
          <span
            className="
              font-black
              text-xl
              tracking-tight
              text-black
              cursor-pointer
            "
          >
            Nova<span className="text-red-500">.</span>
          </span>
        </NavLink>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center">

          {/* Navigation Links */}
          <ul className="flex items-center gap-9">

            {navLinks.map((link) => {
              const isCurrent =
                location.pathname === link.to;

              return (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={`
                      relative
                      text-sm
                      font-bold
                      cursor-pointer
                      transition-colors
                      duration-300
                      ${
                        isCurrent
                          ? "text-black"
                          : "text-black/65 hover:text-black"
                      }

                      after:absolute
                      after:left-0
                      after:-bottom-2
                      after:h-[2px]
                      after:bg-red-500
                      after:rounded-full
                      after:transition-all
                      after:duration-300

                      ${
                        isCurrent
                          ? "after:w-full"
                          : "after:w-0 hover:after:w-full"
                      }
                    `}
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}

          </ul>

          {/* ================= AUTH AREA ================= */}
          <div
            className="
              ml-10
              pl-8
              border-l
              border-neutral-200
              flex
              items-center
              gap-3
            "
          >

            {isLoggedIn ? (
              <>
                {/* Dashboard */}
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `
                    text-sm
                    font-bold
                    cursor-pointer
                    px-5
                    py-2.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-black text-white shadow-md"
                        : "text-black hover:bg-neutral-100"
                    }
                  `}
                >
                  Dashboard
                </NavLink>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    text-sm
                    font-bold
                    cursor-pointer
                    px-5
                    py-2.5
                    rounded-full
                    border
                    border-neutral-300
                    text-black
                    transition-all
                    duration-300
                    hover:border-red-500
                    hover:text-red-500
                    hover:bg-red-50
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              /* Login */
              <button
                type="button"
                onClick={handleLogin}
                className="
                  relative
                  overflow-hidden
                  bg-black
                  text-white
                  text-sm
                  font-bold
                  cursor-pointer
                  px-7
                  py-2.5
                  rounded-full
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  group
                "
              >
                <span
                  className="
                    relative
                    z-10
                    cursor-pointer
                  "
                >
                  Login
                </span>

                <span
                  className="
                    absolute
                    inset-0
                    bg-red-500
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform
                    duration-300
                  "
                />
              </button>
            )}

          </div>
        </nav>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((previous) => !previous)
          }
          className="
            md:hidden
            flex
            flex-col
            gap-[5px]
            p-2
            rounded-lg
            cursor-pointer
            hover:bg-neutral-100
            transition-colors
          "
        >
          <span
            className={`
              w-6
              h-0.5
              bg-black
              rounded-full
              transition-all
              duration-300
              ${
                menuOpen
                  ? "translate-y-[7px] rotate-45"
                  : ""
              }
            `}
          />

          <span
            className={`
              w-6
              h-0.5
              bg-black
              rounded-full
              transition-all
              duration-200
              ${
                menuOpen
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          />

          <span
            className={`
              w-6
              h-0.5
              bg-black
              rounded-full
              transition-all
              duration-300
              ${
                menuOpen
                  ? "-translate-y-[7px] -rotate-45"
                  : ""
              }
            `}
          />
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-5 pb-5">

          <div
            className="
              bg-neutral-50
              border
              border-neutral-200
              rounded-2xl
              p-4
              shadow-sm
            "
          >

            <ul className="flex flex-col gap-2">

              {/* Mobile Links */}
              {navLinks.map((link) => {
                const isCurrent =
                  location.pathname === link.to;

                return (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={`
                        block
                        px-4
                        py-3
                        rounded-xl
                        text-sm
                        font-bold
                        cursor-pointer
                        transition-all
                        duration-200
                        ${
                          isCurrent
                            ? "bg-black text-white"
                            : "text-black/70 hover:text-black hover:bg-white"
                        }
                      `}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}

              {/* Mobile Auth */}
              <li className="pt-2 mt-2 border-t border-neutral-200">

                {isLoggedIn ? (
                  <div className="flex flex-col gap-2">

                    {/* Mobile Dashboard */}
                    <NavLink
                      to="/dashboard"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={({ isActive }) => `
                        block
                        w-full
                        text-center
                        text-sm
                        font-bold
                        cursor-pointer
                        px-6
                        py-3
                        rounded-xl
                        transition-all
                        ${
                          isActive
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-neutral-100"
                        }
                      `}
                    >
                      Dashboard
                    </NavLink>

                    {/* Mobile Logout */}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="
                        w-full
                        text-center
                        border
                        border-neutral-300
                        text-black
                        text-sm
                        font-bold
                        cursor-pointer
                        px-6
                        py-3
                        rounded-xl
                        transition-all
                        duration-200
                        hover:border-red-500
                        hover:text-red-500
                        hover:bg-red-50
                      "
                    >
                      Logout
                    </button>

                  </div>
                ) : (
                  /* Mobile Login */
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogin();
                    }}
                    className="
                      w-full
                      text-center
                      bg-black
                      text-white
                      text-sm
                      font-bold
                      cursor-pointer
                      px-6
                      py-3
                      rounded-xl
                      transition-all
                      duration-300
                      hover:bg-red-500
                      hover:-translate-y-0.5
                    "
                  >
                    Login
                  </button>
                )}

              </li>

            </ul>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;