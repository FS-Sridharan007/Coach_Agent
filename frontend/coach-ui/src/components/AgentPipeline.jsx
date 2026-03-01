import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AgentCard from './AgentCard'

const AGENTS = [
  {
    tag: 'A-01',
    name: 'Profiler Agent',
    icon: '👤',
    desc: 'Loads the learner profile from persistent JSON storage. Retrieves skills, scores, and session history.',
    tags: ['student_id', 'profile{}'],
  },
  {
    tag: 'A-02',
    name: 'Planner Agent',
    icon: '🗺️',
    desc: 'Analyzes learner profile and goal. Selects the optimal next topic from the ML curriculum using LLaMA3.',
    tags: ['profile', 'goal', 'topic'],
  },
  {
    tag: 'A-03',
    name: 'Content Agent',
    icon: '📚',
    desc: 'Generates a contextual lesson on the chosen topic using RAG retrieval + LLaMA3 generation.',
    tags: ['topic', 'lesson'],
  },
  {
    tag: 'A-04',
    name: 'Assessor Agent',
    icon: '📝',
    desc: 'Creates 3 short-answer quiz questions strictly on the current topic for knowledge evaluation.',
    tags: ['topic', 'quiz[]'],
  },
  {
    tag: 'A-05',
    name: 'Evaluator Agent',
    icon: '⚖️',
    desc: 'Scores learner answers out of 100. Writes back score + feedback. Updates skill model.',
    tags: ['quiz', 'answers', 'score'],
  },
  {
    tag: 'A-06',
    name: 'Progress Agent',
    icon: '📈',
    desc: 'Analyzes full session history to produce progress summary, weak areas, and improvement plan.',
    tags: ['history', 'report'],
  },
  {
    tag: 'A-07',
    name: 'Motivation Agent',
    icon: '⚡',
    desc: 'Generates a short motivational message tailored to the score trend and student history.',
    tags: ['score', 'message'],
  },
  {
    tag: 'A-08',
    name: 'Explainability Agent',
    icon: '🔍',
    desc: 'Explains why this topic was selected and why specific pedagogical decisions were made.',
    tags: ['topic', 'score', 'why'],
  },
  {
    tag: 'A-09',
    name: 'Tracker Agent',
    icon: '🔄',
    desc: 'Lightweight logger. Tracks student ID, topic, and score for each completed session.',
    tags: ['log', 'session'],
  },
  {
    tag: 'A-10',
    name: 'Base Agent',
    icon: '🤖',
    desc: 'Foundation class using Ollama + LLaMA3. All agents inherit from this. Handles model inference.',
    tags: ['ollama', 'llama3', 'inference'],
  },
]

export default function AgentPipeline() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <section id="pipeline" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border max-w-[60px]" />
            <span className="font-mono text-xs text-teal-glow tracking-widest uppercase">
              Agent Architecture
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            The <span className="text-teal-glow">Pipeline</span>
          </h2>
          <p className="text-muted max-w-xl leading-relaxed">
            10 specialized agents working in sequence — from profiling to motivation — each
            with a single responsibility, powered by LLaMA3 via Ollama.
          </p>
        </motion.div>

        {/* Flow Diagram (desktop) */}
        <div className="hidden lg:flex items-center gap-2 mb-12 overflow-x-auto pb-4">
          {AGENTS.slice(0, 9).map((a, i) => (
            <React.Fragment key={a.tag}>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveIdx(i === activeIdx ? null : i)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 border transition-all duration-200 min-w-[80px] ${
                  activeIdx === i
                    ? 'border-teal-glow bg-teal-glow/10 text-teal-glow'
                    : 'border-border text-muted hover:border-teal-glow/40 hover:text-dim'
                }`}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="font-mono text-[9px] tracking-widest">{a.tag}</span>
              </motion.button>
              {i < 8 && (
                <ArrowRight className="w-3 h-3 text-border flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Active agent detail */}
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 p-6 border border-teal-glow/30 bg-teal-glow/5"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{AGENTS[activeIdx].icon}</span>
              <div>
                <div className="font-mono text-xs text-teal-glow tracking-widest mb-1">
                  {AGENTS[activeIdx].tag} — SELECTED
                </div>
                <h3 className="font-display text-xl text-white mb-2">
                  {AGENTS[activeIdx].name}
                </h3>
                <p className="text-dim leading-relaxed">{AGENTS[activeIdx].desc}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Agent Cards Grid */}
        <div id="agents" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.tag}
              agent={agent}
              index={i}
              isActive={activeIdx === i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}