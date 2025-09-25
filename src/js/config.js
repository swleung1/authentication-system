const API_BASE = (
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3001"
).replace(/\/$/, "");
export const API = `${API_BASE}/api`;

window.__APP_API = API;
console.log("Resolved API (from config):", window.__APP_API);
