import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Stations from "./pages/Stations";
import Services from "./pages/Services";
import TimeAnalysis from "./pages/TimeAnalysis";

function App() {
  const [activePage, setActivePage] = useState("Overview");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage}/>

        <main className="flex-1 bg-gray-50 p-8">
          {activePage === "Overview" ? (
            <Overview />
          ) : activePage === "Stations" ? (
            <Stations />
          ) : activePage === "Services" ? (
            <Services />
          ) : activePage === "Time Analysis" ? (
            <TimeAnalysis />
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default App;
