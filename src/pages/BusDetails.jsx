
import { ArrowLeft, CheckCircle2, Clock3, MapPin, ShieldCheck, Star, Wifi, Zap } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buses, money, formatDate } from "../data";
import { useBooking } from "../context/BookingContext";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search, selectedBus, startBooking } = useBooking();
  const bus = buses.find((item) => item.id === id) || selectedBus;

  if (!bus) {
    return <main className="page-container py-20 text-center"><h1 className="text-2xl font-black">Bus not found</h1><Link to="/buses" className="mt-4 inline-block text-orange-500">Back to search</Link></main>;
  }

  function chooseSeats() {
    startBooking(bus);
    navigate("/seats");
  }

  return (
    <main className="page-container py-8 sm:py-12">
      <Link to="/buses" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500"><ArrowLeft size={17} /> Back to results</Link>

      <div className="mt-6 overflow-hidden rounded-3xl bg-[#101c3a] p-6 text-white sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">{bus.type}</span>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl">{bus.name}</h1>
            <p className="mt-2 text-sm text-blue-200">{bus.id} · Journey on {formatDate(search.date)}</p>
          </div>
          <span className="flex items-center gap-1 rounded-xl bg-emerald-400/15 px-3 py-2 font-bold text-emerald-300"><Star size={16} fill="currentColor" /> {bus.rating} rating</span>
        </div>

        <div className="mt-9 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div><p className="text-3xl font-black sm:text-4xl">{bus.departure}</p><p className="mt-2 text-sm text-blue-200">{bus.from}</p></div>
          <div className="text-center"><Clock3 className="mx-auto text-orange-400" /><p className="mt-2 text-xs text-blue-200">{bus.duration}</p><div className="mt-2 h-px w-20 bg-white/25" /></div>
          <div className="text-right"><p className="text-3xl font-black sm:text-4xl">{bus.arrival}</p><p className="mt-2 text-sm text-blue-200">{bus.to}</p></div>
        </div>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="surface rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold">Bus amenities</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {bus.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 size={17} className="text-emerald-500" />{amenity}</div>
              ))}
            </div>
          </section>
          <section className="surface rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold">Boarding points</h2>
            <div className="mt-5 space-y-4">
              {bus.boarding.map((point, i) => <div key={point} className="flex items-center gap-3"><MapPin size={18} className="text-orange-500" /><div><p className="font-bold">{point}</p><p className="text-xs text-slate-500">Boarding stop {i + 1}</p></div></div>)}
            </div>
            <h2 className="mt-7 text-xl font-extrabold">Dropping points</h2>
            <div className="mt-5 space-y-4">
              {bus.dropping.map((point, i) => <div key={point} className="flex items-center gap-3"><MapPin size={18} className="text-emerald-500" /><div><p className="font-bold">{point}</p><p className="text-xs text-slate-500">Dropping stop {i + 1}</p></div></div>)}
            </div>
          </section>
          <p className="flex items-start gap-2 text-xs leading-5 text-slate-500"><ShieldCheck size={17} className="shrink-0 text-emerald-500" /> This educational demo uses sample bus information. It does not verify real operators, schedules or available inventory.</p>
        </div>

        <aside className="surface h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-500">Starting fare per seat</p>
          <p className="mt-2 text-4xl font-black text-orange-500">{money(bus.price)}</p>
          <p className="mt-3 text-sm text-slate-500">{bus.available} sample seats shown as available</p>
          <div className="my-5 border-t border-slate-200" />
          <div className="flex items-center justify-between text-sm"><span>Bus type</span><strong>{bus.type}</strong></div>
          <div className="mt-3 flex items-center justify-between text-sm"><span>Route</span><strong>{bus.from} → {bus.to}</strong></div>
          <button onClick={chooseSeats} className="mt-7 w-full rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600">Select seats <Zap className="ml-2 inline" size={17} /></button>
        </aside>
      </div>
    </main>
  );
}
