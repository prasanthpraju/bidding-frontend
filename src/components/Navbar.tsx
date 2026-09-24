import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-px after:bg-black after:transition-all after:duration-300
    ${
      isActive
        ? "text-black after:w-full"
        : "text-black/70 hover:text-black after:w-0 hover:after:w-full"
    }`;

  // LOGIN
  const handleLogin = () => {
    navigate("/login");
  };

  // LOGOUT
  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-neutral-200 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between h-[72px]">
        {/* LOGO */}
        <NavLink
          to="/"
          className="font-heading text-xl font-bold tracking-tight"
        >
          Nova<span className="text-neutral-400">.</span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* DASHBOARD */}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black hover:bg-neutral-100"
                  }`
                }
              >
                Dashboard
              </NavLink>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="text-sm font-semibold px-5 py-2.5 rounded-full border border-neutral-300 hover:border-black transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            /* LOGIN */
            <button
              onClick={handleLogin}
              className="bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-neutral-800 hover:-translate-y-0.5 transition-all shadow-sm"
            >
              Login
            </button>
          )}
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="md:hidden flex flex-col gap-[5px] p-1"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />

          <span
            className={`w-6 h-0.5 bg-black transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden border-t border-neutral-200 bg-white transition-[max-height,opacity] duration-300 ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-5 gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium ${
                    isActive ? "text-black" : "text-black/70"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {isLoggedIn ? (
            <>
              {/* MOBILE DASHBOARD */}
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full"
                >
                  Dashboard
                </NavLink>
              </li>

              {/* MOBILE LOGOUT */}
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center border border-neutral-300 text-black text-sm font-semibold px-6 py-2.5 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* MOBILE LOGIN */
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogin();
                }}
                className="w-full text-center bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;