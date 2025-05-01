"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
export default function Home() {
  const sections = [
    { id: "scan", title: "Scan Email", description: "Proactively check your emails to take the very first step in guarding your digital life.", icon: "🪶", img: "/main/magic_feather.png", link: "/scan-email" },
    { id: "detect", title: "Detect Phishing", description: "Spot online traps and strengthen your self-defense in the digital world.", icon: "🔮", img: "/main/crystal_orb.png", link: "/phishing-detection" },
    { id: "learn", title: "Learn Security", description: "Master cyber knowledge and grow into a wise digital citizen.", icon: "📖", img: "/main/guardian_book.png", link: "/learn-security" },
    { id: "quiz", title: "Take a Quiz ", description: "Challenge yourself to test your digital skills and lock in your learning.", icon: "📜", img: "/main/trial_scroll.png", link: "/security-quiz" },
  ];

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "var(--font-sniglet)",
      }}
    >
      <TopNav />

      {/* Cards */}
      <section className="flex-grow pt-20 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 place-items-center">
          {sections.map((section) => (
            <div
              key={section.id}
              className="relative w-64 h-96 cursor-pointer perspective-1000 group"
              onClick={() => (window.location.href = section.link)}
            >
              <motion.div
                className="relative w-full h-full transition-transform duration-[1.5s] transform-style-preserve-3d"
                whileHover={{ rotateY: 180 }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front - Pattern Side (hover will rotate + glow) */}
                <motion.div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg border-4 border-[#5b4636] bg-[url('/textures/rune-circle-bg.png')] bg-cover bg-center overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                  whileHover={{
                    boxShadow: "0 0 20px 10px rgba(255, 255, 200, 0.6)",
                  }}
                >
                  {/* Rune Circle Background Rotation */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 w-90 h-90 bg-center bg-no-repeat bg-contain opacity-60 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      backgroundImage: "url('/textures/rune-circle-removebg.png')",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  />

                  {/* Image */}
                  <div className="text-7xl text-[#d7c49e] z-10">
                    <Image src={section.img} alt={section.title} width={100} height={100} />
                  </div>
                </motion.div>

                {/* Back - Text Side */}
                <div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg bg-[#f3e9d2] border-4 border-[#5b4636] transform rotate-y-180 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Particle Glow */}
                  <motion.div
                    className="absolute w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      background: "radial-gradient(circle at center, rgba(255,255,200,0.5) 0%, rgba(255,255,200,0) 60%)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <h3 className="text-2xl font-semibold mb-2 text-[#5b4636] z-10">{section.title}</h3>
                  <p className="text-md text-[#5b4636] max-w-xs z-10">{section.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex-grow" />
      <Footer />
    </main>
  );
}
