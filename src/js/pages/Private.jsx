import { useEffect, useState } from "react";
import { API } from "../config";
import { useAuth } from "../context/AuthContext";
export default function Private() {
  const { token, user } = useAuth();
  const [msg, setMsg] = useState("Loading...");
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/private`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await res.json();
      setMsg(
        res.ok ? `${d.message} (as ${d.user.email})` : d.msg || "Unauthorized"
      );
    })();
  }, [token]);
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Private</h2>
      <p>{msg}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
