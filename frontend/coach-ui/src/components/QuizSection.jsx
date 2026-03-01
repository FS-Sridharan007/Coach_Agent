export default function QuizSection({
  quiz,
  answers,
  setAnswers,
  submitAnswers,
  loading
}) {
  if (!quiz) return null

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold">Quiz</h2>
      <div className="whitespace-pre-wrap">{quiz}</div>

      <textarea
        rows="4"
        placeholder="Write your answers..."
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        onClick={submitAnswers}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Answers"}
      </button>
    </div>
  )
}