
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("voyabus-user")) || null;
    } catch {
      return null;
    }
  });

  function login(email, password) {
    if (!email.trim() || !password) {
      return { ok: false, message: "Enter your email and password." };
    }

    const savedUsers = JSON.parse(localStorage.getItem("voyabus-users") || "{}");
    const saved = savedUsers[email.toLowerCase()];

    if (saved && saved.password !== password) {
      return { ok: false, message: "Incorrect password." };
    }

    const nextUser = {
      name: saved?.name || email.split("@")[0],
      email: email.toLowerCase(),
    };

    setUser(nextUser);
    localStorage.setItem("voyabus-user", JSON.stringify(nextUser));
    return { ok: true };
  }

  function signup(name, email, password) {
    const key = email.trim().toLowerCase();

    if (!name.trim() || !key || !password) {
      return { ok: false, message: "Please fill in every field." };
    }

    if (password.length < 6) {
      return { ok: false, message: "Password must contain at least 6 characters." };
    }

    const savedUsers = JSON.parse(localStorage.getItem("voyabus-users") || "{}");

    if (savedUsers[key]) {
      return { ok: false, message: "An account with this email already exists." };
    }

    savedUsers[key] = { name: name.trim(), password };
    localStorage.setItem("voyabus-users", JSON.stringify(savedUsers));

    const nextUser = { name: name.trim(), email: key };
    setUser(nextUser);
    localStorage.setItem("voyabus-user", JSON.stringify(nextUser));

    return { ok: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("voyabus-user");
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
