"use client";

import { useState } from "react";
import type{ PasswordResponse } from "~/types/password";
import { motion } from "framer-motion";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";

const calculateConfidence = (entropy: number) => {
    if (entropy >= 4) return 1;
    if (entropy <= 0) return 0;
    return entropy / 4;
};

const getStrengthText = (confidence: number) => {
    if (confidence < 0.40) return "Weak 🔴";
    if (confidence < 0.75) return "Medium 🟠";
    return "Strong 🟢";
  };

const formatFeatureName = (name: string) => {
    const map: Record<string, string> = {
        length: "Password Length",
        num_upper: "Uppercase Letters",
        num_lower: "Lowercase Letters",
        num_digit: "Numbers",
        num_symbol: "Special Characters",
        has_qwerty: "Keyboard Pattern",
        has_123456: "Number Sequence",
        entropy: "Complexity Score",
    };
    return map[name] ?? name;
};

const formatFeatureValue = (name: string, value: string | number) => {
    if (name === "has_qwerty" || name === "has_123456") return value === 1 ? "Yes" : "No";
    if (name === "entropy" && typeof value === "number") return value.toFixed(2);
    return value;
};

export default function PasswordCheckPage() {
    const [password, setPassword] = useState("");
    const [result, setResult] = useState<PasswordResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/check-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) throw new Error("API failed");
            const json = await res.json() as PasswordResponse;
            setResult(json);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const confidence = calculateConfidence(result?.features.entropy ?? 0);
    const hasTips = result && (
        result.features.num_upper === 0 ||
        result.features.num_digit === 0 ||
        result.features.num_symbol === 0 ||
        result.features.length < 12 ||
        result.features.has_qwerty === 1 ||
        result.features.has_123456 === 1
    );

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

            <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
                <h1 className="text-4xl text-[#5b4636] font-extrabold mb-4">
                    Check Your Password
                </h1>
                <p className="text-[#5b4636] max-w-lg mb-6">Enter a password to check its strength and get improvement tips.</p>

                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-80 px-4 py-3 mb-4 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                <motion.button
                    whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
                    disabled={loading}
                    onClick={handleCheck}
                    className="px-8 py-3 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636] bg-[url('/textures/parchment-texture.png')] bg-cover"
                >
                    {loading ? "Checking..." : "Check"}
                </motion.button>

                {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 max-w-3xl w-full bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-6 text-left"
                    >
                        <h2 className="text-2xl font-bold text-[#5b4636] mb-1 text-center">
                            Strength: {(confidence * 100).toFixed(0)}%
                        </h2>
                        <p className="text-xl font-semibold text-[#5b4636] mb-4 text-center">{getStrengthText(confidence)}</p>

                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-yellow-500 transition-all duration-500"
                                style={{ width: `${(confidence * 100).toFixed(0)}%` }}
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 whitespace-nowrap">
                            {Object.entries(result.features).map(([key, val]: [string, string | number]) => (
                                <div key={key} className="bg-white/80 border-2 border-[#5b4636] rounded-lg p-3">
                                    <div className="text-sm text-[#5b4636] font-medium">{formatFeatureName(key)}</div>
                                    <div className="text-lg text-yellow-700 font-semibold">{formatFeatureValue(key, val)}</div>
                                </div>
                            ))}
                        </div>

                        {hasTips && (
                            <div className="mt-4 text-[#5b4636] text-lg">
                                <p className="font-bold mb-1">Tips to improve:</p>
                                {result.features.num_upper === 0 && <p>&emsp; • &nbsp; &nbsp;Add <span className="text-xl text-yellow-700">&nbsp;uppercase&nbsp;</span> letters</p>}
                                {result.features.num_digit === 0 && <p>&emsp; • &nbsp; &nbsp;Include <span className="text-xl text-yellow-700">&nbsp;numbers&nbsp;</span></p>}
                                {result.features.num_symbol === 0 && <p>&emsp; • &nbsp; &nbsp;Use special characters<span className="text-xl text-yellow-700">&nbsp; (!@#$%)</span></p>}
                                {result.features.length < 12 && <p>&emsp; • &nbsp; &nbsp;Make it at least <span className="text-xl text-yellow-700">&nbsp;12 &nbsp;</span>characters</p>}
                                {(result.features.has_qwerty === 1 || result.features.has_123456 === 1) && (
                                <p>&emsp; • &nbsp; <span className="text-xl text-yellow-700">&nbsp;Avoid &nbsp;</span>patterns like &apos;123456&apos; or &apos;qwerty&apos;</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            <Footer />
        </main>
    );
}
