import { Helmet } from "react-helmet";

<Helmet>
  <title>Our Services | XpertStrikes</title>
  <meta name="description" content="Explore XpertStrikes services: Web development, UI/UX design, Video editing, Graphic design, Cloud integration, Data analytics, and Mobile development." />
  <meta name="keywords" content="XpertStrikes services, web development services, UI/UX design, mobile app services, SaaS services" />
</Helmet>

import React, { useState } from "react";
import servicesData from "../data/servicesData";
import ServiceModal from "../components/ServiceModal";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 px-6 md:px-16 bg-transparent relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-blue-950/40 blur-3xl -z-10"></div>

      <h2 className="text-center text-4xl font-extrabold text-blue-300 mb-4 drop-shadow-lg">
        Our Services
      </h2>
      <p className="text-center text-gray-300 mb-12 text-lg">
        Empowering businesses through smart and scalable digital solutions.
      </p>

      {/* Service Cards Grid */}
      <ScrollAnimationWrapper direction="up" delay={0}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-500 hover:border-blue-400 shadow-lg cursor-pointer flex flex-col items-center text-center"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-64 h-32 object-cover rounded-xl mb-4 border border-blue-500/20"
            />
            <h3 className="text-2xl font-bold text-blue-400 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-300 mb-4">{service.shortDesc}</p>
            <button
              onClick={() => setSelectedService(service)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View More
            </button>
          </div>
        ))}
      </div>
      </ScrollAnimationWrapper>

      {/* Modal Popup */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default Services;
