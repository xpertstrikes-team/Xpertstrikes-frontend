import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Members from "./sections/MemberSection";
import FloatingMessageButton from "./components/FloatingMessageButton";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="bg-blue-950 text-gray-900 font-inter">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Members />
      <FloatingMessageButton />
      <Contact />
      <Footer />
    </div>
  );
}
