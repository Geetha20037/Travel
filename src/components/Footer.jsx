import { BusFront, Globe, Mail, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#101c3a] text-white">
      <div className="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-black">
            <BusFront className="text-orange-400" />
            VOYA<span className="text-orange-400">BUS</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
            Find your route, choose your seat and enjoy a simpler way to travel.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-lg bg-white/10 p-2.5 transition hover:bg-orange-500"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-lg bg-white/10 p-2.5 transition hover:bg-orange-500"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link to="/" className="hover:text-orange-300">Home</Link>
            <Link to="/buses" className="hover:text-orange-300">Find buses</Link>
            <Link to="/profile" className="hover:text-orange-300">My bookings</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Need help?</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <a href="mailto:support@voyabus.example" className="flex items-center gap-2 hover:text-orange-300">
              <Mail size={16} /> Email support
            </a>
            <a href="tel:+910000000000" className="flex items-center gap-2 hover:text-orange-300">
              <Phone size={16} /> Contact support
            </a>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} /> Secure booking experience
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Travel with confidence</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Clear fares, seat selection and booking details in one convenient place.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} VOYABUS. Demo booking website for educational use.
      </div>
    </footer>
  );
}
