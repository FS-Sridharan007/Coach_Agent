export default function ResultsSection({ result }) {
  if (!result) return null

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Results</h2>
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full">
          Score: {result.score}
        </span>
      </div>

      <p><strong>Next Action:</strong> {result.next_action}</p>
      <p><strong>Feedback:</strong> {result.feedback}</p>
      <p><strong>Explanation:</strong> {result.explanation}</p>

      <div className="bg-gray-100 p-4 rounded-lg">
        {result.progress_report}
      </div>

      <div className="text-blue-600 font-medium">
        {result.motivation}
      </div>
    </div>
  )
}