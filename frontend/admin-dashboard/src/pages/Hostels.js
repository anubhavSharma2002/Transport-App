import { useState } from "react"
import Sidebar from "../components/Sidebar"

function Hostels() {
  const [hostel, setHostel] = useState("KP-1")

  const hostels = []
  for (let i = 1; i <= 25; i++) {
    hostels.push("KP-" + i)
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h2>Hostel Demand</h2>

        <label>Select Hostel:</label><br /><br />

        <select
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        >
          {hostels.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "20px" }}>
          <h3>{hostel}</h3>
          <p>Students Waiting: 45</p>
          <p>Allocated Buses: 2</p>
          <p>Average Wait Time: 6 mins</p>
        </div>
      </div>
    </div>
  )
}

export default Hostels
