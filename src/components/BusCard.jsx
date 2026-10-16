
import { ArrowRight, Clock3, MapPin, ShieldCheck, Star, Wifi, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { money } from "../data";

export default function BusCard({ bus, onSelect }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="surface rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold">{bus.name || bus.busName || bus.operator}</h3>
          <p className="muted mt-1 text-sm text-slate-500">{bus.type} Â· {bus.id}</p>
        </div>
        <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-sm font-bold text-emerald-700">
          <Star size={14} fill="currentColor" /> {bus.rating}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div>
          <p className="text-2xl font-black">{bus.departure}</p>
          <p className="muted mt-1 text-sm font-semibold">{bus.from}</p>
        </div>
        <div className="flex min-w-[90px] flex-col items-center gap-1 text-slate-400">
          <span className="text-xs">{bus.duration}</span>
          <div className="flex w-full items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="h-px flex-1 border-t border-dashed border-slate-300" />
            <ArrowRight size={15} />
          </div>
          <span className="text-[10px]">Direct journey</span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black">{bus.arrival}</p>
          <p className="muted mt-1 text-sm font-semibold">{bus.to}</p>
        </div>
      </div>

      <div className="my-5 border-t border-dashed border-slate-200" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><MapPin size={14} /> {bus.available ?? bus.seatsAvailable ?? 0} seats left</span>
          {bus.amenities.includes("Wi-Fi") && <span className="flex items-center gap-1"><Wifi size={14} /> Wi-Fi</span>}
          {bus.amenities.includes("Charging") && <span className="flex items-center gap-1"><Zap size={14} /> Charging</span>}
          <span className="flex items-center gap-1"><ShieldCheck size={14} /> Easy booking</span>
        </div>
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <div>
            <p className="text-2xl font-black text-orange-500">{money(bus.price)}</p>
            <p className="text-[11px] text-slate-500">per seat</p>
          </div>
          <button onClick={() => onSelect(bus)} className="rounded-xl bg-[#101c3a] px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500">
            View seats
          </button>
        </div>
      </div>
    </motion.article>
  );
}

