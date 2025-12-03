import React, { useState } from "react";

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: service.title,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      alert(data.message || "Request submitted");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: service.title,
        message: "",
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass w-[90%] max-w-lg p-6 rounded-2xl relative border border-blue-500/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl hover:text-blue-400"
        >
          &times;
        </button>

        {/* Service Info */}
        <h2 className="text-3xl font-bold text-blue-400 mb-2">
          {service.title}
        </h2>
        <p className="text-gray-200 mb-2">{service.fullDesc}</p>
        <p className="text-sm text-blue-300 mb-4">
          Handled by: {service.handledBy}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name of Person"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="text"
            name="company"
            placeholder="Name of Company"
            value={formData.company}
            onChange={handleChange}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="text"
            name="service"
            value={formData.service}
            readOnly
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <textarea
            name="message"
            placeholder="Tell us about your company & requirements..."
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
