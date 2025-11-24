import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMessageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    requirements: "",
  });

  const toggleForm = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://xpertstrikes-backend-f4fj.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      alert(data.message || "Message sent");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        requirements: "",
      });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleForm}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Contact Form Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 -right-6 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 w-96"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              Message XpertStrikes
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.personName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Service</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Video & Photo Editing">Video & Photo Editing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Mobile App Development">Mobile App Development</option>
              </select>
              <textarea
                name="requirements"
                placeholder="Describe your requirements..."
                rows="3"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
