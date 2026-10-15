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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

{/* Mock Values */}
function Overview() {
  const chartData = {
    labels: [
      "Jan","Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Station Stops",
        data: [
          120, 135, 128, 145, 160, 155,
          170, 165, 150, 175, 180, 190,
        ],
        backgroundColor: "#000000",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>

          <p className="mt-1 text-sm text-gray-500">Summary of Dutch railway operations.</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">Year: 2023</div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total Stops" value="21.2M"
          description="Recorded station stops"
        />

        <KpiCard
          title="Stations" value="558"
          description="Stations in the dataset"
        />

        <KpiCard
          title="Rail Services" value="2.32M"
          description="Distinct service records"
        />

        <KpiCard
          title="Analysis Year" value="2023"
          description="Available data period"
        />
      </div>

      {/* Monthly chart */}
      <ChartCard title="Monthly Station Stops" description="Station stop trends across 2023.">
        <div className="h-72">
          <Bar data={chartData} options={chartOptions}/>
        </div>
      </ChartCard>
    </div>
  );
}

export default Overview;
