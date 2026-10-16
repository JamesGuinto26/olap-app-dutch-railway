
import { useEffect, useState } from "react";
import { CalendarDays, Clock, BarChart3 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function TimeAnalysis() {
  const [quarter, setQuarter] = useState("all");
  const [month, setMonth] = useState("all");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({ year: "2023", quarter, month });

    setData(null);
    setError("");

    fetch(`http://localhost:3001/api/analytics/time?${params}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load time analytics");
        return response.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [quarter, month]);

  const chartData = {
    labels: data?.monthlyStops.map((item) => item.monthName) || [],
    datasets: [
      {
        label: "Station Stops",
        data: data?.monthlyStops.map((item) => item.totalStops) || [],
        backgroundColor: "#374151",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const granularity = month !== "all" ? "Daily filter (monthly total)" : quarter !== "all" ? "Quarterly" : "Monthly";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Time Analysis</h2>
        <p className="mt-1 text-sm text-gray-500">
          Analyze railway activity across different time periods.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value="2023"
          disabled
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
        >
          <option value="2023">Year: 2023</option>
        </select>

        <select
          value={quarter}
          onChange={(e) => {
            setQuarter(e.target.value);
            setMonth("all");
          }}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
        >
          <option value="all">All Quarters</option>
          <option value="1">Quarter 1</option>
          <option value="2">Quarter 2</option>
          <option value="3">Quarter 3</option>
          <option value="4">Quarter 4</option>
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
        >
          <option value="all">All Months</option>
          {months.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <CalendarDays size={20} className="text-gray-600" />
          <p className="mt-3 text-sm text-gray-500">Selected Year</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900">2023</h3>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <Clock size={20} className="text-gray-600" />
          <p className="mt-3 text-sm text-gray-500">Time Granularity</p>
          <h3 className="mt-1 text-xl font-bold text-gray-900">{granularity}</h3>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <BarChart3 size={20} className="text-gray-600" />
          <p className="mt-3 text-sm text-gray-500">Total Station Stops</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900">
            {data ? data.totalStops.toLocaleString() : "..."}
          </h3>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Performance Over Time
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Station stops for the selected time period.
        </p>

        <div className="mt-5 h-80">
          {data && data.monthlyStops.length > 0 && (
            <Bar data={chartData} options={chartOptions} />
          )}
          {!data && !error && (
            <p className="pt-10 text-center text-sm text-gray-500">
              Loading time analytics...
            </p>
          )}
          {data && data.monthlyStops.length === 0 && (
            <p className="pt-10 text-center text-sm text-gray-500">
              No data for this selection.
            </p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default TimeAnalysis;
