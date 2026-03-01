import { useState } from 'react'
import axios from 'axios'
import Hero from './components/Hero'
import StudentInput from './components/StudentInput'
import LessonCard from './components/LessonCard'
import QuizSection from './components/QuizSection'
import ResultsSection from './components/ResultsSection'
import PerformanceChart from './components/PerformanceChart'

export default function App() {
  const [studentId, setStudentId] = useState('')
  const [goal, setGoal] = useState('')
  const [lessonData, setLessonData] = useState(null)
  const [answers, setAnswers] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = "http://localhost:8000"

  const startSession = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post(`${API_BASE}/start-session`, {
        student_id: studentId,
        goal: goal
      })

      setLessonData(res.data)
      setResult(null)
      setAnswers('')
    } catch (err) {
      console.error(err)
      setError("Failed to submit answers.")
    } finally {
      setLoading(false)
    }
  }

  const submitAnswers = async () => {
  try {
    setLoading(true)
    setError(null)

    const res = await axios.post(`${API_BASE}/submit-answers`, {
      student_id: studentId,
      answers: answers
    })

    setResult(res.data)

  } catch (err) {
      console.error(err)
      setError("Failed to submit answers.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Hero />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        <StudentInput
          studentId={studentId}
          setStudentId={setStudentId}
          goal={goal}
          setGoal={setGoal}
          startSession={startSession}
          loading={loading}
        />

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        <LessonCard
          topic={lessonData?.topic}
          lesson={lessonData?.lesson}
        />

        <QuizSection
          quiz={lessonData?.quiz}
          answers={answers}
          setAnswers={setAnswers}
          submitAnswers={submitAnswers}
          loading={loading}
        />

        <ResultsSection result={result} />

        <PerformanceChart history={result?.profile?.history} />

      </div>
    </div>
  )
}