
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight, ArrowRight, BusFront, CalendarDays, CheckCircle2,
  Clock3, Headphones, MapPin, Search, ShieldCheck, Sparkles, Ticket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cities, popularRoutes, money } from "../data";
import { useBooking } from "../context/BookingContext";

export default function Home() {
  const navigate = useNavigate();
  const { search, setSearch } = useBooking();
  const [form, setForm] = useState(search);

  function update(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function swapCities() {
    setForm((previous) => ({ ...previous, from: previous.to, to: previous.from }));
  }

  function searchBuses(event) {
    event.preventDefault();
    if (form.from === form.to) {
      alert("Please select two different cities.");
      return;
    }
    if (!form.date || form.date < new Date().toISOString().slice(0, 10)) {
      alert("Please choose a valid journey date.");
      return;
    }
    setSearch({ ...form, passengers: Number(form.passengers) });
    navigate("/buses");
  }

  return (
    <div>
      <section className="hero-grid relative overflow-hidden bg-[#f3f6fd] pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="page-container relative">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold text-orange-600 shadow-sm sm:text-sm">
              <Sparkles size={15} /> Your next adventure starts here
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-[#101c3a] sm:text-6xl lg:text-7xl">
              Miles of memories.
              <span className="mt-2 block text-orange-500">One easy booking.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover routes, compare buses and reserve your favourite seat in just a few clicks.
            </p>
          </motion.div>

          <div className="relative mx-auto mt-10 max-w-5xl">
            <div className="absolute -inset-3 rounded-[32px] bg-orange-200/40 blur-2xl" />
            <form onSubmit={searchBuses} className="surface relative grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_auto_1fr_1fr_auto] lg:items-end">
              <Field label="FROM" icon={<MapPin size={18} />}>
                <select value={form.from} onChange={(e) => update("from", e.target.value)} className="w-full bg-transparent py-2 font-bold outline-none">
                  {cities.map((city) => <option key={city}>{city}</option>)}
                </select>
              </Field>
              <button type="button" onClick={swapCities} aria-label="Swap locations" className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-orange-500 transition hover:rotate-180 hover:bg-orange-50 lg:mb-1">
                <ArrowLeftRight size={19} />
              </button>
              <Field label="TO" icon={<MapPin size={18} />}>
                <select value={form.to} onChange={(e) => update("to", e.target.value)} className="w-full bg-transparent py-2 font-bold outline-none">
                  {cities.map((city) => <option key={city}>{city}</option>)}
                </select>
              </Field>
              <Field label="JOURNEY DATE" icon={<CalendarDays size={18} />}>
                <input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full bg-transparent py-2 font-bold outline-none" />
              </Field>
              <button type="submit" className="flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 font-extrabold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600">
                <Search size={19} /> Search buses
              </button>
              <div className="sm:col-span-2 lg:col-span-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  Passengers
                  <select value={form.passengers} onChange={(e) => update("passengers", Number(e.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800">
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "passenger" : "passengers"}</option>)}
                  </select>
                </label>
              </div>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-500" /> Simple booking</span>
            <span className="flex items-center gap-2"><Ticket size={17} className="text-orange-500" /> Transparent fares</span>
            <span className="flex items-center gap-2"><Clock3 size={17} className="text-blue-500" /> Quick seat selection</span>
          </div>
        </div>
      </section>

      <section id="routes" className="page-container py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-orange-500">YOUR NEXT STOP</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Popular routes</h2>
            <p className="muted mt-3 text-slate-500">Find a route that fits your next adventure.</p>
          </div>
          <button onClick={() => navigate("/buses")} className="flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600">Explore buses <ArrowRight size={17} /></button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map((route, i) => (
            <motion.button
              key={route.from + route.to}
              whileHover={{ y: -5 }}
              onClick={() => {
                const next = { ...search, from: route.from, to: route.to };
                setSearch(next);
                navigate("/buses");
              }}
              className="surface group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-orange-300 hover:shadow-lg"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${i % 2 ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-500"}`}><BusFront size={23} /></div>
              <span className="mt-4 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{route.tag}</span>
              <div className="mt-4 flex items-center gap-2 text-sm font-extrabold">
                <span>{route.from}</span><ArrowRight size={15} className="shrink-0 text-orange-500" /><span>{route.to}</span>
              </div>
              <p className="muted mt-3 text-xs text-slate-500">Starting from <strong className="text-base text-orange-500">{money(route.price)}</strong></p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold tracking-[0.2em] text-orange-500">WHY VOYABUS</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Travel made wonderfully simple</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<CheckCircle2 size={25} />} title="Easy seat selection" text="Choose seats visually and review your fare before continuing." />
            <Feature icon={<ShieldCheck size={25} />} title="Clear booking summary" text="See your bus, journey, passengers and fare in one place." />
            <Feature icon={<Headphones size={25} />} title="Journey information" text="View boarding points, dropping points and available amenities." />
          </div>
        </div>
      </section>

      <section className="page-container py-14">
        <div className="relative overflow-hidden rounded-3xl bg-[#101c3a] p-7 text-white sm:p-12">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Ready when you are</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Your seat is waiting.</h2>
            <p className="mt-3 leading-7 text-slate-300">Plan your next trip and find a journey that works for you.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mt-6 rounded-xl bg-orange-500 px-5 py-3 font-bold transition hover:bg-orange-600">Plan my journey <ArrowRight className="ml-2 inline" size={17} /></button>
          </div>
          <BusFront className="absolute -bottom-8 -right-4 h-48 w-48 text-white/5 sm:h-64 sm:w-64" />
        </div>
      </section>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 px-3 py-2.5 transition focus-within:border-orange-400">
      <label className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.15em] text-slate-400">{icon}{label}</label>
      {children}
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="surface rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <span className="inline-flex rounded-xl bg-orange-50 p-3 text-orange-500">{icon}</span>
      <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
      <p className="muted mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}
