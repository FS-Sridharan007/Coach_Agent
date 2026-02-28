import { useState } from "react";
import axios from "axios";
import ProgressChart from "./ProgressChart";

function App() {
  const [studentId, setStudentId] = useState("");
  const [goal, setGoal] = useState("");
  const [lesson, setLesson] = useState("");
  const [quiz, setQuiz] = useState("");
  const [answers, setAnswers] = useState("");
  const [result, setResult] = useState(null);

  const startSession = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/start-session", {
        student_id: studentId,
        goal: goal
      });

      setLesson(res.data.lesson);
      setQuiz(res.data.quiz);
      setResult(null); // reset previous result
    } catch (error) {
      console.error(error);
    }
  };

  const submitAnswers = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/submit-answers", {
        student_id: studentId,
        answers: answers
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Autonomous Education Coach</h1>

      {/* Student Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <input
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <button onClick={startSession}>Start Session</button>
      </div>

      {/* Lesson + Quiz */}
      {lesson && (
        <>
          <h2>Lesson</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{lesson}</p>

          <h2>Quiz</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{quiz}</p>

          <textarea
            placeholder="Enter your answers..."
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            rows="5"
            cols="70"
            style={{ marginTop: "10px" }}
          />

          <br />
          <button onClick={submitAnswers} style={{ marginTop: "10px" }}>
            Submit Answers
          </button>
        </>
      )}

      {/* Results Section */}
      {result && (
        <>
          <h2>Results</h2>
          <p><strong>Score:</strong> {result.score}</p>
          <p><strong>Next Action:</strong> {result.next_action}</p>
          <p><strong>Motivation:</strong> {result.motivation}</p>
          <p><strong>Progress Report:</strong> {result.progress_report}</p>

          {/* Graph */}
          {result.profile && (
            <ProgressChart history={result.profile.history} />
          )}
        </>
      )}
    </div>
  );
}

export default App;