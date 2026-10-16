
import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

const initialSearch = {
  from: "Hyderabad",
  to: "Bengaluru",
  date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
  passengers: 1,
};

export function BookingProvider({ children }) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [boarding, setBoarding] = useState("");
  const [dropping, setDropping] = useState("");
  const [booking, setBooking] = useState(null);

  function startBooking(bus) {
    setSelectedBus(bus);
    setSeats([]);
    setPassengers([]);
    setBooking(null);
    setBoarding(bus.boarding?.[0] || `${bus.from} Central Bus Station`);
    setDropping(bus.dropping?.[0] || `${bus.to} Central Bus Station`);
  }

  function confirmBooking() {
    const ticket = {
      id: `VY${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      search,
      bus: selectedBus,
      seats: [...seats],
      passengers: [...passengers],
      contact: { ...contact },
      boarding,
      dropping,
      total: seats.length * (selectedBus?.price || 0),
    };

    setBooking(ticket);
    const previous = JSON.parse(localStorage.getItem("voyabus-bookings") || "[]");
    localStorage.setItem("voyabus-bookings", JSON.stringify([ticket, ...previous]));
    return ticket;
  }

  return (
    <BookingContext.Provider
      value={{
        search, setSearch,
        selectedBus, setSelectedBus,
        seats, setSeats,
        passengers, setPassengers,
        contact, setContact,
        boarding, setBoarding,
        dropping, setDropping,
        booking, setBooking,
        startBooking, confirmBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}


