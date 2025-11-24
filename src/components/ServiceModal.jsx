import React, { useState } from "react";

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: service.title,
    requirements: "",
  });

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

      alert("Your request has been sent!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass w-[90%] max-w-lg p-6 rounded-2xl relative border border-blue-500/30 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl hover:text-blue-400"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-blue-400 mb-2">{service.title}</h2>
        <p className="text-gray-200 mb-2">{service.fullDesc}</p>
        <p className="text-sm text-blue-300 mb-4">Handled by: {service.handledBy}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name of Person" required className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"/>
          <input name="company" value={formData.company} onChange={handleChange} placeholder="Name of Company" className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"/>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email ID" type="email" required className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"/>
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"/>

          <input value={service.title} readOnly className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"/>

          <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Tell us about your company & requirements..." rows="3" className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"></textarea>

          <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-all duration-300">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
