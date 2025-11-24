import React, { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.requirements, // 🔥 FIXED
    };

    try {
      const res = await fetch(
        "https://xpertstrikes-backend-f4fj.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      alert("Message sent successfully!");
      setIsOpen(false);

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        requirements: "",
      });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        Message Us
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name} // FIXED
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company} // FIXED
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="service"
                placeholder="Service (Optional)"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <textarea
                name="requirements"
                placeholder="Your Message"
                value={formData.requirements}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded h-24"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Send Message
              </button>
            </form>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-red-500 mt-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
