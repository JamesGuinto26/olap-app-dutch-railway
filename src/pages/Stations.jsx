import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

function Stations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Stations</h2>

        <p className="mt-1 text-sm text-gray-500">Analyze railway activity across stations.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">Total Stations</p>
            <MapPin size={20} className="text-black-600" />

          </div>

          <h3 className="mt-3 text-2xl font-bold text-gray-900">558</h3>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">Top Station</p>
            <TrendingUp size={20} className="text-black-600" />

          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-900">To be determined</h3>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">Lowest Activity</p>
            <TrendingDown size={20} className="text-black-600" />

          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-900">To be determined</h3>
        </div>
      </div>

      {/* Station analysis / chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Station Performance</h3>

        <p className="mt-1 text-sm text-gray-500">Compare stop counts and other performance measures by station.</p>

        <div className="mt-5 flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-400">
            Station chart will appear here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stations;
