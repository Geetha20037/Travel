
import { CheckCircle2, Download, Home, Ticket } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { formatDate, money } from "../data";

export default function BookingConfirmation() {
  const { id } = useParams();
  const { booking } = useBooking();

  const stored = JSON.parse(localStorage.getItem("voyabus-bookings") || "[]");
  const ticket = (booking?.id === id ? booking : null) || stored.find((item) => item.id === id);

  if (!ticket) {
    return <main className="page-container py-20 text-center"><h1 className="text-2xl font-black">Ticket not found</h1><Link to="/profile" className="mt-4 inline-block text-orange-500">Check your bookings</Link></main>;
  }

  const total = ticket.total ?? ticket.seats.length * ticket.bus.price + 25;

  function downloadTicket() {
    const content = [
      "VOYABUS — DEMO BOOKING CONFIRMATION",
      `Ticket ID: ${ticket.id}`,
      `Route: ${ticket.search.from} to ${ticket.search.to}`,
      `Date: ${formatDate(ticket.search.date)}`,
      `Bus: ${ticket.bus.name} (${ticket.bus.type})`,
      `Departure: ${ticket.bus.departure} | Arrival: ${ticket.bus.arrival}`,
      `Seats: ${ticket.seats.join(", ")}`,
      `Boarding: ${ticket.boarding}`,
      `Dropping: ${ticket.dropping}`,
      `Passengers: ${ticket.passengers.map((p) => p.name).join(", ")}`,
      `Contact: ${ticket.contact.email} | ${ticket.contact.phone}`,
      `Total demo fare: ${money(total)}`,
      "Demo only — not valid for real travel."
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `VOYABUS-${ticket.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page-container max-w-3xl py-10 sm:py-16">
      <div className="surface overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div className="bg-emerald-500 px-6 py-10 text-center text-white sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20"><CheckCircle2 size={38} /></div>
          <h1 className="mt-4 text-3xl font-black">Booking confirmed!</h1>
          <p className="mt-2 text-sm text-white/90">Your demo booking has been saved in this browser.</p>
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 font-bold"><Ticket size={18} /> {ticket.id}</div>
        </div>

        <div className="p-5 sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Journey</p><h2 className="mt-2 text-2xl font-black">{ticket.search.from} → {ticket.search.to}</h2><p className="mt-2 text-sm text-slate-500">{formatDate(ticket.search.date)}</p></div>
            <div className="rounded-xl bg-orange-50 px-4 py-3 text-right"><p className="text-xs font-bold text-slate-500">Demo total</p><p className="mt-1 text-2xl font-black text-orange-500">{money(total)}</p></div>
          </div>

          <div className="my-6 border-t border-dashed border-slate-200" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Detail label="Bus operator" value={ticket.bus.name} />
            <Detail label="Bus type" value={ticket.bus.type} />
            <Detail label="Departure" value={`${ticket.bus.departure} · ${ticket.search.from}`} />
            <Detail label="Arrival" value={`${ticket.bus.arrival} · ${ticket.search.to}`} />
            <Detail label="Journey duration" value={ticket.bus.duration} />
            <Detail label="Selected seats" value={ticket.seats.join(", ")} />
            <Detail label="Boarding point" value={ticket.boarding} />
            <Detail label="Dropping point" value={ticket.dropping} />
            <Detail label="Passengers" value={ticket.passengers.map((p) => `${p.name} (${p.age})`).join(", ")} />
            <Detail label="Contact" value={`${ticket.contact.email} · ${ticket.contact.phone}`} />
          </div>

          <div className="mt-7 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Demo ticket only:</strong> This confirmation is not a real bus reservation, and the ticket number is generated locally. No payment or operator booking occurred.
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={downloadTicket} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#101c3a] px-5 py-3.5 font-bold text-white hover:bg-slate-800"><Download size={18} /> Download ticket details</button>
            <Link to="/" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 font-bold hover:bg-slate-50"><Home size={18} /> Back home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }) {
  return <div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 break-words text-sm font-bold">{value || "—"}</p></div>;
}
