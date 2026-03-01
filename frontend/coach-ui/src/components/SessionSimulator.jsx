import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, CheckCircle, Loader2, ChevronRight } from 'lucide-react'

// ---- Backend connection (no backend changes needed) ----
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function startSession(studentId, goal) {
  const res = await fetch(`${API_BASE}/start-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: studentId, goal }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Start session failed with ${res.status}`)
  }
  return res.json()
}

async function submitAnswers(studentId, answers) {
  const res = await fetch(`${API_BASE}/submit-answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: studentId, answers }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Submit answers failed with ${res.status}`)
  }
  return res.json()
}

// ---- UI pipeline definition (labels/icons stay mostly the same) ----
const STEPS = [
  {
    agent: 'Profiler Agent',
    tag: 'A-01',
    icon: '👤',
    action: 'Loading learner profile…',
    defaultOutput:
      'Profile loaded from learner model JSON store for the given student_id.',
  },
  {
    agent: 'Planner Agent',
    tag: 'A-02',
    icon: '🗺️',
    action: 'Selecting next topic…',
    defaultOutput: 'Selected Topic: Gradient Descent',
  },
  {
    agent: 'Content Agent',
    tag: 'A-03',
    icon: '📚',
    action: 'Generating lesson via LLaMA3…',
    defaultOutput:
      'Lesson: Gradient Descent is an optimization algorithm used to minimize a loss function…',
  },
  {
    agent: 'Assessor Agent',
    tag: 'A-04',
    icon: '📝',
    action: 'Creating quiz questions…',
    defaultOutput:
      'Q1, Q2, Q3 about the selected topic will appear here once session is started.',
  },
  {
    agent: 'Evaluator Agent',
    tag: 'A-05',
    icon: '⚖️',
    action: 'Evaluating student answers…',
    defaultOutput: 'Score and feedback from evaluator agent will appear here.',
  },
  {
    agent: 'Progress Agent',
    tag: 'A-06',
    icon: '📈',
    action: 'Analyzing session history…',
    defaultOutput: 'Progress summary and weak areas will appear here.',
  },
  {
    agent: 'Motivation Agent',
    tag: 'A-07',
    icon: '⚡',
    action: 'Generating motivation message…',
    defaultOutput: 'Personalized motivational message will appear here.',
  },
  {
    agent: 'Explainability Agent',
    tag: 'A-08',
    icon: '🔍',
    action: 'Explaining pedagogical decision…',
    defaultOutput: 'Explanation of topic choice and next action will appear here.',
  },
  {
    agent: 'Tracker Agent',
    tag: 'A-09',
    icon: '🔄',
    action: 'Logging session data…',
    defaultOutput: 'Tracker logs student_id, topic and score for this session.',
  },
]

