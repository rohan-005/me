/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeDemo } from "../components/Globedemo";
import LiquidChrome from "../components/bg/LiquidCrome";

const Profiles = ({ onProfileSelect = null }) => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const profiles = [
    {
      id: "game-dev",
      title: "Game Developer",
      subtitle: "Create Worlds. Shape Experiences.",
      color: "from-indigo-500 to-purple-500",
      route: "/gamedev",
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      subtitle: "Build. Deploy. Scale.",
      color: "from-blue-500 to-cyan-500",
      route: "/fullstack",
    },
  ];

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setShowTransition(true);
    setTimeout(() => {
      if (onProfileSelect) onProfileSelect(profile.id);
      navigate(profile.route);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-900 to-gray-600 relative overflow-hidden flex flex-col items-center justify-center text-center px-4 py-10 text-gray-900">
    
      <AnimatePresence>
        {!showTransition && !isMobile ? (
          <motion.div
            key="centerGlobe"
            className="absolute inset-0 z-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7, scale: 0.7, x: "-33%", y: "-12%" }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          >
            <div className="w-full h-full opacity-70">
              <GlobeDemo />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sideGlobe"
            className="first absolute top-10 w-[97%] h-[60%] bg-gray-900 rounded-xl overflow-hidden flex"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute left-0 w-1/3 h-[95%] flex items-center justify-center"
              initial={{ x: "-20%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.3, ease: "easeOut" }}
            >
              <div className="relative h-full w-full scale-[0.9]">
                <GlobeDemo />
              </div>
            </motion.div>

            <motion.div
              className="absolute right-0 w-1/2 h-full flex items-center justify-center"
              initial={{ x: "30%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.3, ease: "easeOut" }}
            >
              <div className="text-center">
                <h1 className="text-white text-4xl font-bold mb-4 font-audiowide tracking-wider">
                  Welcome to the Future
                </h1>
                <p className="text-white/80 text-xl font-vt323">
                  Initializing{" "}
                  <span className="text-cyan-300">
                    "{selectedProfile?.title}"
                  </span>{" "}
                  mode...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!showTransition && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full">
          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-black text-4xl font-codematrix"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ["0%", "120%"],
                opacity: [0.3, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {
                [
                  "<div>",
                  "{ }",
                  "</>",
                  "=>",
                  "const",
                  "</html>",
                  "();",
                  "<body>",
                  "if()",
                  "while()",
                  "</script>",
                  "<Game />",
                  "</Dev>",
                  "Ghost",
                  "Frosthowl",
                ][Math.floor(Math.random() * 13)]
              }
            </motion.span>
          ))}
        </div>
      )}
      {!showTransition && (
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-5xl sm:text-6xl font-orbitron font-extrabold text-white mb-4 tracking-widest drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Boot Into Mode
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-500 mb-12 font-vt323 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Choose your realm and begin your journey.
          </motion.p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-250 max-w-6xl">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                onClick={() => handleProfileSelect(profile)}
                className="cursor-pointer bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full  p-8 border border-gray-200 hover:border-gray-300 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-400/10 to-transparent opacity-0 group-hover:opacity-100 animate-glow-line" />
                <h2
                  className={`text-3xl font-bold mb-3 bg-linear-to-r ${profile.color} bg-clip-text text-transparent font-audiowide tracking-wide`}
                >
                  {profile.title}
                </h2>
                <p className="text-gray-700 text-base mb-8 font-vt323 tracking-wide">
                  {profile.subtitle}
                </p>
                <motion.button
                  className={`px-6 py-2 rounded-full font-semibold text-white bg-linear-to-r ${profile.color} shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-300 font-orbitron tracking-wider`}
                >
                  Enter
                </motion.button>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-700 text-sm mt-12 font-vt323 tracking-widest">
            [ SELECT A PATH TO CONTINUE ]
          </p>
        </div>
      )}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=VT323&family=Audiowide&family=Share+Tech+Mono&family=Creepster&display=swap");
        .font-orbitron {
          font-family: "Creepster", cursive;
        }
        .font-vt323 {
          font-family: "VT323", monospace;
        }
        .font-audiowide {
          font-family: "Audiowide", cursive;
        }
        .font-codematrix {
          font-family: "Share Tech Mono", monospace;
        }
        @keyframes glow-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-glow-line {
          animation: glow-line 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Profiles;
