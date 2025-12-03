import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Members from "./sections/MemberSection";
import FloatingMessageButton from "./components/FloatingMessageButton";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

// ADD THESE TWO IMPORTS
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ForgotPassword from "./admin/ForgotPassword";
import ResetPassword from "./admin/ResetPassword";

export default function App() {
  const ProtectedRoute = ({ children }) => {
    // check the token that AdminLogin stores
    const isAuth = !!localStorage.getItem("adminToken");
    return isAuth ? children : <Navigate to="/admin" />;
  };

  return (
    <Router>
      <div className="bg-blue-950 text-gray-900 font-inter">
        <Routes>
          {/* Redirect bare /admin to the login page so routes like /admin work */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          {/* PUBLIC WEBSITE ROUTE */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Services />
                <Members />
                <FloatingMessageButton />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* ADMIN LOGIN PAGE */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot" element={<ForgotPassword />} />
          <Route path="/admin/reset" element={<ResetPassword />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
