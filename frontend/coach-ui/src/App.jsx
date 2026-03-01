import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AgentPipeline from './components/AgentPipeline'
import Dashboard from './components/Dashboard'
import SessionSimulator from './components/SessionSimulator'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="noise-bg relative min-h-screen">
      <div className="grid-bg fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <AgentPipeline />
          <Dashboard />
          <SessionSimulator />
        </main>
        <Footer />
      </div>
    </div>
  )
}