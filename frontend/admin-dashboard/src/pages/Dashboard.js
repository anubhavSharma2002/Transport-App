import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <StatCard title="Active Buses" value="12" />
          <StatCard title="Waiting Students" value="230" />
          <StatCard title="Overcrowded Hostels" value="3" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
