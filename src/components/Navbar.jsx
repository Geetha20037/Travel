
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BusFront, Menu, Moon, Sun, UserRound, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home" },
    { to: "/buses", label: "Find Buses" },
    { to: "/#routes", label: "Popular Routes" },
  ];

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="surface fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur-xl">
      <div className="page-container flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <BusFront size={24} />
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight">VOYA<span className="text-orange-500">BUS</span></span>
            <span className="block text-[9px] font-bold tracking-[0.19em] text-slate-500">TRAVEL YOUR WAY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-semibold text-slate-600 transition hover:text-orange-500"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-xl border border-slate-200 p-2.5 transition hover:bg-slate-100"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold">
                <UserRound size={17} /> Profile
              </Link>
              <button onClick={handleLogout} className="text-sm font-bold text-slate-500 hover:text-orange-500">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold hover:text-orange-500">Log in</Link>
              <Link to="/signup" className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">Sign up</Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          className="rounded-lg p-2 md:hidden"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <nav className="surface border-t border-slate-200 bg-white p-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="font-semibold">
                {link.label}
              </Link>
            ))}
            <button onClick={() => { toggleTheme(); setOpen(false); }} className="flex items-center gap-2 text-left font-semibold">
              {dark ? <Sun size={18} /> : <Moon size={18} />} Toggle theme
            </button>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)}>My profile</Link>
                <button onClick={handleLogout} className="text-left">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="font-bold text-orange-500">Create account</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
