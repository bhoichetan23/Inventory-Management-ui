import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getDashboardGraph } from "../../api/dashboard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// REGISTER SCALES
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesGraph = () => {
  const [range, setRange] = useState("monthly");
  const [graph, setGraph] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGraph(range);
  }, [range]);

  const loadGraph = async (r) => {
    try {
      setLoading(true);
      const res = await getDashboardGraph(r);
      setGraph(res.data);
    } catch (err) {
      console.error("Graph load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="chart-card">Loading chart...</div>;
  if (!graph) return <div className="chart-card">No data</div>;

  const data = {
    labels: graph.labels || [],
    datasets: [
      {
        label: "Purchase",
        data: graph.purchases || [],
        backgroundColor: "#60a5fa",
        borderRadius: 6,
      },
      {
        label: "Sales",
        data: graph.sales || [],
        backgroundColor: "#4ade80",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#6b7280" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v) => v.toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Sales & Purchase</h3>

        <select
          className="chart-filter"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <Bar data={data} options={options} height={250} />
    </div>
  );
};

export default SalesGraph;
