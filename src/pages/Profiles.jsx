/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import LiquidChrome from "../components/bg/LiquidCrome";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profiles = ({ onProfileSelect = null }) => {
  const navigate = useNavigate();
  const canvasRefs = useRef([]);

  const profiles = [
    {
      id: "game-dev",
      title: "Game Developer",
      icon: "🎮",
      description: "Discover games, mechanics, and experiences brought to life through Unity.",
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
      particleColor: "rgba(168, 85, 247, 0.8)",
      route: "/gamedev",
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      icon: "💻",
      description: "Discover innovative web solutions built from front to back with precision.",
      color: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.5)",
      particleColor: "rgba(59, 130, 246, 0.8)",
      route: "/fullstack",
    },
  ];

  const handleProfileSelect = (profile) => {
    if (onProfileSelect) {
      onProfileSelect(profile.id);
    }
    navigate(profile.route);
  };

  useEffect(() => {
    const resizeCanvases = () => {
      canvasRefs.current.forEach((canvas, index) => {
        if (!canvas) return;
        
        const container = canvas.parentElement;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const profile = profiles[index];
        
        // Clear existing particles and create new ones
        for (let i = 0; i < 12; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            color: profile.particleColor,
          });
        }

        const animate = () => {
          if (!canvas) return;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });
          
          requestAnimationFrame(animate);
        };
        
        animate();
      });
    };

    // Initial setup
    resizeCanvases();

    // Add resize listener
    window.addEventListener('resize', resizeCanvases);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvases);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  // Mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <LiquidChrome
          baseColor={[0.1, 0.0, 0.1]}
          speed={0.2}
          amplitude={0.4}
          interactive={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 font-creepy bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(168, 85, 247, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.8)",
                "0 0 10px rgba(168, 85, 247, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Boot Into Mode
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-mono px-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            █▓▒░ Enter the realm of creation ░▒▓█
          </motion.p>
        </motion.div>

        {/* Profile Cards Container */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center justify-center w-full max-w-6xl px-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              variants={itemVariants}
              whileHover={{ 
                scale: isMobile ? 1.02 : 1.05,
                y: isMobile ? -5 : -10,
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 w-full max-w-sm sm:max-w-md cursor-pointer group relative"
              onClick={() => handleProfileSelect(profile)}
            >
              {/* Canvas for particle effects */}
              {/* <canvas
                ref={el => canvasRefs.current[index] = el}
                className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[40px] pointer-events-none"
              /> */}
              
              {/* Main Card */}
              <div 
                className="relative p-4 sm:p-6 md:p-8 h-[380px] sm:h-[420px] md:h-[500px] flex flex-col items-center justify-center text-center 
                          border-2 border-white/20 backdrop-blur-xl bg-black/60 
                          transition-all duration-500 group-hover:border-white/40 
                          group-hover:bg-black/80 overflow-hidden"
                style={{
                  clipPath: isMobile 
                    ? `polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)`
                    : `polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)`,
                  boxShadow: `
                    0 0 20px ${profile.glowColor},
                    inset 0 0 20px rgba(255, 255, 255, 0.05)
                  `
                }}
              >
                
                
                
                
                {/* Icon */}
                <motion.div
                  className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 md:mb-8 relative z-10 filter drop-shadow-lg"
                  whileHover={{ 
                    scale: isMobile ? 1.1 : 1.2,
                    rotate: isMobile ? [0, -3, 3, 0] : [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                  animate={{
                    y: [0, -5, 0],
                    filter: [
                      "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                      "drop-shadow(0 0 15px currentColor)",
                      "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {profile.icon}
                </motion.div>

                {/* Title */}
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold font-creepy text-white mb-3 sm:mb-4 md:mb-6 relative z-10 uppercase tracking-wide"
                  whileHover={!isMobile ? {
                    x: [0, -2, 2, -2, 2, 0],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  {profile.title}
                  {!isMobile && (
                    <motion.span 
                      className="absolute inset-0 text-red-400 opacity-0 group-hover:opacity-30"
                      animate={{ x: [0, 2, -2, 0] }}
                      transition={{ duration: 0.1, repeat: 3 }}
                    >
                      {profile.title}
                    </motion.span>
                  )}
                </motion.h2>

                {/* Description */}
                <motion.p 
                  className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 relative z-10 font-mono max-w-xs sm:max-w-sm px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                >
                  {profile.description}
                </motion.p>

                {/* Button */}
                <motion.div
                  className={`relative px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-full bg-linear-to-r ${profile.color} text-white font-bold font-mono uppercase tracking-wider overflow-hidden group/btn border border-white/30 text-xs sm:text-sm md:text-base`}
                  whileHover={{ 
                    scale: isMobile ? 1.05 : 1.08,
                    boxShadow: `0 0 20px ${profile.glowColor}`
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: [
                      `0 0 15px ${profile.glowColor}`,
                      `0 0 25px ${profile.glowColor}`,
                      `0 0 15px ${profile.glowColor}`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Button Scan Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    ENTER REALM 
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.div>

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-l border-t border-white/50 group-hover:border-white transition-colors duration-300" />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-r border-t border-white/50 group-hover:border-white transition-colors duration-300" />
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-l border-b border-white/50 group-hover:border-white transition-colors duration-300" />
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-r border-b border-white/50 group-hover:border-white transition-colors duration-300" />
              </div>

              {/* Hover Pulse Effect - Only on desktop */}
              {!isMobile && (
                <motion.div 
                  className="absolute inset-0 rounded-[30px] sm:rounded-[40px] border-2 border-transparent pointer-events-none"
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${profile.glowColor}`,
                      `0 0 0 8px transparent`,
                      `0 0 0 0 ${profile.glowColor}`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-gray-400 text-xs sm:text-sm font-mono tracking-wider">
            [ Select a gateway to begin your journey ]
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
        
        .font-creepy {
          font-family: 'Creepster', cursive;
          letter-spacing: 1px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .font-creepy {
            letter-spacing: 0.5px;
          }
        }
      `}</style>
    </div>
  );
};

export default Profiles;