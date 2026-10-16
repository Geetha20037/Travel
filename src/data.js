export const cities = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Vijayawada",
  "Visakhapatnam",
  "Tirupati",
  "Mumbai",
  "Pune",
  "Coimbatore",
  "Delhi"
];

export const formatDate = (date) => {
  if (!date) return "Not selected";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not selected";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);

export const buses = [
  {
    id: "VB101",
    operator: "Orange Travels",
    busName: "Orange Premium Sleeper",
    type: "AC Sleeper",
    from: "Hyderabad",
    to: "Bengaluru",
    departure: "21:30",
    arrival: "07:00",
    duration: "9h 30m",
    price: 1199,
    rating: 4.6,
    seatsAvailable: 18,
    amenities: ["Wi-Fi", "Charging Point", "Blanket"]
  },
  {
    id: "VB102",
    operator: "IntrCity SmartBus",
    busName: "IntrCity Smart Sleeper",
    type: "AC Sleeper",
    from: "Hyderabad",
    to: "Bengaluru",
    departure: "22:00",
    arrival: "06:30",
    duration: "8h 30m",
    price: 1399,
    rating: 4.8,
    seatsAvailable: 12,
    amenities: ["Wi-Fi", "Charging Point", "Water Bottle"]
  },
  {
    id: "VB103",
    operator: "Morning Star Travels",
    busName: "Morning Star Multi-Axle",
    type: "AC Seater/Sleeper",
    from: "Hyderabad",
    to: "Chennai",
    departure: "20:00",
    arrival: "06:00",
    duration: "10h",
    price: 999,
    rating: 4.4,
    seatsAvailable: 16,
    amenities: ["Charging Point", "Blanket"]
  },
  {
    id: "VB104",
    operator: "Sri Krishna Travels",
    busName: "Sri Krishna Volvo AC",
    type: "AC Sleeper",
    from: "Bengaluru",
    to: "Chennai",
    departure: "22:15",
    arrival: "05:45",
    duration: "7h 30m",
    price: 1099,
    rating: 4.5,
    seatsAvailable: 14,
    amenities: ["Charging Point", "Water Bottle"]
  },
  {
    id: "VB105",
    operator: "Kaveri Travels",
    busName: "Kaveri Comfort Sleeper",
    type: "AC Sleeper",
    from: "Hyderabad",
    to: "Vijayawada",
    departure: "23:00",
    arrival: "05:00",
    duration: "6h",
    price: 799,
    rating: 4.3,
    seatsAvailable: 20,
    amenities: ["Blanket", "Charging Point"]
  },
  {
    id: "VB106",
    operator: "VRL Travels",
    busName: "VRL Executive Sleeper",
    type: "AC Sleeper",
    from: "Bengaluru",
    to: "Visakhapatnam",
    departure: "18:30",
    arrival: "08:30",
    duration: "14h",
    price: 1599,
    rating: 4.7,
    seatsAvailable: 10,
    amenities: ["Wi-Fi", "Charging Point", "Blanket"]
  }
];

export const popularRoutes = [
  {
    from: "Hyderabad",
    to: "Bengaluru",
    price: 1199,
    duration: "9h 30m"
  },
  {
    from: "Hyderabad",
    to: "Chennai",
    price: 999,
    duration: "10h"
  },
  {
    from: "Bengaluru",
    to: "Chennai",
    price: 1099,
    duration: "7h 30m"
  },
  {
    from: "Hyderabad",
    to: "Vijayawada",
    price: 799,
    duration: "6h"
  }
];
