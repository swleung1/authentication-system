import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <Link to="/">Home</Link>
      <span style={{ float: "right" }}>
        {!token ? (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </span>
    </nav>
  );
}
