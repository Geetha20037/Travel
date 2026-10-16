
import { useState } from "react";
import { ArrowRight, BusFront, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(location.state?.from || "/profile", { replace: true });
  }

  return (
    <main className="page-container flex min-h-[75vh] items-center justify-center py-12">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-[#101c3a] p-10 text-white md:flex">
          <Link to="/" className="flex items-center gap-2 text-xl font-black"><BusFront className="text-orange-400" /> VOYA<span className="text-orange-400">BUS</span></Link>
          <div>
            <h1 className="text-4xl font-black leading-tight">Your next journey is closer than you think.</h1>
            <p className="mt-4 leading-7 text-blue-200">Sign in to continue your booking experience and view your trip details.</p>
          </div>
          <p className="text-xs text-blue-200">VOYABUS · Travel your way</p>
        </div>

        <form onSubmit={submit} className="p-6 sm:p-10">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 md:hidden"><BusFront size={26} /></div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">Welcome back</p>
          <h2 className="mt-2 text-3xl font-black">Log in</h2>
          <p className="muted mt-2 text-sm text-slate-500">Enter your details to continue.</p>

          <label className="mt-7 block text-sm font-bold">Email address
            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-orange-400"><Mail size={18} className="text-slate-400" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full py-3.5 outline-none" /></span>
          </label>

          <label className="mt-5 block text-sm font-bold">Password
            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-orange-400"><LockKeyhole size={18} className="text-slate-400" /><input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full py-3.5 outline-none" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span>
          </label>

          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <button className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600">Log in <ArrowRight className="ml-2 inline" size={17} /></button>
          <p className="muted mt-6 text-center text-sm text-slate-500">New to VOYABUS? <Link to="/signup" className="font-bold text-orange-500">Create an account</Link></p>
          <p className="mt-5 text-center text-xs text-slate-400">Demo authentication only. Do not use a real password.</p>
        </form>
      </div>
    </main>
  );
}
