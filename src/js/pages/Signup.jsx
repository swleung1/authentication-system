import { useState } from "react";
import { API } from "../config";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 201) nav("/login");
    else {
      const d = await res.json();
      setErr(d.msg || "Signup failed");
    }
  };
  return (
    <form onSubmit={submit} style={{ maxWidth: 380, margin: "2rem auto" }}>
      <h2>Signup</h2>
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
      <button type="submit">Create account</button>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

const submit = async (e) => {
  e.preventDefault();
  setErr("");
  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    console.log("SIGNUP", res.status, data);

    if (res.status === 201) return nav("/login");
    setErr(data.msg || data.raw || "Signup failed");
  } catch (err) {
    console.error("Network error", err);
    setErr("Network error");
  }
};
