import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
import Insights from "./pages/Insights";
import Monitoring from "./pages/Monitoring";

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [searchState, setSearchState] = useState({ keyword: "", mentions: [], errors: [], live: false });

  const renderPage = () => {
    const props = { searchState, setSearchState, setActivePage };
    if (activePage === "conversations") return <Conversations {...props} />;
    if (activePage === "insights") return <Insights {...props} />;
    if (activePage === "monitoring") return <Monitoring {...props} />;
    return <Dashboard {...props} />;
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </div>
  );
}

export default App;
