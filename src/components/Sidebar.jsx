import { LayoutDashboard, MapPin, TrainFront, CalendarDays,} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="min-h-screen w-60 border-r border-gray-200 bg-white p-4">
      
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Menu
      </p>

      <nav className="space-y-1">
        <button
          onClick={() => setActivePage("Overview")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
            activePage === "Overview"
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <LayoutDashboard size={18} />Overview</button>

        <button
          onClick={() => setActivePage("Stations")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
            activePage === "Stations"
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <MapPin size={18} />Stations</button>

        <button
          onClick={() => setActivePage("Services")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
            activePage === "Services"
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <TrainFront size={18} />Services</button>

        <button
          onClick={() => setActivePage("Time Analysis")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
            activePage === "Time Analysis"
              ? "bg-gray-200 text-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <CalendarDays size={18} />Time Analysis</button>
      </nav>
    </aside>
  );
}

export default Sidebar;
