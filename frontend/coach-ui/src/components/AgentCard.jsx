import React from 'react'
import { motion } from 'framer-motion'

export default function AgentCard({ agent, index, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative p-5 border transition-all duration-300 cursor-default ${
        isActive
          ? 'border-teal-glow/60 bg-teal-glow/5 shadow-[0_0_20px_#00e5c820]'
          : 'border-border bg-surface hover:border-teal-glow/30 hover:bg-teal-glow/3'
      }`}
    >
      {isActive && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-teal-glow animate-pulse" />
      )}

      {/* Icon */}
      <div
        className={`w-10 h-10 flex items-center justify-center text-xl mb-3 border ${
          isActive ? 'border-teal-glow/50 bg-teal-glow/10' : 'border-border bg-panel'
        }`}
      >
        {agent.icon}
      </div>

      {/* Name */}
      <div className="font-mono text-xs tracking-widest text-teal-glow/70 mb-1 uppercase">
        {agent.tag}
      </div>
      <h3 className="font-display text-sm text-white mb-2 leading-tight">{agent.name}</h3>

      {/* Description */}
      <p className="text-xs text-muted leading-relaxed">{agent.desc}</p>

      {/* Input/Output labels */}
      <div className="mt-4 flex flex-wrap gap-1">
        {agent.tags?.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[10px] font-mono text-muted border border-border/60 bg-panel/50"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}