/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlobeDemo } from "../Globedemo";
import Navbar from "../Navbar";
import LiquidChrome from "../bg/LiquidCrome";
import RotatingText from "../text/Rotatingtext";
import emailjs from "@emailjs/browser";
import "../../css/Custombg.css";

const Custombg = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 4000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_rqqgcjq",
        "template_vcczbnb",
        e.target,
        "TASXWRDBxS5N39b1y"
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSending(false);
          showNotification("Message sent successfully!", "success");
          setShowContactModal(false);
        },
        (error) => {
          console.log(error.text);
          setIsSending(false);
          showNotification("Oops! Something went wrong. Please try again.", "error");
        }
      );

    e.target.reset();
  };

  return (
    <div className="custombg-container">
      <LiquidChrome baseColor={[0, 0, 0.05]} speed={0.1} amplitude={0.1} interactive={true} />
      <Navbar />

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <div className="flex items-center gap-3">
            {notification.type === "success" ? (
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* First Section */}
      <div className="first-section first">
        <div className="first-section-container">
          <div className="first-section-text">
            <h1>
              Hi, I'm Rohan
              <span className="rotating-text">
                <RotatingText
                  texts={["Unity3D", "Unreal Engine", "C#", "C++", "Blender", "Mixamo", "2D Games", "3D Games", "Level Design"]}
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </h1>
            <p className="first-section-desc">
              Creative Game Developer skilled in building immersive 2D and 3D experiences using Unity, Blender, and Mixamo. Experienced in developing games like <span className="font-semibold text-red-500">The Heist Sprint</span> (reflex-based mini-game) and <span className="font-semibold text-red-500">The Timber Curse</span> (psychological survival horror). Strong background in C#, C++, and Java with solid problem-solving and algorithmic skills, blending technical precision with engaging gameplay design.
            </p>
          </div>
        </div>

        <div className="buttons-container">
          <button
            onClick={() => (window.location.href = "/")}
            className="switch-profile-btn"
          >
            Switch Profile
          </button>

          <a
            href="/Rohan_Dhanerwal_CV.pdf"
            download="Rohan_Dhanerwal_CV.pdf"
            className="download-cv-btn"
          >
            Download CV
          </a>

          <button
            onClick={() => setShowContactModal(true)}
            className="contact-btn"
          >
            Contact Me
          </button>
        </div>

        <div className="globe-container">
          <GlobeDemo />
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="contact-modal-backdrop" onClick={() => setShowContactModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowContactModal(false)}
              className="contact-modal-close"
              disabled={isSending}
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-black">Get In Touch</h2>
              <p className="text-gray-700 text-sm mt-2">I'll get back to you soon</p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="contact-input"
                  required
                  disabled={isSending}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="contact-input"
                  required
                  disabled={isSending}
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="contact-input contact-textarea"
                  required
                  disabled={isSending}
                ></textarea>
              </div>

              <button type="submit" disabled={isSending} className="send-btn">
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-900 text-sm">
                Or email me directly at{" "}
                <span className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer">
                  rohandhanerwal@gmail.com
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="second-section second"></div>
    </div>
  );
};

export default Custombg;
