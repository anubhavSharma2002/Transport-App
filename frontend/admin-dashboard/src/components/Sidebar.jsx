import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div style={{ width: "220px", background: "#111", color: "#fff", height: "100vh", padding: "20px" }}>
      <h3>Admin Panel</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/vehicles">Vehicles</Link></li>
        <li><Link to="/hostels">Hostels</Link></li>
        <li><Link to="/predictions">ML Predictions</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
