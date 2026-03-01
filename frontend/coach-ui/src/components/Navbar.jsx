import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Menu, X, Zap } from 'lucide-react'

const links = ['Pipeline', 'Dashboard', 'Simulate', 'Agents']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-void/90 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 border border-teal-glow/60 rotate-45 flex items-center justify-center animate-glow-pulse">
                  <Brain className="w-4 h-4 text-teal-glow -rotate-45" />
                </div>
                <div className="absolute -inset-1 border border-teal-glow/20 rotate-45" />
              </div>
              <span className="font-display text-sm tracking-widest text-teal-glow uppercase">
                Coach<span className="text-dim">Agent</span>
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="px-4 py-2 text-dim hover:text-teal-glow text-sm font-mono tracking-wider transition-colors duration-200 relative group"
                >
                  <span className="text-teal-glow/40 mr-1 text-xs">0{i + 1}</span>
                  {link}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-teal-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </motion.a>
              ))}
              <motion.a
                href="#simulate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="ml-4 flex items-center gap-2 px-4 py-2 bg-teal-glow/10 border border-teal-glow/40 text-teal-glow text-sm font-mono tracking-wider hover:bg-teal-glow/20 transition-all duration-200"
              >
                <Zap className="w-3 h-3" />
                Run Session
              </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-dim hover:text-teal-glow transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-border md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-dim hover:text-teal-glow font-mono tracking-wider py-2 border-b border-border/50 transition-colors"
                >
                  <span className="text-teal-glow/40 text-xs">0{i + 1}</span>
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}