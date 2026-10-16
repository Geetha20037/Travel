
import { useState } from "react";
import { ArrowRight, BusFront, CalendarDays, LogOut, Mail, Ticket, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDate, money } from "../data";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [bookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("voyabus-bookings") || "[]");
    } catch {
      return [];
    }
  });

  if (!user) {
    return (
      <main className="page-container py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500"><UserRound size={30} /></div>
        <h1 className="mt-5 text-3xl font-black">Your travel profile</h1>
        <p className="muted mt-3 text-slate-500">Log in to view your profile and booking history.</p>
        <Link to="/login" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">Log in <ArrowRight size={17} /></Link>
      </main>
    );
  }

  function signOut() {
    logout();
    navigate("/");
  }

  return (
    <main className="page-container min-h-[65vh] py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">Your account</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hello, {user.name}</h1></div>
        <button onClick={signOut} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold hover:border-red-300 hover:text-red-500"><LogOut size={17} /> Log out</button>
      </div>

      <section className="surface mt-7 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600"><UserRound size={30} /></div>
        <div className="flex-1"><h2 className="text-xl font-extrabold">{user.name}</h2><p className="muted mt-2 flex items-center gap-2 text-sm text-slate-500"><Mail size={16} /> {user.email}</p><p className="mt-2 text-xs text-slate-400">Demo account profile</p></div>
        <div className="rounded-xl bg-slate-50 px-5 py-4 text-center"><p className="text-2xl font-black text-orange-500">{bookings.length}</p><p className="text-xs font-bold text-slate-500">Saved bookings</p></div>
      </section>

      <div className="mt-10 flex items-center justify-between gap-4"><h2 className="text-2xl font-black">Booking history</h2><Ticket className="text-orange-500" /></div>

      <div className="mt-5 space-y-4">
        {bookings.map((booking) => (
          <article key={booking.id} className="surface rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><BusFront size={14} /> Demo booking saved</span>
                <h3 className="mt-3 text-xl font-black">{booking.search.from} → {booking.search.to}</h3>
                <p className="muted mt-2 text-sm text-slate-500">{booking.bus.name} · {booking.bus.type}</p>
                <p className="muted mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} /> {formatDate(booking.search.date)}</p>
                <p className="mt-2 text-sm font-semibold">Seats: {booking.seats.join(", ")} · Ticket: {booking.id}</p>
              </div>
              <div className="text-left sm:text-right"><p className="text-2xl font-black text-orange-500">{money(booking.total ?? booking.seats.length * booking.bus.price + 25)}</p><Link to={`/confirmation/${booking.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orange-500">View ticket <ArrowRight size={15} /></Link></div>
            </div>
          </article>
        ))}
        {!bookings.length && (
          <div className="surface rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <Ticket size={36} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-extrabold">No bookings yet</h3>
            <p className="muted mt-2 text-sm text-slate-500">Your confirmed demo bookings will appear here.</p>
            <Link to="/buses" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">Find a bus <ArrowRight size={17} /></Link>
          </div>
        )}
      </div>
    </main>
  );
}
