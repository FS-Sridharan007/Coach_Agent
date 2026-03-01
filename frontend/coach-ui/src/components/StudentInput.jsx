export default function StudentInput({
  studentId,
  setStudentId,
  goal,
  setGoal,
  startSession,
  loading
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold">Start Learning</h2>

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        type="text"
        placeholder="Learning Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        onClick={startSession}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start Learning"}
      </button>
    </div>
  )
}