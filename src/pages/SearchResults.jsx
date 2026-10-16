
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowLeftRight, CalendarDays, Filter, Search, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { buses, cities, formatDate } from "../data";
import { useBooking } from "../context/BookingContext";
import BusCard from "../components/BusCard";

export default function SearchResults() {
  const navigate = useNavigate();
  const { search, setSearch, startBooking } = useBooking();
  const [form, setForm] = useState(search);
  const [sort, setSort] = useState("recommended");
  const [acOnly, setAcOnly] = useState(false);
  const [sleeperOnly, setSleeperOnly] = useState(false);

  const results = useMemo(() => {
    let list = buses.filter((bus) => bus.from === search.from && bus.to === search.to);
    if (acOnly) list = list.filter((bus) => bus.type.includes("AC"));
    if (sleeperOnly) list = list.filter((bus) => bus.type.includes("Sleeper"));

    if (sort === "price") list.sort((a, b) => a.price - b.price);
    if (sort === "departure") list.sort((a, b) => a.departure.localeCompare(b.departure));
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, acOnly, sleeperOnly, sort]);

  function submit(event) {
    event.preventDefault();
    if (form.from === form.to) {
      alert("Choose two different cities.");
      return;
    }
    if (!form.date || form.date < new Date().toISOString().slice(0, 10)) {
      alert("Choose a valid journey date.");
      return;
    }
    setSearch({ ...form, passengers: Number(form.passengers) });
  }

  function selectBus(bus) {
    startBooking(bus);
    navigate("/seats");
  }

  return (
    <main className="page-container min-h-[70vh] py-8 sm:py-12">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500"><ArrowLeft size={17} /> Back home</Link>

      <form onSubmit={submit} className="surface grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_1fr_auto] lg:items-end">
        <label className="text-xs font-bold text-slate-500">FROM
          <select value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="mt-2 block w-full rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-900">
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>
        </label>
        <button type="button" onClick={() => setForm({ ...form, from: form.to, to: form.from })} className="mx-auto rounded-xl border border-slate-200 p-2 text-orange-500 lg:mb-0.5"><ArrowLeftRight size={18} /></button>
        <label className="text-xs font-bold text-slate-500">TO
          <select value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="mt-2 block w-full rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-900">
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-500">JOURNEY DATE
          <input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-2 block w-full rounded-lg border border-slate-200 p-3 text-sm font-bold text-slate-900" />
        </label>
        <button className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 font-bold text-white hover:bg-orange-600"><Search size={17} /> Search</button>
      </form>

      <div className="mt-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-orange-500">{search.from} â†’ {search.to}</p>
          <h1 className="mt-1 text-3xl font-black">Available buses</h1>
          <p className="muted mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} /> {formatDate(search.date)} Â· {results.length} demo services</p>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal size={17} />
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white p-2.5">
            <option value="recommended">Recommended</option>
            <option value="price">Lowest fare</option>
            <option value="departure">Departure time</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><Filter size={16} className="text-orange-500" /><input type="checkbox" checked={acOnly} onChange={(e) => setAcOnly(e.target.checked)} /> AC buses</label>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={sleeperOnly} onChange={(e) => setSleeperOnly(e.target.checked)} /> Sleeper buses</label>
      </div>

      <div className="mt-6 space-y-5">
        {results.map((bus) => <BusCard key={bus.id} bus={bus} onSelect={selectBus} />)}
      </div>

      {!results.length && (
        <div className="surface mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <Search size={35} className="mx-auto text-slate-400" />
          <h2 className="mt-4 text-xl font-extrabold">No demo buses on this route</h2>
          <p className="muted mt-2 text-sm text-slate-500">Try another city pair or clear your filters.</p>
          <button onClick={() => { setAcOnly(false); setSleeperOnly(false); setForm({ ...search, from: "Hyderabad", to: "Bengaluru" }); setSearch({ ...search, from: "Hyderabad", to: "Bengaluru" }); }} className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">Show popular route</button>
        </div>
      )}
    </main>
  );
}

