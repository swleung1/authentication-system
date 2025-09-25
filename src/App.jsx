import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./js/context/AuthContext.jsx";
import ProtectedRoute from "./js/components/ProtectedRoute.jsx";
import Navbar from "./js/components/Navbar.jsx";
import Login from "./js/pages/Login.jsx";
import Signup from "./js/pages/Signup.jsx";
import Private from "./js/pages/Private.jsx";

const Home = () => <div style={{ padding: 20 }}>Home (Public) — it works!</div>;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <Private />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
