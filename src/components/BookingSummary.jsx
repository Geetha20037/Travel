
import { ArrowRight, BusFront, CalendarDays, MapPin, Ticket } from "lucide-react";
import { money, formatDate } from "../data";

export default function BookingSummary({ bus, search, seats, boarding, dropping, children }) {
  const fare = (bus?.price || 0) * seats.length;
  const fee = seats.length ? 25 : 0;

  return (
    <aside className="surface h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-extrabold"><Ticket size={20} className="text-orange-500" /> Booking summary</h3>

      {bus ? (
        <>
          <div className="mt-5 flex items-start gap-3">
            <span className="rounded-xl bg-orange-50 p-3 text-orange-500"><BusFront size={22} /></span>
            <div>
              <p className="font-bold">{bus.name}</p>
              <p className="muted mt-1 text-sm text-slate-500">{bus.type}</p>
            </div>
          </div>
          <div className="my-5 space-y-4 border-y border-dashed border-slate-200 py-4">
            <div className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 text-orange-500" /><div className="text-sm"><p className="font-bold">{search.from} â†’ {search.to}</p><p className="muted mt-1 text-slate-500">{boarding || "Select boarding point"} â†’ {dropping || "Select dropping point"}</p></div></div>
            <div className="flex items-center gap-3 text-sm"><CalendarDays size={17} className="text-orange-500" /><span>{formatDate(search.date)}</span></div>
            <div className="flex items-center gap-3 text-sm"><Ticket size={17} className="text-orange-500" /><span>Seats: {seats.length ? seats.join(", ") : "Not selected"}</span></div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="muted text-slate-500">Seat fare Ã— {seats.length}</span><span>{money(fare)}</span></div>
            <div className="flex justify-between"><span className="muted text-slate-500">Booking fee</span><span>{money(fee)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-4 text-base font-black"><span>Total</span><span className="text-orange-500">{money(fare + fee)}</span></div>
          </div>
          {children && <div className="mt-5">{children}</div>}
        </>
      ) : (
        <p className="muted mt-4 text-sm text-slate-500">Choose a bus to see your booking details.</p>
      )}
    </aside>
  );
}

