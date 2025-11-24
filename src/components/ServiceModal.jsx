import React, { useState, useEffect } from "react";

const ServiceModal = ({ service, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    requirements: "",
  });

  // Fix: Update form.service only AFTER service is loaded
  useEffect(() => {
    if (service?.title) {
      setForm((prev) => ({ ...prev, service: service.title }));
    }
  }, [service]);

  if (!service) return null; // prevent rendering before data exists

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://xpertstrikes-backend-f4fj.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Booking submitted!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl w-[90%] max-w-lg relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-blue-400 mb-2">
          {service?.title}
        </h2>
        <p className="text-gray-200 mb-4">{service?.fullDesc}</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 rounded bg-white/10 text-white"/>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="p-2 rounded bg-white/10 text-white"/>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 rounded bg-white/10 text-white"/>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-2 rounded bg-white/10 text-white"/>

          <input name="service" value={form.service} readOnly className="p-2 rounded bg-white/10 text-white" />

          <textarea name="requirements" value={form.requirements} onChange={handleChange} placeholder="Requirements..." className="p-2 rounded bg-white/10 text-white"></textarea>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
