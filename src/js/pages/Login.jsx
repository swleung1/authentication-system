import { useState } from "react";
import { API } from "../config";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setToken, setUser } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const d = await res.json();
    if (!res.ok) return setErr(d.msg || "Login failed");
    setToken(d.access_token);
    setUser(d.user);
    nav("/private");
  };
  return (
    <form onSubmit={submit} style={{ maxWidth: 380, margin: "2rem auto" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <button type="submit">Login</button>
      <p>
        No account? <Link to="/signup">Create one</Link>
      </p>
    </form>
  );
}
