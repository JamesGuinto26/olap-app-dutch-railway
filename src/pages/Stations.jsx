
import { useEffect, useState } from "react";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function Stations() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/analytics/stations")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load stations");
        return response.json();
      })
      .then(setStations)
      .catch((err) => setError(err.message));
  }, []);

  const topStation = stations[0];
  const lowestStation = stations.length
    ? stations.reduce((lowest, station) =>
        Number(station.totalStops) < Number(lowest.totalStops)
          ? station
          : lowest
      )
    : null;

  {/* Define chart.js properties */}

  const chartData = {
    labels: stations.map((station) => station.station_name),
    datasets: [
      {
        label: "Station Stops",
        data: stations.map((station) => Number(station.totalStops)),
        backgroundColor: "#374151",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
      y: { grid: { display: false } },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Stations</h2>
        <p className="mt-1 text-sm text-gray-500">
          Analyze railway activity across stations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Stations</p>
            <MapPin size={20} className="text-gray-600" />
          </div>
          <h3 className="mt-3 text-2xl font-bold text-gray-900">
            {stations.length ? "558" : "..."}
          </h3>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Top Station</p>
            <TrendingUp size={20} className="text-gray-600" />
          </div>
          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {topStation?.station_name || "..."}
          </h3>
          {topStation && (
            <p className="mt-1 text-sm text-gray-500">
              {Number(topStation.totalStops).toLocaleString()} stops
            </p>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Lowest Activity</p>
            <TrendingDown size={20} className="text-gray-600" />
          </div>
          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {lowestStation?.station_name || "..."}
          </h3>
          {lowestStation && (
            <p className="mt-1 text-sm text-gray-500">
              {Number(lowestStation.totalStops).toLocaleString()} stops
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Top 10 Station Performance
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Stations ranked by recorded stop count.
        </p>

        <div className="mt-5 h-96">
          {stations.length > 0 && (
            <Bar data={chartData} options={chartOptions} />
          )}
          {!stations.length && !error && (
            <p className="pt-10 text-center text-sm text-gray-500">
              Loading station data...
            </p>
          )}
          {error && (
            <p className="pt-10 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stations;
