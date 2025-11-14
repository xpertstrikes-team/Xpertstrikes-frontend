import React from "react";
import aboutImg from "../assets/hero12.jpg";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-16 py-24 relative overflow-hidden"
    >
      {/* ✨ Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/40 blur-3xl -z-10"></div>

      {/* 📝 Left Content */}
      <ScrollAnimationWrapper direction="left" delay={0}>
        <div className="flex-1 glass p-8 md:p-12 fade-up rounded-2xl shadow-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-300 drop-shadow-lg">
            About <span className="text-blue-500">XpertStrikes</span>
          </h2>

          <p className="text-gray-200 text-lg leading-relaxed mb-4">
            At <span className="text-blue-400 font-semibold">XpertStrikes</span>
            , we are a passionate team dedicated to redefining SaaS innovation.
            Our solutions empower startups and enterprises with seamless cloud
            technology, automation, and AI-driven tools.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We believe in simplicity, scalability, and smart design — delivering
            solutions that grow with your business and keep you ahead of the
            curve.
          </p>

          <a
            href="#services"
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-white text-white hover:text-blue-500 
                   rounded-xl font-semibold transition-all duration-300 shadow-xl 
                   hover:border hover:border-blue-500 hover:scale-110"
          >
            Learn More
          </a>
        </div>
      </ScrollAnimationWrapper>

      {/* 🖼️ Right Image */}
      <ScrollAnimationWrapper direction="right" delay={0.3}>
        <div className="flex-1 flex justify-center fade-up">
          <img
            src={aboutImg}
            alt="About XpertStrikes"
            className="w-full max-w-[550px] rounded-2xl shadow-2xl glass p-2 
                     hover:scale-105 transition-transform duration-700"
          />
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default About;
