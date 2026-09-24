import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Dashboard from "./pages/bidding/Dashboard";
import BiddingDashboard from "./pages/bidding/BiddingDashboard";
import ManageBidding from "./pages/bidding/ManageBidding";
import ManageMembers from "./pages/bidding/ManageMembers";
import AdminBidRounds from "./pages/bidding/AdminBidRounds";
import PaymentVerification from "./pages/bidding/PaymentVerification";
import ParticipantRegistration from "./pages/participant/ParticipantRegistration";
import Login from "./pages/Login";
import Register from "./pages/Register";

const API_URL = "http://localhost:3000/api/v1";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const location = useLocation();

  // ==========================================
  // CHECK LOGIN
  // ==========================================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/user/auth/me`, {
          credentials: "include",
        });

        const data = await response.json();

        setIsLoggedIn(data.success === true);
      } catch (error) {
        console.error("Auth check error:", error);

        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/user/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggedIn(false);
    }
  };

  // ==========================================
  // AUTH LOADING
  // ==========================================

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // ==========================================
  // HIDE NAVBAR
  // ==========================================

  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/bidding-dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}

      {!hideNavbar && (
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}

      {/* MAIN */}

      <main className="flex-1">
        <Routes>
          {/* ==================================
              HOME
          ================================== */}

          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

          {/* ==================================
              ABOUT
          ================================== */}

          <Route path="/about" element={<About />} />

          {/* ==================================
              CONTACT
          ================================== */}

          <Route path="/contact" element={<Contact />} />

          {/* ==================================
              LOGIN
          ================================== */}

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLoginSuccess={() => setIsLoggedIn(true)} />
              )
            }
          />

          {/* ==================================
              REGISTER
          ================================== */}

          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
          />

          {/* ==================================
              MAIN DASHBOARD
          ================================== */}

          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* ==================================
              BIDDING DASHBOARD
          ================================== */}

          <Route
            path="/bidding-dashboard"
            element={
              isLoggedIn ? (
                <BiddingDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ==================================
              MANAGE BIDDING
          ================================== */}

          <Route
            path="/bidding-dashboard/manage/:id"
            element={
              isLoggedIn ? <ManageBidding /> : <Navigate to="/login" replace />
            }
          />

          {/* ==================================
              MANAGE MEMBERS
          ================================== */}

          <Route
            path="/bidding-dashboard/manage/:id/members"
            element={
              isLoggedIn ? <ManageMembers /> : <Navigate to="/login" replace />
            }
          />

          {/* ==================================
              ADMIN BID ROUNDS
          ================================== */}

          <Route
            path="/bidding-dashboard/manage/:id/admin"
            element={
              isLoggedIn ? <AdminBidRounds /> : <Navigate to="/login" replace />
            }
          />

          {/* ==================================
              PAYMENT VERIFICATION
              OUTSIDE ADMIN PANEL
          ================================== */}

          <Route
            path="/bidding-dashboard/manage/:id/payments"
            element={
              isLoggedIn ? (
                <PaymentVerification />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/register/:bidCode"
            element={<ParticipantRegistration />}
          />

          {/* ==================================
              FALLBACK
          ================================== */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* FOOTER */}

      <Footer />
    </div>
  );
}

export default App;
