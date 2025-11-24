import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

export default function App() {
  return (
    <Router>
      <div className="bg-blue-950 text-gray-900 font-inter">
        <Routes>
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
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
