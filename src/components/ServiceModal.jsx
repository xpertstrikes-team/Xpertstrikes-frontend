const ServiceModal = ({ service, onClose }) => {
  const [form, setForm] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: service?.title || "",
    requirements: "",
  });

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

      if (!res.ok) throw new Error(data.error || "Failed");

      alert("Booking submitted!");
      onClose();
    } catch (err) {
      alert("Failed to submit");
    }
  };

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass w-[90%] max-w-lg p-6 rounded-2xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl">&times;</button>

        <h2 className="text-3xl font-bold text-blue-400 mb-2">{service.title}</h2>
        <p className="text-gray-200 mb-2">{service.fullDesc}</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input name="name" onChange={handleChange} value={form.name} className="p-2 rounded-lg bg-white/10 border text-white" placeholder="Name" />
          <input name="company" onChange={handleChange} value={form.company} className="p-2 rounded-lg bg-white/10 border text-white" placeholder="Company" />
          <input name="email" onChange={handleChange} value={form.email} className="p-2 rounded-lg bg-white/10 border text-white" placeholder="Email" />
          <input name="phone" onChange={handleChange} value={form.phone} className="p-2 rounded-lg bg-white/10 border text-white" placeholder="Phone" />
          <input name="service" value={service.title} readOnly className="p-2 rounded-lg bg-white/10 border text-white" />
          <textarea name="requirements" onChange={handleChange} value={form.requirements} className="p-2 rounded-lg bg-white/10 border text-white" placeholder="Requirements..." />

          <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg">Book Now</button>
        </form>
      </div>
    </div>
  );
};
export default ServiceModal;