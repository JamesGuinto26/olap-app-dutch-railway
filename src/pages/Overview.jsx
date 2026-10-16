
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function Overview() {
  const [kpis, setKpis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/analytics/overview")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch overview analytics");
        return response.json();
      })
      .then((data) => setKpis(data.kpis))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            Summary of Dutch railway operations.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">
          Year: 2023
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
        <KpiCard title="Total Stops" value={kpis ? kpis.totalStops.toLocaleString() : "..."} description="Recorded station stops" />
        <KpiCard title="Stations" value={kpis ? kpis.totalStations.toLocaleString() : "..."} description="Stations in the dataset" />
        <KpiCard title="Rail Services" value={kpis ? kpis.totalServices.toLocaleString() : "..."} description="Distinct service records" />
        <KpiCard title="Analysis Year" value="2023" description="Available data period" />
      
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Overview;
