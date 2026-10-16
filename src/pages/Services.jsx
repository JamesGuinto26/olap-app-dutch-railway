
import { useEffect, useState } from "react";
import { TrainFront, Building2, Hash } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function Services() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/analytics/services")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load service analytics");
        return response.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const chartData = {
    labels: data?.serviceTypes.map((item) => item.serviceType) || [],
    datasets: [
      {
        label: "Services",
        data: data?.serviceTypes.map((item) => item.totalServices) || [],
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
        <h2 className="text-2xl font-bold text-gray-900">Services</h2>
        <p className="mt-1 text-sm text-gray-500">
          Explore railway services and their operational activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Rail Services</p>
            <TrainFront size={20} className="text-gray-600" />
          </div>
          <h3 className="mt-3 text-2xl font-bold text-gray-900">
            {data ? data.summary.totalServices.toLocaleString() : "..."}
          </h3>
          <p className="mt-1 text-xs text-gray-500">Distinct service records</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Companies</p>
            <Building2 size={20} className="text-gray-600" />
          </div>
          <h3 className="mt-3 text-2xl font-bold text-gray-900">
            {data ? data.summary.totalCompanies : "..."}
          </h3>
          <p className="mt-1 text-xs text-gray-500">Distinct companies</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Service Types</p>
            <Hash size={20} className="text-gray-600" />
          </div>
          <h3 className="mt-3 text-2xl font-bold text-gray-900">
            {data ? data.summary.totalTypes : "..."}
          </h3>
          <p className="mt-1 text-xs text-gray-500">Distinct service types</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Service Analysis</h3>
        <p className="mt-1 text-sm text-gray-500">
          Top 10 service types ranked by distinct service records.
        </p>

        <div className="mt-5 h-96">
          {data && <Bar data={chartData} options={chartOptions} />}
          {!data && !error && (
            <p className="pt-10 text-center text-sm text-gray-500">
              Loading service data...
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

export default Services;

