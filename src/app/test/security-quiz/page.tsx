'use client';

import React from 'react';
import QuizResultCardGood from '~/app/_components/quiz-result-good';
import QuizResultCardBetter from '~/app/_components/quiz-result-better';
// import { motion } from 'framer-motion';
import TopNav from '~/components/TopNav';
import Footer from '~/components/Footer';


/**
 * main page component for the decode danger feature
 * offers an interactive phishing simulator and educational content
 * designed to teach users how to identify and avoid scams
 * includes animated elements for engaging user experience
 */
export default function DecodeDangerPage() {

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'var(--font-sniglet)',
      }}
    >
      {/* navigation component at the top of the page */}
      <TopNav />
      
      {/* main content section with all educational materials */}
      <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#5b4636] mb-2">
            Security Quiz
          </h1>
          <p className="text-lg text-[#5b4636] mb-6 max-w-xl mx-auto">
            Lorem ipsum
          </p>

          
        </div>

      <div className="flex items-center justify-center ">
      <QuizResultCardGood />
      {/* <QuizResultCardBetter /> */}
      </div>

      <div className="flex items-center justify-center ">
      {/* <QuizResultCardGood /> */}
      <QuizResultCardBetter />
      </div>

      {/* spacer to push footer to bottom */}
      <div className="flex-grow" />
      
      {/* page footer component */}
      <Footer />
    </main>
  );
}