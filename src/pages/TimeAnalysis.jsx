import { CalendarDays, Clock, BarChart3 } from "lucide-react";

function TimeAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Time Analysis</h2>

        <p className="mt-1 text-sm text-gray-500">Analyze railway activity across different time periods.</p>
      </div>

      {/* Time filters */}
      <div className="flex flex-wrap gap-3">
        <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
          <option value="2023">Year: 2023</option>
        </select>

        <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
          <option value="all">All Quarters</option>
          <option value="1">Quarter 1</option>
          <option value="2">Quarter 2</option>
          <option value="3">Quarter 3</option>
          <option value="4">Quarter 4</option>
        </select>

        <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
          <option value="all">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          
          <CalendarDays size={20} className="text-black-600" />
          <p className="mt-3 text-sm text-gray-500">Selected Year</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900">2023</h3>
        
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          
          <Clock size={20} className="text-black-600" />
          <p className="mt-3 text-sm text-gray-500">Time Granularity</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900">Monthly</h3>

        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          
          <BarChart3 size={20} className="text-black-600" />
          <p className="mt-3 text-sm text-gray-500">Time Hierarchy</p>
          <h3 className="mt-1 text-lg font-bold text-gray-900">Year - Quarter - Month</h3>
        
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Over Time</h3>

        <p className="mt-1 text-sm text-gray-500">Compare station stops across selected time periods.</p>

        <div className="mt-5 flex h-56 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-400">Chart will appear here</p>
        </div>
      </div>
    </div>
  );
}

export default TimeAnalysis;
