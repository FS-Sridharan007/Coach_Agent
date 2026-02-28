import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ProgressChart({ history }) {
  if (!history || history.length === 0) return null;

  const data = history.map((item, index) => ({
    attempt: `Attempt ${index + 1}`,
    score: item.score
  }));

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Performance Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="attempt" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;