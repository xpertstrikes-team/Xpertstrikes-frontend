import { Helmet } from "react-helmet";

<Helmet>
  <title>Contact XpertStrikes</title>
  <meta name="description" content="Get in touch with XpertStrikes for SaaS solutions, development projects, and IT services. We respond within 24 hours." />
  <meta name="keywords" content="contact XpertStrikes, SaaS company contact, IT service support" />
</Helmet>

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // inside Contact.jsx component
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
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
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      // success UI
      alert(data.message || "Submitted successfully");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit form. Try again.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-16 py-24 bg-transparent relative"
    >
      {/* ✨ Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/40 blur-3xl -z-10"></div>

      {/* 🏢 Left: Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass p-8 md:p-10 rounded-2xl flex-1 text-center md:text-left"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-300">
          Get in <span className="text-blue-500">Touch</span>
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          We'd love to hear from you! Whether you’re looking for a service,
          partnership, or just have a question — we’re here.
        </p>

        <div className="space-y-4 text-gray-200">
          <p className="flex items-center gap-3">
            <FaEnvelope className="text-blue-400" /> Xpertstrikes@gmail.com
          </p>
          <p className="flex items-center gap-3">
            <FaPhoneAlt className="text-blue-400" /> +91 80154 09798
          </p>
          <p className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-400" /> Chennai, India
          </p>
        </div>

        <div className="flex gap-5 mt-8 justify-center md:justify-start">
          <a
            href="https://www.linkedin.com/in/mr-narasimma"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-white text-2xl transition-all duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/xpertstrikes?igsh=MTZwbHd6dDBzNHhlZg=="
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-white text-2xl transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/xpertstrikes-team"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-white text-2xl transition-all duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </motion.div>

      {/* 📩 Right: Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass p-8 md:p-10 rounded-2xl flex-1 w-full max-w-lg shadow-2xl"
      >
        <h3 className="text-3xl font-semibold mb-6 text-blue-300 text-center">
          Contact Us
        </h3>

        <div className="grid text-gray-300 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid text-gray-300 md:grid-cols-2 gap-4 mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-transparent border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-transparent border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 text-gray-400"
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
          name="message"
          placeholder="Write your requirements..."
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
          className="w-full p-3 mt-4 rounded-lg bg-transparent border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-300"
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:scale-105"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
