import React from "react";

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

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
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name of Person"
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="text"
            placeholder="Name of Company"
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="email"
            placeholder="Email ID"
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="text"
            value={service.title}
            readOnly
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <textarea
            placeholder="Tell us about your company & requirements..."
            rows="3"
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
