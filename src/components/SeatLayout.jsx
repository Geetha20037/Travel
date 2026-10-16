
import { Armchair, CircleDot } from "lucide-react";

const unavailable = new Set([3, 8, 12, 19, 25, 31]);

export default function SeatLayout({ seats, setSeats, price }) {
  const rows = Array.from({ length: 8 }, (_, i) => i);

  function toggleSeat(number) {
    if (unavailable.has(number)) return;

    setSeats((current) =>
      current.includes(number)
        ? current.filter((seat) => seat !== number)
        : [...current, number].sort((a, b) => a - b)
    );
  }

  return (
    <div className="surface rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">Choose your seats</h3>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><i className="h-3 w-3 rounded border border-slate-300 bg-white" /> Available</span>
          <span className="flex items-center gap-1"><i className="h-3 w-3 rounded bg-orange-500" /> Selected</span>
          <span className="flex items-center gap-1"><i className="h-3 w-3 rounded bg-slate-300" /> Booked</span>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[340px] rounded-[28px] border-2 border-slate-200 p-3 sm:p-5">
        <div className="mb-5 flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Front of bus</span>
          <CircleDot size={23} className="text-slate-500" />
        </div>

        <div className="space-y-3">
          {rows.map((row) => {
            const left = row * 4 + 1;
            const right = row * 4 + 2;
            const aisle = row * 4 + 3;
            const last = row * 4 + 4;

            return (
              <div key={row} className="grid grid-cols-[1fr_1fr_20px_1fr_1fr] items-center gap-2">
                {[left, right].map((number) => (
                  <Seat
                    key={number}
                    number={number}
                    selected={seats.includes(number)}
                    booked={unavailable.has(number)}
                    onClick={() => toggleSeat(number)}
                    price={price}
                  />
                ))}
                <span />
                {[aisle, last].map((number) => (
                  <Seat
                    key={number}
                    number={number}
                    selected={seats.includes(number)}
                    booked={unavailable.has(number)}
                    onClick={() => toggleSeat(number)}
                    price={price}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs text-slate-400">Illustrative 2 Ã— 2 seat layout Â· Select your preferred seats</p>
      </div>
    </div>
  );
}

function Seat({ number, selected, booked, onClick, price }) {
  return (
    <button
      disabled={booked}
      onClick={onClick}
      title={booked ? "Already booked" : `Seat ${number} Â· â‚¹${price}`}
      aria-label={`Seat ${number}${booked ? ", unavailable" : selected ? ", selected" : ", available"}`}
      className={`flex min-h-[54px] flex-col items-center justify-center rounded-xl border transition ${
        booked
          ? "cursor-not-allowed border-slate-300 bg-slate-200 text-slate-400"
          : selected
            ? "border-orange-600 bg-orange-500 text-white shadow-md shadow-orange-500/25"
            : "border-slate-300 bg-white text-slate-700 hover:border-orange-400 hover:bg-orange-50"
      }`}
    >
      <Armchair size={18} />
      <span className="mt-0.5 text-[10px] font-bold">{number}</span>
    </button>
  );
}

