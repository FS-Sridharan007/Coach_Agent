import React from 'react'
import { motion } from 'framer-motion'
import { User, Clock, Target } from 'lucide-react'

const HISTORY = [
  { topic: 'Linear Regression', score: 40, time: '2026-02-28 10:06' },
  { topic: 'Linear Regression', score: 33, time: '2026-02-28 10:42' },
  { topic: 'Linear Regression', score: 20, time: '2026-03-01 12:13' },
]

export default function LearnerCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="border border-border bg-surface p-6 glow-border transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-glow/10 border border-teal-glow/30 flex items-center justify-center">
            <User className="w-5 h-5 text-teal-glow" />
          </div>
          <div>
            <div className="font-mono text-xs text-teal-glow/60 tracking-widest mb-0.5">LEARNER ID</div>
            <div className="font-display text-white">Sridharan</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-teal-glow animate-pulse" />
          <span className="font-mono text-xs text-teal-glow">ACTIVE</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="font-mono text-xs text-muted tracking-widest mb-3 uppercase">Current Skills</div>
        <div className="space-y-2">
          {[
            { name: 'Linear Regression', score: 20 },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-dim">{skill.name}</span>
                <span className="font-mono text-xs text-teal-glow">{skill.score}%</span>
              </div>
              <div className="h-1 bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-teal-glow"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="flex items-center gap-2 p-3 border border-amber-glow/20 bg-amber-glow/5 mb-5">
        <Target className="w-4 h-4 text-amber-glow" />
        <span className="text-xs font-mono text-amber-glow">Goal: Machine Learning</span>
      </div>

      {/* History */}
      <div>
        <div className="font-mono text-xs text-muted tracking-widest mb-3 uppercase flex items-center gap-2">
          <Clock className="w-3 h-3" />
          Session History
        </div>
        <div className="space-y-2">
          {HISTORY.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <div>
                <div className="text-xs text-dim">{h.topic}</div>
                <div className="text-[10px] text-muted font-mono">{h.time}</div>
              </div>
              <div
                className={`font-mono text-sm font-bold ${
                  h.score >= 60
                    ? 'text-teal-glow'
                    : h.score >= 35
                    ? 'text-amber-glow'
                    : 'text-red-400'
                }`}
              >
                {h.score}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}