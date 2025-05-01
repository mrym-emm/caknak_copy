"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";

export default function ScanEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"safe" | "risky" | null>(null);

  const handleScan = async () => {
    if (!email) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.breached) {
        setResult("risky");
      } else {
        setResult("safe");
      }
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Magic Feather Image */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: [ -20, -10, -20 ] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-8"
      >
        <Image src="/main/magic_feather.png" alt="Magic Feather" width={150} height={150} />
      </motion.div>

      {/* Email Input */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email..."
        className="w-80 px-4 py-3 mb-6 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Scan Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
        onClick={handleScan}
        className="px-8 py-3 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636]"
        style={{
          backgroundImage: "url('/textures/parchment-texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'Great', cursive",
        }}
        disabled={loading}
      >
        {loading ? "Scanning..." : "Scan"}
      </motion.button>

      {/* Result Light Circle Effect */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.6 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <motion.img
              src="/textures/rune-circle-removebg.png"
              alt="Magic Circle"
              className="w-[300px] h-[300px]"
              style={{
                filter: result === "safe" ? "drop-shadow(0 0 20px #facc15)" : "drop-shadow(0 0 20px #f87171)",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Text */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-8 text-3xl font-bold ${result === "safe" ? "text-green-600" : "text-red-600"}`}
          >
            {result === "safe" ? "Your email is safe!" : "Risk detected! Protect your account!"}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow" />
      <Footer />
    </main>
  );
}
