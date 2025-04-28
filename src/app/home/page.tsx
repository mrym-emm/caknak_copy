"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "~/components/LanguageSwitcher";

export default function Home() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const menuItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuPositions, setMenuPositions] = useState<Record<string, number>>({});
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    {
      label: 'HOME',
      href: '/home',
      submenu: [
        { label: 'Main Page', href: '/', description: 'Return to our main homepage' },
        { label: 'About Us', href: '/about', description: 'Learn more about our mission' }
      ]
    },
    {
      label: 'SCAN EMAIL',
      href: '/scan-email',
      submenu: [
        { label: 'Check Email Security', href: '/scan-email', description: 'Verify if your email has been breached' },
        { label: 'Email Security Tips', href: '/email-security-tips', description: 'Best practices for email security' }
      ]
    },
    {
      label: 'DETECT PHISHING',
      href: '/phishing-detection',
      submenu: [
        { label: 'Phishing Detection', href: '/phishing-detection', description: 'Tools to identify phishing attempts' },
        { label: 'Recent Phishing Scams', href: '/recent-scams', description: 'Latest phishing techniques to watch for' }
      ]
    },
    {
      label: 'LEARN SECURITY',
      href: '/learn-security',
      submenu: [
        { label: 'Digital Security Risks', href: '/learn-security', description: 'Common risks in digital environment' },
        { label: 'Security Guides', href: '/security-guides', description: 'Comprehensive security tutorials' },
        { label: 'Best Practices', href: '/security-best-practices', description: 'Recommended security measures' }
      ]
    },
    {
      label: 'TAKE A QUIZ',
      href: '/security-quiz',
      submenu: [
        { label: 'Security Knowledge Quiz', href: '/security-quiz', description: 'Test your security knowledge' },
        { label: 'Phishing Awareness Quiz', href: '/phishing-quiz', description: 'Test your ability to spot phishing' }
      ]
    },
  ];

  const sections = [
    { id: "branch", title: "Branch", description: "See through the lies—let your instincts speak the truth.", icon: "🪶", img: "/main/magic_feather.png", link: "/scan-email" },
    { id: "apple", title: "Apple", description: "Don't fall for poisoned bait. Learn to spot phishing traps.", icon: "🔮", img: "/main/crystal_orb.png", link: "/phishing-detection" },
    { id: "spindle", title: "Spindle", description: "Some dangers hide in sleep. Wake up—truth doesn't wait.", icon: "📖", img: "/main/guardian_book.png", link: "/learn-security" },
    { id: "match", title: "Match", description: "Even the smallest spark can chase away the fog.", icon: "📜", img: "/main/trial_scroll.png", link: "/security-quiz" },
  ];


  useEffect(() => {
    const positions: Record<string, number> = {};
    Object.entries(menuItemRefs.current ?? {}).forEach(([key, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
            positions[key] = rect.left;
          }
        });
    setMenuPositions(positions);
  }, [hoveredNavItem]);

  const handleMenuItemEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setHoveredNavItem(label);
  };

  const handleMenuItemLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      const dropdown = document.getElementById(`dropdown-${hoveredNavItem}`);
      if (!dropdown?.matches(":hover")) {
        setHoveredNavItem(null);
      }
    }, 300);
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
      {/* Header */}
      <header className="pt-8 relative">
        <div className="absolute right-8 top-4">
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-4">
          <h1 className="text-6xl text-[#5b4636]" style={{ fontFamily: "'Great', cursive" }}>caKnak</h1>
        </div>

        <div className="container mx-auto px-6 border-b border-[#5b4636]">
          <nav className="flex justify-center space-x-14 relative">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                ref={(el) => {
                  menuItemRefs.current[item.label] = el;
                }}
                onMouseEnter={() => handleMenuItemEnter(item.label)}
                onMouseLeave={handleMenuItemLeave}
              >
                <Link href={item.href} className="text-md text-[#5b4636] hover:text-yellow-700">
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Dropdown Area */}
      <AnimatePresence>
        {hoveredNavItem && (
          <motion.div
            id={`dropdown-${hoveredNavItem}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bg-yellow-50/80 border-t border-[#5b4636] shadow-md z-40 origin-top"
            style={{
              top: "15.9%",
              left: `${menuPositions[hoveredNavItem] ?? 0}px`,
              transform: "translateX(-50%)",
              marginTop: "0.5rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              minWidth: "220px",
            }}
            onMouseEnter={() => setHoveredNavItem(hoveredNavItem)}
            onMouseLeave={() => setHoveredNavItem(null)}
          >
            {navItems.find((item) => item.label === hoveredNavItem)?.submenu?.map((subItem, idx) => (
              <Link key={idx} href={subItem.href} className="block mb-3 text-[#5b4636]">
                <h3 className="font-semibold">{subItem.label}</h3>
                <p className="text-sm text-gray-600">{subItem.description}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the page stays the same */}
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
                {/* 正面 - 圖案面（hover會旋轉+光圈） */}
                <motion.div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg border-4 border-[#5b4636] bg-[url('/textures/rune-circle-bg.png')] bg-cover bg-center overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                  whileHover={{
                    boxShadow: "0 0 20px 10px rgba(255, 255, 200, 0.6)",
                  }}
                >
                  {/* Rune Circle背景旋轉 */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 w-90 h-90 bg-center bg-no-repeat bg-contain opacity-60 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      backgroundImage: "url('/textures/rune-circle-removebg.png')",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  />

                  {/* 圖示 */}
                  <div className="text-7xl text-[#d7c49e] z-10">
                    <Image src={section.img} alt={section.title} width={100} height={100} />
                  </div>
                </motion.div>

                {/* 背面 - 文字面 */}
                <div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg bg-[#f3e9d2] border-4 border-[#5b4636] transform rotate-y-180 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* 粒子光點 */}
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


      <footer
        className="py-6 text-center text-sm text-[#5b4636]"
        style={{
          backgroundImage: "url('/textures/parchment-texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p>© 2025 caKnak. All rights reserved.</p>
        <p>Your trusted magical companion for digital safety.</p>
      </footer>
    </main>
  );
}
