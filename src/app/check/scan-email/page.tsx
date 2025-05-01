"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import Link from "next/link";
import { FaExclamationTriangle, FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

type Breach = {
  name: string;
  title: string;
  breachDate: string;
  description?: string;
  dataClasses?: string[];
};

export default function ScanEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"safe" | "risky" | null>(null);
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [expandedBreaches, setExpandedBreaches] = useState<{ [key: string]: boolean }>({});
  const [showBreachDetails, setShowBreachDetails] = useState(true);

  const handleScan = async () => {
    if (!email) return;
    setLoading(true);
    setResult(null);
    setBreaches([]);

    try {
      const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.breached) {
        setResult("risky");
        setBreaches(data.breaches || []);
      } else {
        setResult("safe");
      }
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBreach = (breachName: string) => {
    setExpandedBreaches((prev) => ({
      ...prev,
      [breachName]: !prev[breachName],
    }));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        fontFamily: "var(--font-sniglet)",
      }}
    >
      <TopNav />

      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: [-20, -10, -20] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4"
        >
          <Image src="/main/crystal_orb.png" alt="Crystal Orb" width={100} height={100} />
        </motion.div>

        <p className="text-lg text-[#5b4636] max-w-sm font-semibold mb-1">
          Your data is <span className="text-green-700">secured</span> with encryption.
          <Link href="https://haveibeenpwned.com/Privacy" target="_blank">
            <span className="ml-1 underline text-yellow-700 hover:text-yellow-800 cursor-pointer">Learn More</span>
          </Link>
        </p>
        <p className="text-sm text-[#5b4636] mb-6">Secure • Private • We don't store emails</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="w-80 px-4 py-3 mb-4 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <motion.button
          whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
          onClick={handleScan}
          disabled={loading}
          className="px-8 py-3 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636] bg-[url('/textures/parchment-texture.png')] bg-cover"
          style={{ fontFamily: "'Great', cursive" }}
        >
          {loading ? "Scanning..." : "Scan"}
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-8 w-full max-w-lg p-6 rounded-lg border-4 border-[#5b4636] bg-[#f9f4e6] shadow-lg text-left`}
            >
              <div className="flex items-center mb-4">
                {result === "safe" ? (
                  <>
                    <FaCheckCircle className="text-green-600 mr-3 text-3xl" />
                    <h2 className="text-2xl font-bold text-green-700">Your email is safe!</h2>
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle className="text-red-600 mr-3 text-3xl" />
                    <h2 className="text-2xl font-bold text-red-700">Risk detected! Protect your account!</h2>
                  </>
                )}
              </div>

              {result === "safe" ? (
                <ul className="list-disc ml-5 text-[#5b4636] space-y-1">
                  <li>Keep using strong, unique passwords</li>
                  <li>Enable two-factor authentication where possible</li>
                  <li>Stay cautious with suspicious emails</li>
                </ul>
              ) : (
                <>
                  <p className="text-[#5b4636] mb-4">We found your email in known data breaches. Recommended actions:</p>
                  <ul className="list-decimal ml-5 text-[#5b4636] space-y-1">
                    <li>Immediately change your passwords</li>
                    <li>Enable two-factor authentication</li>
                    <li>Check for unusual account activities</li>
                  </ul>

                  {breaches.length > 0 && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowBreachDetails((prev) => !prev)}
                        className="text-[#5b4636] underline text-lg font-semibold mb-2 flex items-center"
                      >
                        Breach Details
                        {showBreachDetails ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                      </button>

                      {showBreachDetails && (
                        <div className="space-y-4">
                          {breaches.map((breach, idx) => (
                            <div
                              key={idx}
                              className="border border-[#5b4636] rounded-lg p-3 bg-white/90 shadow cursor-pointer"
                              onClick={() => toggleBreach(breach.name)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-bold text-[#5b4636]">{breach.title || breach.name}</h3>
                                  <p className="text-sm text-gray-600">Breach date: {formatDate(breach.breachDate)}</p>
                                </div>
                                {expandedBreaches[breach.name] ? <FaChevronUp /> : <FaChevronDown />}
                              </div>
                              {expandedBreaches[breach.name] && breach.description && (
                                <p className="mt-2 text-sm text-gray-700">{breach.description}</p>
                              )}
                              {expandedBreaches[breach.name] && breach.dataClasses && breach.dataClasses.length > 0 && (
                                <div className="mt-2 text-sm">
                                  <span className="font-semibold">Compromised data:</span>{" "}
                                  {breach.dataClasses.join(", ")}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
