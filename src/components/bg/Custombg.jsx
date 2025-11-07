/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { GlobeDemo } from "../Globedemo";
import Navbar from "../Navbar";
import LiquidChrome from "../bg/LiquidCrome";

const Custombg = () => {
  const profileType = "game-dev";

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-950 m-0 p-0">
      {/* Dynamic Liquid Background */}
      <LiquidChrome
        baseColor={[0, 0, 0.05]}
        speed={0.1}
        amplitude={0.1}
        interactive={true}
      />
      {/* Navbar */}
      <Navbar />
      {/* Top Section */}(
      <div className="first absolute top-7 w-[97%] h-auto lg:h-[60%] bg-white/10 backdrop-blur-2xl rounded-2xl drop-shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-centre  py-10">
        {/* 🌍 LEFT: Globe */}
        <div className="hidden lg:flex w-1/3 h-[97%] relative top-0 left-0 ">
          <div className="absolute inset-0">
            <GlobeDemo />
          </div>
        </div>

        {/* 🎛️ MIDDLE: Buttons */}
        <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-1/3 my-6 lg:my-10">
          {/* 🔄 Switch Profile Button */}
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full max-w-xs px-8 py-4 text-lg font-semibold rounded-full bg-linear-to-r from-gray-100 to-gray-300 text-gray-900 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            Switch Profile
          </button>

          {/* 📄 Download Resume Button */}
          <a
            href="/Rohan_Dhanerwal_CV.pdf" // ← Ensure this file exists in /public
            download="Rohan_Dhanerwal_CV.pdf"
            className="w-full max-w-xs px-8 py-4 text-lg font-semibold rounded-full border-2 border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-900 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all duration-300 text-center"
          >
            Download CV
          </a>
        </div>

        {/* 👤 RIGHT: Profile Info */}
        <div className="container sm:px-6 lg:px-10 pt-10 z-10 relative flex justify-center lg:justify-end items-center w-full lg:w-1/2">
          <div className="max-w-xl text-center lg:text-right">
            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Hi, I'm{" "}
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-white">
                Rohan
              </span>
              <span className="text-base sm:text-2xl md:text-3xl font-medium mt-3 block text-gray-200">
                Game Developer & Creative Coder
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed bg-gray-900/30 p-5 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-200/10 shadow-[0_4px_20px_rgba(255,255,255,0.05)]">
              Creative Game Developer skilled in building immersive 2D and 3D
              experiences using Unity and Blender. Experienced in developing
              games like{" "}
              <span className="text-gray-100 font-semibold">
                The Heist Sprint
              </span>{" "}
              and{" "}
              <span className="text-gray-100 font-semibold">
                The Timber Curse
              </span>
              . Strong background in C#, C++, and Java with problem-solving and
              algorithmic skills, blending technical precision with engaging
              gameplay design.
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="second absolute top-[58%] w-[97%] h-[40%] bg-cyan-800/70 rounded-2xl backdrop-blur-md"></div>
      {/* Gradient Animation */}
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 5s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Responsive fine-tuning */
        @media (max-width: 1024px) {
          .first {
            flex-direction: column;
            text-align: center;
          }
          .container {
            justify-content: center !important;
          }
          .max-w-3xl {
            text-align: center !important;
          }
          .flex-wrap {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Custombg;
