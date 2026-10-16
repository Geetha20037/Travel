
import { useState } from "react";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import BookingSummary from "../components/BookingSummary";

export default function PassengerDetails() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    search, selectedBus, seats, passengers, setPassengers,
    contact, setContact, boarding, setBoarding, dropping, setDropping,
    confirmBooking,
  } = useBooking();

  const [error, setError] = useState("");

  if (!selectedBus || !seats.length) {
    return <main className="page-container py-20 text-center"><h1 className="text-2xl font-black">Select a bus and seats first</h1><Link to="/buses" className="mt-4 inline-block text-orange-500">Find buses</Link></main>;
  }

  const boardingPoints = selectedBus.boarding?.length ? selectedBus.boarding : [`${selectedBus.from} Central Bus Station`, `${selectedBus.from} Main Bus Stand`];
  const droppingPoints = selectedBus.dropping?.length ? selectedBus.dropping : [`${selectedBus.to} Central Bus Station`, `${selectedBus.to} Main Bus Stand`];
  const count = seats.length;

  function updatePassenger(index, key, value) {
    setPassengers((previous) => {
      const next = [...previous];
      next[index] = { ...(next[index] || {}), [key]: value };
      return next;
    });
  }

  function submit(event) {
    event.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(contact.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!boarding || !dropping) {
      setError("Choose your boarding and dropping points.");
      return;
    }
    if (boarding === dropping) {
      setError("Boarding and dropping points must be different.");
      return;
    }

    for (let i = 0; i < count; i++) {
      const p = passengers[i] || {};
      if (!p.name?.trim() || p.name.trim().length < 2) {
        setError(`Enter a valid name for passenger ${i + 1}.`);
        return;
      }
      if (!p.age || Number(p.age) < 1 || Number(p.age) > 120) {
        setError(`Enter a valid age for passenger ${i + 1}.`);
        return;
      }
    }

    navigate("/payment");
  }

  return (
    <main className="page-container py-8 sm:py-12">
      <Link to="/seats" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500"><ArrowLeft size={17} /> Back to seats</Link>
      <h1 className="mt-5 text-3xl font-black sm:text-4xl">Passenger details</h1>
      <p className="muted mt-2 text-slate-500">Add traveller information and confirm your demo booking.</p>

      <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_350px]">
        <form onSubmit={submit} className="surface space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <section>
            <h2 className="flex items-center gap-2 text-xl font-extrabold"><UserRound className="text-orange-500" /> Traveller information</h2>
            <p className="muted mt-2 text-sm text-slate-500">Seats selected: {seats.join(", ")}</p>
            <div className="mt-5 space-y-4">
              {seats.map((seat, index) => (
                <div key={seat} className="rounded-xl border border-slate-200 p-4">
                  <p className="mb-4 text-sm font-extrabold">Passenger {index + 1} Â· Seat {seat}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-bold">Full name
                      <input required minLength={2} value={passengers[index]?.name || ""} onChange={(e) => updatePassenger(index, "name", e.target.value)} placeholder="Enter full name" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-orange-400" />
                    </label>
                    <label className="text-sm font-bold">Age
                      <input required type="number" min="1" max="120" value={passengers[index]?.age || ""} onChange={(e) => updatePassenger(index, "age", e.target.value)} placeholder="Age" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-orange-400" />
                    </label>
                    <label className="text-sm font-bold sm:col-span-2">Gender
                      <select required value={passengers[index]?.gender || ""} onChange={(e) => updatePassenger(index, "gender", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none focus:border-orange-400">
                        <option value="">Select gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold">Contact information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold">Email address
                <input required type="email" value={contact.email ?? ""} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-orange-400" />
              </label>
              <label className="text-sm font-bold">Mobile number
                <input required type="tel" inputMode="numeric" maxLength={10} value={contact.phone || ""} onChange={(e) => setContact({ ...contact, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile number" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-orange-400" />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold">Boarding and dropping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold">Boarding point
                <select required value={boarding} onChange={(e) => setBoarding(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal">
                  {boardingPoints.map((point) => <option key={point}>{point}</option>)}
                </select>
              </label>
              <label className="text-sm font-bold">Dropping point
                <select required value={dropping} onChange={(e) => setDropping(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal">
                  {droppingPoints.map((point) => <option key={point}>{point}</option>)}
                </select>
              </label>
            </div>
          </section>

          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button type="submit" className="w-full rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600">Confirm demo booking <ArrowRight className="ml-2 inline" size={17} /></button>
          <p className="text-xs leading-5 text-slate-500">This is a demonstration booking. No payment is collected and no real ticket is issued.</p>
        </form>

        <div className="lg:sticky lg:top-24">
          <BookingSummary bus={selectedBus} search={search} seats={seats} boarding={boarding} dropping={dropping} />
        </div>
      </div>
    </main>
  );
}