export default function SessionSimulator() {
  // Basic session info
  const [studentId, setStudentId] = useState('Sridharan')
  const [goal, setGoal] = useState('Machine Learning')

  // Backend data
  const [startResult, setStartResult] = useState(null) // { topic, lesson, quiz }
  const [submitResult, setSubmitResult] = useState(null) // { score, feedback, ... } or { error }

  // Answers typed by user
  const [answers, setAnswers] = useState('')

  // UI state
  const [step, setStep] = useState(-1)
  const [done, setDone] = useState(false)
  const [loadingPhase, setLoadingPhase] = useState(null) // 'start' | 'submit' | null
  const [error, setError] = useState('')

  const handleStartSession = async () => {
    if (loadingPhase) return
    setError('')
    setDone(false)
    setSubmitResult(null)
    setAnswers('')
    setStep(-1)

    try {
      setLoadingPhase('start')
      const data = await startSession(studentId.trim(), goal.trim())
      setStartResult(data)
      // Visually mark first 4 agents as completed
      setStep(3)
    } catch (e) {
      setError(e.message || 'Failed to start session')
      setStartResult(null)
      setStep(-1)
    } finally {
      setLoadingPhase(null)
    }
  }

  const handleSubmitAnswers = async () => {
    if (loadingPhase) return
    if (!startResult) {
      setError('Start a session first before submitting answers.')
      return
    }
    if (!answers.trim()) {
      setError('Please enter your answers before submitting.')
      return
    }

    setError('')

    try {
      setLoadingPhase('submit')
      const data = await submitAnswers(studentId.trim(), answers.trim())
      setSubmitResult(data)

      if (!data.error) {
        // Visually mark all 9 agents as completed
        setStep(8)
        setDone(true)
      }
    } catch (e) {
      setError(e.message || 'Failed to submit answers')
    } finally {
      setLoadingPhase(null)
    }
  }

  const reset = () => {
    setStartResult(null)
    setSubmitResult(null)
    setAnswers('')
    setStep(-1)
    setDone(false)
    setError('')
    setLoadingPhase(null)
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
            Watch the full agent pipeline execute end-to-end — now backed by the real FastAPI
            backend.
          </p>
        </motion.div>

        {/* Control Bar + Session Inputs */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-muted tracking-widest uppercase">
                Student ID
              </label>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="bg-panel border border-border text-dim px-3 py-2 text-sm outline-none focus:border-teal-glow/60"
                placeholder="e.g. Sridharan"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-mono text-xs text-muted tracking-widest uppercase">
                Goal
              </label>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="bg-panel border border-border text-dim px-3 py-2 text-sm outline-none focus:border-teal-glow/60"
                placeholder="e.g. Machine Learning"
              />
            </div>
          </div>

          {/* Buttons + step counter */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartSession}
              disabled={loadingPhase === 'start'}
              className={`flex items-center gap-3 px-8 py-4 font-display text-sm tracking-widest transition-all duration-300 ${
                loadingPhase === 'start'
                  ? 'bg-muted/20 text-muted cursor-not-allowed border border-border'
                  : 'bg-teal-glow text-void hover:bg-teal-mid hover:shadow-[0_0_30px_#00e5c860] border border-teal-glow'
              }`}
            >
              {loadingPhase === 'start' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Starting…
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Session
                </>
              )}
            </button>

            <button
              onClick={handleSubmitAnswers}
              disabled={loadingPhase === 'submit'}
              className={`flex items-center gap-3 px-6 py-4 font-display text-sm tracking-widest transition-all duration-300 border ${
                loadingPhase === 'submit'
                  ? 'bg-muted/20 text-muted cursor-not-allowed border-border'
                  : 'border-amber-glow/60 text-amber-glow hover:bg-amber-glow/10'
              }`}
            >
              {loadingPhase === 'submit' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Submit Answers
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

          {error && (
            <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2">
              {error}
            </div>
          )}
        </div>

        {/* Answers input (only after session started) */}
        {startResult && (
          <div className="mb-8 border border-border bg-panel p-4">
            <div className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
              Student Answers
            </div>
            <textarea
              value={answers}
              onChange={(e) => setAnswers(e.target.value)}
              rows={4}
              className="w-full bg-surface border border-border text-dim px-3 py-2 text-sm outline-none focus:border-teal-glow/60 resize-vertical"
              placeholder="Type your answers to the quiz here before submitting…"
            />
          </div>
        )}

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
                step < 0 ? 'waiting' : i < step ? 'done' : i === step ? 'active' : 'waiting'

              // Map backend data into the step outputs
              let output = s.defaultOutput

              if (startResult) {
                if (i === 1 && startResult.topic) {
                  output = `Selected Topic: ${startResult.topic}`
                }
                if (i === 2 && startResult.lesson) {
                  output = startResult.lesson
                }
                if (i === 3 && startResult.quiz) {
                  output = startResult.quiz
                }
              }

              if (submitResult) {
                if (submitResult.error && i >= 4) {
                  output = submitResult.error
                } else if (!submitResult.error) {
                  if (i === 4 && typeof submitResult.score !== 'undefined') {
                    output = `Score: ${submitResult.score} / 100\n\n${submitResult.feedback ?? ''}`
                  }
                  if (i === 5 && submitResult.progress_report) {
                    output = submitResult.progress_report
                  }
                  if (i === 6 && submitResult.motivation) {
                    output = submitResult.motivation
                  }
                  if (i === 7 && submitResult.explanation) {
                    output = submitResult.explanation
                  }
                  if (i === 8 && typeof submitResult.score !== 'undefined') {
                    output = `Logged: ${studentId} → ${
                      startResult?.topic || 'N/A'
                    } → Score: ${submitResult.score}`
                  }
                }
              }

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
                            {output}
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
                  Session complete — all 9 agents executed successfully via backend
                </span>
                <span className="ml-auto font-mono text-xs text-muted">live</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}