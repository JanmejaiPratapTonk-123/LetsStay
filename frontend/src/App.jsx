import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComponentDemo from "./pages/ComponentDemo";
import AdminCRUD from "./pages/AdminCRUD";
import Register from "./pages/Register";
import HostDashboard from "./pages/HostDashboard";
import AITripPlanner from "./pages/AITripPlanner";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hostdashboard" element={<HostDashboard />} />
        <Route path="/components" element={<ComponentDemo />} />
        <Route path="/admin" element={<AdminCRUD />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai-trip-planner" element={<AITripPlanner />} />
      </Routes>
    </div>
  );
}

export default App;
