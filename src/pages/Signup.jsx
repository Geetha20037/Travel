
import { useState } from "react";
import { ArrowRight, BusFront, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const result = signup(name, email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/profile");
  }

  return (
    <main className="page-container flex min-h-[75vh] items-center justify-center py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 text-lg font-black"><BusFront className="text-orange-500" /> VOYA<span className="text-orange-500">BUS</span></Link>
        <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">Start travelling</p>
        <h1 className="mt-2 text-3xl font-black">Create your account</h1>
        <p className="muted mt-2 text-sm text-slate-500">A few details and you're ready to explore.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm font-bold">Full name
            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-orange-400"><UserRound size={18} className="text-slate-400" /><input required minLength={2} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full py-3.5 outline-none" /></span>
          </label>
          <label className="block text-sm font-bold">Email address
            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-orange-400"><Mail size={18} className="text-slate-400" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full py-3.5 outline-none" /></span>
          </label>
          <label className="block text-sm font-bold">Password
            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-orange-400"><LockKeyhole size={18} className="text-slate-400" /><input required minLength={6} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full py-3.5 outline-none" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span>
          </label>
          <label className="block text-sm font-bold">Confirm password
            <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3.5 font-normal outline-none focus:border-orange-400" />
          </label>

          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <button className="w-full rounded-xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600">Create account <ArrowRight className="ml-2 inline" size={17} /></button>
        </form>
        <p className="muted mt-6 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-bold text-orange-500">Log in</Link></p>
        <p className="mt-4 text-center text-xs text-slate-400">Educational demo only. Credentials are stored locally in your browser.</p>
      </div>
    </main>
  );
}
