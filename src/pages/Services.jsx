import { TrainFront, Building2, Hash } from "lucide-react";

function Services() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Services</h2>

        <p className="mt-1 text-sm text-gray-500">Explore railway services and their operational activity.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">Rail Services</p>
            <TrainFront size={20} className="text-black-600" />

          </div>

          <h3 className="mt-3 text-2xl font-bold text-gray-900">2.32M</h3>
          <p className="mt-1 text-xs text-gray-500">Distinct service records</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">Companies</p>
            <Building2 size={20} className="text-black-600" />

          </div>

          <h3 className="mt-3 text-2xl font-bold text-gray-900">TBD</h3>
          <p className="mt-1 text-xs text-gray-500">To be determined from data</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-500">Service Types</p>
            <Hash size={20} className="text-black-600" />

          </div>

          <h3 className="mt-3 text-2xl font-bold text-gray-900">TBD</h3>
          <p className="mt-1 text-xs text-gray-500">To be determined from data</p>
        </div>
      </div>

      {/* Service analysis */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Service Analysis</h3>

        <p className="mt-1 text-sm text-gray-500">Compare service activity by company, service type, or train number.</p>

        <div className="mt-5 flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-400">Service chart will appear here</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
