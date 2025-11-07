import React from "react";
import Hyperspeed from "./Hyperspeed";
import { GlobeDemo } from "../Globedemo";
import Navbar from "../Navbar";
import LiquidChrome from "../bg/LiquidCrome";

const Custombg = () => {
  return (
    <div className="relative h-screen w-full bg-gray-400 flex items-center justify-center overflow-hidden m-0 p-0">
      {/* Hyperspeed Background */}
      {/* <div className="bg-linear-to-r from-blue-900 to-gray-600 h-full w-full"></div> */}
      <LiquidChrome
        baseColor={[0, 0, 0.05]}
        speed={0.1}
        amplitude={0.1}
        interactive={true}
      />

      {/* Navbar */}
      <Navbar />

      {/* Top Section with Globe */}
      <div className="first absolute top-7 w-[97%] h-[60%] bg-blue-900/60 backdrop-blur-2xl drop-shadow-2xl rounded-xl overflow-hidden">
        <div className="absolute left-0 w-1/3 h-[95%] flex items-center justify-center">
          <div className="hidden lg:block absolute inset-0">
            <GlobeDemo />
          </div>
        </div>

        <div className="absolute right-0 w-1/2 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-4">
              Welcome to the Future
            </h1>
            <p className="text-white/80 text-xl">
              Explore the interactive globe
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="second absolute top-[58%] w-[97%] h-[40%] bg-cyan-800 rounded-xl"></div>
    </div>
  );
};

export default Custombg;
