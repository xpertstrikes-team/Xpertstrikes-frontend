import React from "react"; 

import { Helmet } from "react-helmet";

<Helmet>
  <title>XpertStrikes | SaaS Solutions, Web Development & IT Services</title>
  <meta name="description" content="XpertStrikes offers SaaS solutions, Web Development, Mobile Apps, UI/UX Design, Automation, and IT services with modern cloud technologies." />
  <meta name="keywords" content="XpertStrikes, SaaS, web development, mobile app development, IT company, software services, India SaaS startup" />
</Helmet>

// 🔹 Add your video file here

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* 🎥 Background Video */}
      <video
        src="https://cdn.pixabay.com/video/2016/09/06/4968-181688475_tiny.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      />

      {/* 🌫️ Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blue-900/40 to-slate-900/60"></div>

      {/* ✨ Hero Content */}
      <div className="relative z-10 glass p-8 md:p-12 max-w-3xl text-center fade-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-300 mb-4 drop-shadow-lg">
          Empowering SaaS Innovation
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
          XpertStrikes helps you build, deploy, and scale your digital products
          with smart AI-powered solutions.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:scale-105"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default Hero;
