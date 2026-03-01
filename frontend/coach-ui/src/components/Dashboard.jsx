import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BookOpen, Award, AlertTriangle } from 'lucide-react'
import LearnerCard from './LeanerCard'
import ProgressChart from './ProgressChart'

const METRICS = [
  {
    label: 'Latest Score',
    value: '20',
    unit: '/ 100',
    icon: Award,
    color: 'text-red-400',
    border: 'border-red-400/20',
    bg: 'bg-red-400/5',
  },
  {
    label: 'Sessions Done',
    value: '3',
    unit: 'sessions',
    icon: BookOpen,
    color: 'text-teal-glow',
    border: 'border-teal-glow/20',
    bg: 'bg-teal-glow/5',
  },
  {
    label: 'Best Score',
    value: '40',
    unit: '/ 100',
    icon: TrendingUp,
    color: 'text-amber-glow',
    border: 'border-amber-glow/20',
    bg: 'bg-amber-glow/5',
  },
  {
    label: 'Weak Area',
    value: 'Lin. Reg.',
    unit: 'retry needed',
    icon: AlertTriangle,
    color: 'text-orange-400',
    border: 'border-orange-400/20',
    bg: 'bg-orange-400/5',
  },
]

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-24 px-4 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border max-w-[60px]" />
            <span className="font-mono text-xs text-teal-glow tracking-widest uppercase">
              Learner Dashboard
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            Learning <span className="text-teal-glow">Intelligence</span>
          </h2>
          <p className="text-muted max-w-lg leading-relaxed">
            Real-time data from the learner model — tracking sessions, scores, and skill
            progression across topics.
          </p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 border ${m.border} ${m.bg} relative overflow-hidden`}
            >
              <m.icon className={`w-5 h-5 ${m.color} mb-3`} />
              <div className={`font-display text-2xl md:text-3xl ${m.color} mb-1`}>
                {m.value}
              </div>
              <div className="text-[10px] font-mono text-muted tracking-widest uppercase">
                {m.unit}
              </div>
              <div className="mt-2 text-xs text-muted">{m.label}</div>
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-12 h-12 border-b border-l ${m.border} opacity-30`} />
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Learner Profile */}
          <div className="lg:col-span-1">
            <LearnerCard />
          </div>

          {/* Chart + Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                    Score Trajectory
                  </div>
                  <h3 className="font-display text-white">Session Progress</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-teal-glow" />
                  <span className="font-mono text-xs text-muted">Score/100</span>
                </div>
              </div>
              <ProgressChart />
            </motion.div>

            {/* Knowledge Flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-border bg-surface p-6"
            >
              <div className="font-mono text-xs text-muted tracking-widest uppercase mb-5">
                Topic Coverage Plan
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Linear Algebra', status: 'in-progress', score: 50 },
                  { name: 'Linear Regression', status: 'weak', score: 20 },
                  { name: 'Vectors', status: 'pending', score: 0 },
                  { name: 'Matrices', status: 'pending', score: 0 },
                  { name: 'Gradient Descent', status: 'pending', score: 0 },
                  { name: 'Data Preprocessing', status: 'planned', score: 0 },
                ].map((topic, i) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="p-3 border border-border bg-panel/50 relative overflow-hidden"
                  >
                    <div
                      className={`text-[9px] font-mono tracking-widest uppercase mb-1 ${
                        topic.status === 'in-progress'
                          ? 'text-amber-glow'
                          : topic.status === 'weak'
                          ? 'text-red-400'
                          : 'text-muted'
                      }`}
                    >
                      {topic.status}
                    </div>
                    <div className="text-xs text-dim">{topic.name}</div>
                    {topic.score > 0 && (
                      <div className="mt-2 h-0.5 bg-border">
                        <div
                          className="h-full bg-teal-glow"
                          style={{ width: `${topic.score}%` }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}