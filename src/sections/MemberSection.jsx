import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import member1 from "../assets/narasimma photo.jpg"
import member2 from "../assets/sanjay photo.jpg"
import member3 from "../assets/nimal photo.jpg"
import member4 from "../assets/tamil photo.jpg";

// 🧠 Sample Team Data
const team = [
  {
    id: 1,
    name: "Lakshmi Narasimma",
    role: "Founder & CEO",
    qualification: "B.Tech IT",
    team: "Data Gurus & Team Alpha",
    description:
      "A passionate innovator leading XpertStrikes with a vision to revolutionize SaaS through AI and automation.",
    email: "mrlakshminarasimma@gmail.com",
    phone: "+91 80154 09798",
    image: member1,
  },
  {
    id: 2,
    name: "Sanjay",
    role: "Mobile App Developer",
    qualification: "B.Tech IT",
    team: "App Masters & Wordsmiths",
    description:
      "Expert in MERN stack and backend architecture. Ensures scalable, secure, and fast applications.",
    email: "sanjayashwin18@gmail.com",
    phone: "+91 99622 17696",
    image: member2,
  },
  {
    id: 3,
    name: "Nimalesh",
    role: "Full Stack Developer",
    qualification: "B.Tech IT",
    team: "Team Alpha & Media Team",
    description:
      "Designs seamless digital experiences with a focus on accessibility and visual harmony.",
    email: "rnimales404@gmail.com",
    phone: "+91 63828 49828",
    image: member3,
  },
  {
    id: 4,
    name: "Tamilarasu",
    role: "Data Scientist",
    qualification: "B.Tech IT",
    team: "Data gurus & Media team",
    description:
      "Focuses on model optimization and data-driven intelligence for next-gen business tools.",
    email: "vishalion2311@gmail.com",
    phone: "+91 93612 36616",
    image: member4,
  },
  {
    id: 5,
    name: "Sakthi Shree",
    role: "UI/UX Designer",
    qualification: "B. Tech IT",
    team: "UX Wizard & Design Pros",
    description:
      "Leads creative campaigns and brand growth strategies to expand product reach.",
    email: "divya@xpertstrikes.com",
    phone: "+91 98765 43214",
    image: "",
  },
  {
    id: 6,
    name: "Kumaran",
    role: "Content Writer",
    qualification: "B.Tech IT",
    team: "Wordsmiths & Design Pros",
    description:
      "Creates fast, reliable, and intuitive mobile apps that deliver seamless user experiences.",
    email: "vikram@xpertstrikes.com",
    phone: "+91 98765 43215",
    image: "",
  },
  {
    id: 7,
    name: "Vishnu Pradhap",
    role: "Web Developer",
    qualification: "B. Tech IT",
    team: "Team Alpha & Wordsmiths",
    description:
      "Ensures timely project delivery with strong coordination and process optimization.",
    email: "nisha@xpertstrikes.com",
    phone: "+91 98765 43216",
    image: "",
  },
];

const MembersSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="members"
      className="min-h-screen px-6 md:px-16 py-24 bg-transparent text-center relative"
    >
      {/* ✨ Header */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-4 drop-shadow-lg">
          Our Creative Team
        </h2>
        <p className="text-gray-300 text-lg">
          Meet the talented individuals behind XpertStrikes — innovators,
          designers, and engineers shaping the future.
        </p>
      </div>

      {/* 💎 Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-72 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-400 mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-200">
              {member.name}
            </h3>
            <p className="text-blue-400 mb-4">{member.role}</p>
            <button
              onClick={() => setSelected(member)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 hover:text-blue-900 transition-all duration-300"
            >
              View Profile
            </button>
          </motion.div>
        ))}
      </div>

      {/* 🪩 Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Popup Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-lg w-full relative text-center shadow-2xl">
                {/* ❌ Close Button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-6 text-blue-200 text-2xl hover:text-white"
                >
                  &times;
                </button>

                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-400 mb-4"
                />
                <h3 className="text-2xl font-bold text-blue-300">
                  {selected.name}
                </h3>
                <p className="text-blue-400 mb-2">{selected.role}</p>
                <p className="text-gray-300 text-sm mb-3">
                  🎓 {selected.qualification}
                </p>
                <p className="text-gray-200 mb-3">
                  <strong>Team:</strong> {selected.team}
                </p>
                <p className="text-gray-300 mb-4 italic">
                  "{selected.description}"
                </p>
                <div className="text-gray-400 text-sm mb-3">
                  📧 {selected.email}
                  <br />
                </div>
                <div className="text-gray-400 text-sm mb-3">
                  📞 {selected.phone}
                </div>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selected.email}&su=Message%20from%20Client%20of%20XpertStrikes&body=Hello%20${selected.name},%0A%0AI%20would%20like%20to%20discuss%20about...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-all duration-300"
                >
                  Contact via Gmail
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MembersSection;
