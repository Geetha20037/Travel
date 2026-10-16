
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import BusDetails from "./pages/BusDetails";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<SearchResults />} />
          <Route path="/bus/:id" element={<BusDetails />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/passengers" element={<PassengerDetails />} />
          <Route path="/payment" element={<Checkout />} />
          <Route path="/confirmation/:id" element={<BookingConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  const [dark, setDark] = useState(() => localStorage.getItem("voyabus-theme") === "dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("voyabus-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className={dark ? "dark-mode" : "min-h-screen bg-[#f7f8fc] text-slate-900"}>
      {loading && <LoadingScreen />}
      <Navbar dark={dark} toggleTheme={() => setDark((previous) => !previous)} />
      <div className="pt-[72px]">
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

