export default function LessonCard({ topic, lesson }) {
  if (!lesson) return null

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
      <h2 className="text-xl font-semibold text-blue-600">{topic}</h2>
      <div className="max-h-64 overflow-y-auto whitespace-pre-wrap">
        {lesson}
      </div>
    </div>
  )
}