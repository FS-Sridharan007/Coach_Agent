import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, CheckCircle, Loader2, ChevronRight } from 'lucide-react'

const STEPS = [
  { agent: 'Profiler Agent', tag: 'A-01', icon: '👤', action: 'Loading learner profile…', output: 'Profile: Sridharan | Goal: Machine Learning | Skills: {Linear Regression: 20}' },
  { agent: 'Planner Agent', tag: 'A-02', icon: '🗺️', action: 'Selecting next topic…', output: 'Selected Topic: Gradient Descent' },
  { agent: 'Content Agent', tag: 'A-03', icon: '📚', action: 'Generating lesson via LLaMA3…', output: 'Lesson: Gradient Descent is an optimization algorithm used to minimize a loss function by iteratively moving in the direction of steepest descent…' },
  { agent: 'Assessor Agent', tag: 'A-04', icon: '📝', action: 'Creating quiz questions…', output: 'Q1: What is the role of learning rate in Gradient Descent?\nQ2: What happens when learning rate is too large?\nQ3: Explain the difference between batch and stochastic GD.' },
  { agent: 'Evaluator Agent', tag: 'A-05', icon: '⚖️', action: 'Evaluating student answers…', output: 'Score: 65 / 100\nFeedback: Good understanding of learning rate. Improve explanation of stochastic variants.' },
  { agent: 'Progress Agent', tag: 'A-06', icon: '📈', action: 'Analyzing session history…', output: 'Progress: Improving from 20→65. Weak: Linear Regression. Suggestion: revisit regression fundamentals.' },
  { agent: 'Motivation Agent', tag: 'A-07', icon: '⚡', action: 'Generating motivation message…', output: '🔥 Great improvement! You jumped from 20 to 65. Keep building on this momentum — Gradient Descent mastery unlocks Neural Networks!' },
  { agent: 'Explainability Agent', tag: 'A-08', icon: '🔍', action: 'Explaining pedagogical decision…', output: 'Gradient Descent was selected because Linear Algebra/Regression are foundational prerequisites now met. Score of 65 unlocks advanced topics.' },
  { agent: 'Tracker Agent', tag: 'A-09', icon: '🔄', action: 'Logging session data…', output: 'Logged: Sridharan → Gradient Descent → Score: 65 → 2026-03-01 18:30' },
]

export default function SessionSimulator() {
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(-1)
  const [done, setDone] = useState(false)

  const runSimulation = async () => {
    if (running) return
    setRunning(true)
    setDone(false)
    setStep(-1)

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 800))
      setStep(i)
    }

    await new Promise((r) => setTimeout(r, 600))
    setRunning(false)
    setDone(true)
  }

  const reset = () => {
    setRunning(false)
    setStep(-1)
    setDone(false)
  }

  return (
    <section id="simulate" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
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
              Interactive Demo
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            Session <span className="text-teal-glow">Simulator</span>
          </h2>
          <p className="text-muted max-w-xl leading-relaxed">
            Watch the full agent pipeline execute in real-time — step by step, from profiling
            to motivation.
          </p>
        </motion.div>

        {/* Control Bar */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={runSimulation}
            disabled={running}
            className={`flex items-center gap-3 px-8 py-4 font-display text-sm tracking-widest transition-all duration-300 ${
              running
                ? 'bg-muted/20 text-muted cursor-not-allowed border border-border'
                : 'bg-teal-glow text-void hover:bg-teal-mid hover:shadow-[0_0_30px_#00e5c860] border border-teal-glow'
            }`}
          >
            {running ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : done ? (
              <>
                <Play className="w-4 h-4" />
                Run Again
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Session
              </>
            )}
          </button>

          {(step >= 0 || done) && (
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-4 border border-border text-muted hover:border-teal-glow/30 hover:text-dim transition-all duration-200 font-mono text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}

          {step >= 0 && (
            <div className="ml-auto font-mono text-xs text-muted">
              <span className="text-teal-glow">{Math.min(step + 1, STEPS.length)}</span>
              {' / '}
              {STEPS.length}
            </div>
          )}
        </div>

        {/* Pipeline Steps */}
        <div className="border border-border bg-surface overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-panel border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-glow/60" />
            <div className="w-3 h-3 rounded-full bg-teal-glow/60" />
            <span className="ml-3 font-mono text-xs text-muted tracking-widest">
              coach_agent — session_runner.py
            </span>
          </div>

          <div className="divide-y divide-border/50">
            {STEPS.map((s, i) => {
              const state =
                i < step ? 'done' : i === step ? 'active' : 'waiting'

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: state === 'waiting' && step >= 0 ? 0.35 : 1,
                  }}
                  className={`p-4 transition-all duration-300 ${
                    state === 'active'
                      ? 'bg-teal-glow/5 border-l-2 border-teal-glow'
                      : state === 'done'
                      ? 'border-l-2 border-teal-glow/30'
                      : 'border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Status icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {state === 'done' ? (
                        <CheckCircle className="w-4 h-4 text-teal-glow" />
                      ) : state === 'active' ? (
                        <Loader2 className="w-4 h-4 text-teal-glow animate-spin" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Agent label */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{s.icon}</span>
                        <span className="font-mono text-xs text-teal-glow/70 tracking-widest">
                          [{s.tag}]
                        </span>
                        <span
                          className={`font-mono text-sm ${
                            state === 'active'
                              ? 'text-white'
                              : state === 'done'
                              ? 'text-dim'
                              : 'text-muted'
                          }`}
                        >
                          {s.agent}
                        </span>
                      </div>

                      {/* Action text */}
                      <div className="font-mono text-xs text-muted mb-2">{s.action}</div>

                      {/* Output */}
                      <AnimatePresence>
                        {state !== 'waiting' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-3 bg-panel border border-border/60 font-mono text-xs text-dim leading-relaxed whitespace-pre-line"
                          >
                            <span className="text-teal-glow/40 mr-2">{'>'}</span>
                            {s.output}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Completion Footer */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-teal-glow/5 border-t border-teal-glow/20 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-teal-glow" />
                <span className="font-mono text-sm text-teal-glow">
                  Session complete — all 9 agents executed successfully
                </span>
                <span className="ml-auto font-mono text-xs text-muted">7.2s</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}