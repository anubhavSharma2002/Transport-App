import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Vehicles from "./pages/Vehicles"
import Hostels from "./pages/Hostels"
import Predictions from "./pages/Predictions"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/predictions" element={<Predictions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
