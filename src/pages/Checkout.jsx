import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, ShieldCheck, Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { money, formatDate } from "../data";

export default function Checkout() {
  const navigate = useNavigate();
  const { search, selectedBus, seats, passengers, contact, boarding, dropping, confirmBooking } = useBooking();
  const [method, setMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  if (!selectedBus || !seats.length || !passengers.length) {
    return (
      <main className="page-container py-20 text-center">
        <h1 className="text-2xl font-black">Complete your booking details first</h1>
        <p className="mt-3 text-slate-500">Select seats and enter passenger details before payment.</p>
        <Link to="/buses" className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">Find buses</Link>
      </main>
    );
  }

  const total = seats.length * Number(selectedBus.price || 0);

  function payNow() {
    if (processing) return;
    setProcessing(true);

    try {
      const ticket = confirmBooking();
      navigate(`/confirmation/${ticket.id}`);
    } catch {
      setProcessing(false);
      alert("Unable to complete the demo booking. Please try again.");
    }
  }

  return (
    <main className="page-container py-8 sm:py-12">
      <Link to="/passengers" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500">
        <ArrowLeft size={17} /> Back to passenger details
      </Link>

      <div className="mt-5">
        <p className="text-sm font-bold uppercase tracking-wider text-orange-500">Final step</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Payment</h1>
        <p className="mt-2 text-slate-500">Review your journey and complete the demo payment.</p>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <section className="surface rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-xl font-extrabold">Choose payment method</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("UPI")}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${method === "UPI" ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "border-slate-200 hover:border-orange-300"}`}
            >
              <Smartphone size={24} className="text-orange-500" />
              <span>
                <span className="block font-extrabold">UPI</span>
                <span className="text-xs text-slate-500">Demo UPI payment</span>
              </span>
              {method === "UPI" && <CheckCircle2 className="ml-auto text-orange-500" size={20} />}
            </button>

            <button
              type="button"
              onClick={() => setMethod("Card")}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${method === "Card" ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "border-slate-200 hover:border-orange-300"}`}
            >
              <CreditCard size={24} className="text-orange-500" />
              <span>
                <span className="block font-extrabold">Credit / Debit Card</span>
                <span className="text-xs text-slate-500">Demo card payment</span>
              </span>
              {method === "Card" && <CheckCircle2 className="ml-auto text-orange-500" size={20} />}
            </button>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            {method === "UPI" ? (
              <>
                <h3 className="font-bold">UPI payment</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">This demo simulates a successful UPI payment. No UPI ID or bank details are required.</p>
              </>
            ) : (
              <>
                <h3 className="font-bold">Card payment</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">This demo simulates a successful card payment. Do not enter real card details.</p>
              </>
            )}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <ShieldCheck className="shrink-0 text-emerald-600" size={22} />
            <p className="text-sm leading-6 text-emerald-800">
              <strong>Demo checkout:</strong> Clicking Pay Now will simulate payment success and save your booking in this browser. No real payment will be collected.
            </p>
          </div>

          <button
            type="button"
            onClick={payNow}
            disabled={processing}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Ticket size={19} />
            {processing ? "Confirming booking..." : `Pay ${money(total)} Now`}
          </button>
        </section>

        <aside className="surface rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold">Booking summary</h2>

          <div className="mt-5 border-b border-slate-200 pb-4">
            <p className="text-lg font-extrabold">{selectedBus.name || selectedBus.busName || selectedBus.operator}</p>
            <p className="mt-1 text-sm text-slate-500">{selectedBus.type}</p>
            <p className="mt-3 font-bold">{search.from} → {search.to}</p>
            <p className="mt-1 text-sm text-slate-500">{formatDate(search.date)}</p>
            <p className="mt-1 text-sm text-slate-500">{selectedBus.departure} – {selectedBus.arrival}</p>
          </div>

          <div className="space-y-3 border-b border-slate-200 py-4 text-sm">
            <div className="flex justify-between gap-3"><span className="text-slate-500">Seats</span><span className="font-bold">{seats.join(", ")}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Passengers</span><span className="font-bold">{passengers.length}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Payment</span><span className="font-bold">{method}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Boarding</span><span className="max-w-[60%] text-right font-bold">{boarding}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Dropping</span><span className="max-w-[60%] text-right font-bold">{dropping}</span></div>
            <div className="flex justify-between gap-3"><span className="text-slate-500">Contact</span><span className="max-w-[60%] break-words text-right font-bold">{contact.email}</span></div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4">
            <span className="font-bold">Total amount</span>
            <span className="text-2xl font-black text-orange-500">{money(total)}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">Final amount for this demo booking. No actual payment is processed.</p>
        </aside>
      </div>
    </main>
  );
}
