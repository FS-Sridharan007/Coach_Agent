import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 border border-teal-glow/40 rotate-45 flex items-center justify-center">
              <Brain className="w-4 h-4 text-teal-glow -rotate-45" />
            </div>
            <span className="font-display text-sm tracking-widest text-teal-glow uppercase">
              Coach<span className="text-dim">Agent</span>
            </span>
          </motion.div>

          {/* Info */}
          <div className="text-center">
            <p className="font-mono text-xs text-muted tracking-widest">
              Built with <span className="text-teal-glow">Ollama + LLaMA3</span> · Multi-Agent System
            </p>
            <p className="font-mono text-xs text-muted/50 mt-1 tracking-widest">
              Study Project · React + Vite + Tailwind CSS
            </p>
          </div>

          {/* GitHub */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 border border-border text-muted hover:border-teal-glow/40 hover:text-teal-glow transition-all duration-200 font-mono text-xs tracking-widest"
          >
            <Github className="w-4 h-4" />
            View Source
          </motion.a>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {['Profiler', 'Planner', 'Content', 'Assessor', 'Evaluator', 'Progress', 'Motivation', 'Explainability', 'Tracker', 'Base'].map(
            (name) => (
              <span key={name} className="font-mono text-[10px] text-muted/50 tracking-widest">
                {name} Agent
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  )
}