"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 relative overflow-hidden">

      {/* Better Soft Gradients */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute top-[-25%] left-[-20%] w-[65%] h-[65%] bg-purple-200 rounded-full blur-[200px] opacity-60" />
        <div className="absolute bottom-[-25%] right-[-20%] w-[65%] h-[65%] bg-indigo-200 rounded-full blur-[200px] opacity-50" />
      </div>

      {/* Subtle spotlight glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.45)_0%,_transparent_65%)] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-2xl font-bold tracking-tight group-hover:text-purple-600 transition-colors duration-200">
            Make Agent
          </span>
        </Link>

        <Link href="/dashboard">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-5 rounded-xl font-medium shadow-lg shadow-purple-300 transition-all hover:scale-105 duration-200 active:scale-95">
            Get Started
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 mt-20 md:mt-32 max-w-6xl mx-auto">

        {/* Floating Gradient Behind Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -z-10 top-28 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/40 to-indigo-400/40 blur-[140px] rounded-full"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8 text-gray-900 drop-shadow-sm"
        >
          Empower{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Ideas with
          </span>{" "}
          <br className="hidden md:block" />
          Intelligent Agents.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            No Code
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mb-12 leading-relaxed font-medium"
        >
          Design agents that understand, think, and take action for you.
          From chatbots to task automators — build smarter, faster, easier.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg px-10 py-7 rounded-xl font-semibold shadow-2xl shadow-purple-300/50 transition-transform hover:-translate-y-1 duration-200">
              Explore Now
            </Button>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 text-lg px-10 py-7 rounded-xl font-semibold transition-all duration-200"
            >
              Contact Support
            </Button>
          </Link>
        </motion.div>

      </main>
    </div>
  );
}
