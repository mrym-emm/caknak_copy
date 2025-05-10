"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "~/components/LanguageSwitcher";

const items = [
  {
    id: "magic_feather",
    label: "Magic Feather",
    message: "TEST your awareness - Enchanted links lead to treacherous paths that steal your secrets",
    img: "/main/magic_feather2_ink.png", 
    position: "left",
    top: "64%",
    text_position: "65%",
  },
  {
    id: "guardian_book",
    label: "Guardian Book",
    message: "EDUCATE yourself on danger - Malicious spells appear as innocent emails and messages",
    img: "/main/guardian_book.png",  
    position: "right",
    top: "73%",
    text_position: "77%",
  },
  {
    id: "crystal_orb",
    label: "Crystal Orb",
    message: "CHECK your defenses - Phishers disguise themselves as helpful guides in the enchanted woods",
    img: "/main/crystal_orb.png", 
    position: "left",
    top: "81%",
    text_position: "85%",
  },
];

export default function LandingPage() {
  const [openedItems, setOpenedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [enteringCastle, setEnteringCastle] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLangSelector, setShowLangSelector] = useState(false);
  
  // Add some ambient particles
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  useEffect(() => {
    setShowLangSelector(true);
    
    // Generate magical particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    if (!openedItems.includes(id)) {
      setOpenedItems([...openedItems, id]);
    }
  };

  const handleCloseDialog = () => {
    setActiveItem(null);
  };

  const handleEnterForest = () => {
    setEnteringCastle(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('/main/forest-background.png')` }}
    >
      {/* Darker overlay for mysterious atmosphere */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: 0.6 - openedItems.length * 0.1 }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-yellow-300 opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top-right language switcher */}
      <div className="absolute right-20 top-3 -mr-16">
        <LanguageSwitcher />
      </div>

      {/* Bottom-right skip button */}
      <motion.button
        whileHover={{
          boxShadow: "0 0 20px 10px rgba(255, 255, 150, 0.6)",
          textShadow: "0px 0px 8px #f5e050",
          y: -5,
          scale: 1.05,
          rotate: [0, 2, -2, 2, 0],
        }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "url('/textures/parchment-texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#5b4636",
          fontFamily: "'Great', cursive",
          fontSize: "24px",
        }}
        className="absolute bottom-10 right-10 z-50 px-6 py-3 rounded-xl shadow-md font-semibold text-lg border-4 border-[#5b4636]"
        onClick={() => (window.location.href = "/home")}
      >
        Skip
      </motion.button>

      {/* Forest Warning Title */}
      {!enteringCastle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/15 left-1/2 -translate-x-1/2 text-center z-20"
          style={{ fontFamily: "var(--font-sniglet)" }}
        >
          {/* Background container for the text */}
          <div 
            className="bg-[#2A2A2A] bg-opacity-75 px-8 py-6 rounded-lg backdrop-blur-sm border border-yellow-700"
            style={{ boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)" }}
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 10px #ffd700",
                  "0 0 20px #ff8c00",
                  "0 0 10px #ffd700",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h1 className="text-5xl font-bold text-yellow-100 drop-shadow-lg">
                Before You Enter the Forest...
              </h1>
            </motion.div>
            
            <p className="text-2xl text-yellow-200 mt-4 max-w-2xl mx-auto">
              Dark magic is spreading through the enchanted woods.
            </p>
            <p className="text-xl text-orange-300 mt-2 max-w-2xl mx-auto">
              Scammers are lurking, disguising traps as gifts and spells.
            </p>
            <p className="text-lg text-yellow-200 mt-4 max-w-2xl mx-auto">
              Identify the dangers before the path to CAKNAK opens.
            </p>
          </div>
        </motion.div>
      )}

      {/* Warning Item icons */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute left-1/2 -translate-x-1/2 cursor-pointer z-10`}
          style={{ top: item.top, left: item.position === "left" ? "45%" : "53%" }}
          whileHover={{ scale: 1.1 }}
          animate={{
            filter: openedItems.includes(item.id)
              ? "drop-shadow(0 0 6px #ff6600)"
              : "drop-shadow(0 0 6px #ff6600)",
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={item.img}
              alt={item.label}
              width={100}
              height={100}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Enter Forest Button appears after all dangers identified */}
      {openedItems.length === items.length && !enteringCastle && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer"
          style={{ top: "40%", left: "50%" }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleEnterForest}
        >
          {/* Enter Forest Button */}
          <motion.button
            whileHover={{
              boxShadow: "0 0 20px 10px rgba(255, 255, 150, 0.6)",
              textShadow: "0px 0px 8px #f5e050",
              y: -5,
              scale: 1.05,
              rotate: [0, 2, -2, 2, 0],
            }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "url('/textures/parchment-texture.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#ffc067",
              fontFamily: "'Great', cursive",
              fontSize: "28px",
            }}
            className="px-8 py-4 rounded-lg shadow-md font-semibold border-4 border-[#5b4636]"
            onClick={handleEnterForest}
          >
            Enter the Forest
          </motion.button>
        </motion.div>
      )}

      {/* Dialog box */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="dialog"
            className={`absolute z-30 ${items.find((i) => i.id === activeItem)?.position === "left"
              ? "left-2/7"
              : "left-5/7"
              } -translate-x-1/2`}
            style={{
              top: items.find((i) => i.id === activeItem)?.text_position,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative bg-yellow-100 border-4 border-yellow-700 text-black px-6 py-4 rounded-lg shadow-lg max-w-xs">
              {/* Pointer triangle */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent ${items.find((i) => i.id === activeItem)?.position === "left"
                  ? "-right-4 border-l-8 border-l-yellow-700"
                  : "-left-4 border-r-8 border-r-yellow-700"
                  }`}
              ></div>
              <div className="text-md font-medium text-center" style={{ fontFamily: "var(--font-sniglet)" }}>
                {items.find((i) => i.id === activeItem)?.message}
              </div>
              <button
                className="absolute top-1 right-2 text-xl text-red-300 hover:text-red-100"
                onClick={handleCloseDialog}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enteringCastle && (
          <motion.div
            style={{
              backgroundImage: "url('/textures/parchment-texture.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 z-40 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Magic Circle */}
            <motion.img
              src="/textures/rune-circle.png"
              alt="Magic Circle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-800 h-800 object-contain opacity-30"
              style={{
                filter: "drop-shadow(0 0 10px #fde68a)",
              }}
            />

            {/* Middle breathing text */}
            <motion.div
              initial={{ opacity: 0.7, textShadow: "0px 0px 6px #facc15" }}
              animate={{
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  "0px 0px 12px #fde68a",
                  "0px 0px 6px #facc15",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-yellow-700 text-4xl font-bold border-2 border-yellow-700 rounded-lg 
              p-4 bg-white/70 backdrop-blur-md shadow-lg relative z-10" 
              style={{ fontFamily: "var(--font-sniglet)" }}
            >
              The path to CAKNAK opens...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}