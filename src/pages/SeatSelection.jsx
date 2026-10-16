
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import SeatLayout from "../components/SeatLayout";
import BookingSummary from "../components/BookingSummary";

export default function SeatSelection() {
  const navigate = useNavigate();
  const { search, selectedBus, seats, setSeats, boarding, dropping } = useBooking();

  if (!selectedBus) {
    return <main className="page-container py-20 text-center"><h1 className="text-2xl font-black">Choose a bus first</h1><Link to="/buses" className="mt-4 inline-block text-orange-500">Find buses</Link></main>;
  }

  function continueBooking() {
    if (!selectedBus) {
      alert("Please select a bus first.");
      navigate("/buses");
      return;
    }

    if (!seats || seats.length === 0) {
      alert("Please select an available seat first. Your selected seat should turn orange.");
      return;
    }

    if (seats.length > Number(search.passengers || 1)) {
      alert("Please select seats according to the passenger count.");
      return;
    }

    navigate("/passengers");
  }

  return (
    <main className="page-container py-8 sm:py-12">
      <Link to={`/bus/${selectedBus.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500"><ArrowLeft size={17} /> Bus details</Link>
      <h1 className="mt-5 text-3xl font-black sm:text-4xl">Pick your perfect seat</h1>
      <p className="muted mt-2 text-slate-500">{selectedBus.name} Â· {selectedBus.type}</p>

      <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_350px]">
        <div>
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <Info size={19} className="mt-0.5 shrink-0" />
            <p>Choose up to {search.passengers || 1} seat(s). Booked seats are disabled in this demonstration.</p>
          </div>
          <SeatLayout seats={seats} setSeats={setSeats} price={selectedBus.price} />
          <button onClick={() => setSeats([])} className="mt-4 text-sm font-bold text-slate-500 underline hover:text-orange-500">Clear selection</button>
        </div>
        <div className="lg:sticky lg:top-24">
          <BookingSummary bus={selectedBus} search={search} seats={seats} boarding={boarding} dropping={dropping}>
            <button onClick={continueBooking} className="w-full rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600">Continue <ArrowRight className="ml-2 inline" size={17} /></button>
          </BookingSummary>
        </div>
      </div>
    </main>
  );
}


