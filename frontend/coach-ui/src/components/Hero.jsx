import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Cpu, Network } from "lucide-react"

const STATS = [
  { label: "Active Agents", value: "10" },
  { label: "Topics Covered", value: "5" },
  { label: "Eval Accuracy", value: "94%" },
  { label: "Model", value: "LLaMA3" },
]

const TYPEWRITER_TEXT = "Autonomous · Adaptive · Intelligent"

export default function Hero() {
  const [typed, setTyped] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < TYPEWRITER_TEXT.length) {
        setTyped(TYPEWRITER_TEXT.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none animate-pulse" />

      <div className="max-w-5xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500/30 bg-teal-500/5 mb-8 rounded-lg"
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-400 font-mono text-xs tracking-widest uppercase">
            System Online — Multi-Agent Architecture
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Autonomous</span>
          <br />
          <span className="text-teal-400">Coach Agent</span>
          <br />
          <span className="text-gray-400 text-2xl sm:text-3xl md:text-4xl">
            for Machine Learning
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-gray-400 text-sm md:text-base tracking-widest mb-12 h-6"
        >
          {typed}
          <span className="inline-block w-0.5 h-4 bg-teal-400 ml-1 animate-pulse" />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#pipeline"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-teal-500 text-black font-semibold text-sm tracking-widest rounded-lg hover:bg-teal-400 transition-all duration-300 hover:shadow-lg"
          >
            <Network className="w-4 h-4" />
            Explore Pipeline
          </a>

          <a
            href="#simulate"
            className="flex items-center justify-center gap-3 px-8 py-4 border border-gray-600 text-gray-300 hover:border-teal-400 hover:text-teal-400 text-sm tracking-widest rounded-lg transition-all duration-300"
          >
            <Cpu className="w-4 h-4" />
            Run Simulation
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900/60 border border-gray-700 rounded-lg px-6 py-5 flex flex-col items-center gap-1"
            >
              <span className="text-2xl md:text-3xl text-teal-400 font-bold">
                {stat.value}
              </span>
              <span className="text-gray-400 text-xs font-mono tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}