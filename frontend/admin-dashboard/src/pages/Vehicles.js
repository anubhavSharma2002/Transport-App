import { useState } from "react"
import Sidebar from "../components/Sidebar"

function Vehicles() {

  const generateBuses = () => {
    const buses = {}
    for (let i = 1; i <= 60; i++) {
      buses["BUS-" + i] = {
        driver: "Driver " + i,
        phone: "9" + (800000000 + i),
        hostel: i % 8 === 0 ? "Backup" : "KP-" + ((i % 25) + 1),
        capacity: i % 3 === 0 ? 50 : i % 2 === 0 ? 45 : 40,
        status: i % 5 === 0 ? "Idle" : "Running"
      }
    }
    return buses
  }

  const [busesData, setBusesData] = useState(generateBuses())
  const [selectedBus, setSelectedBus] = useState("BUS-1")
  const [targetHostel, setTargetHostel] = useState("KP-12")

  const busDetails = busesData[selectedBus]

  const idleOrBackupBuses = Object.keys(busesData).filter(
    (b) =>
      busesData[b].status === "Idle" ||
      busesData[b].hostel === "Backup"
  )

  const reassignBus = () => {
    const updated = { ...busesData }

    updated[selectedBus] = {
      ...updated[selectedBus],
      hostel: targetHostel,
      status: "Running"
    }

    setBusesData(updated)
    alert(selectedBus + " reassigned to " + targetHostel)
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h2>Vehicle Management System</h2>

        {/* ================= BUS MANAGEMENT ================= */}
        <h3>A. Bus Management</h3>

        <label>Select Bus:</label><br />
        <select
          value={selectedBus}
          onChange={(e) => setSelectedBus(e.target.value)}
        >
          {Object.keys(busesData).map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <div style={{ marginTop: "10px" }}>
          <p><b>Driver Name:</b> {busDetails.driver}</p>
          <p><b>Driver Phone:</b> {busDetails.phone}</p>
          <p>
            <b>Assigned Hostel:</b>{" "}
            {busDetails.hostel === "Backup"
              ? "Not Assigned (Backup)"
              : busDetails.hostel + " → Campus"}
          </p>
          <p><b>Capacity:</b> {busDetails.capacity}</p>
          <p><b>Status:</b> {busDetails.status}</p>
        </div>

        <hr />

        {/* ================= OVERCROWDING ALERT ================= */}
        <h3 style={{ color: "red" }}>⚠ Overcrowding Alert</h3>

        <p>
          <b>Hostel:</b> KP-12 <br />
          <b>Students Waiting:</b> 120 <br />
          <b>Severity:</b> High
        </p>

        <hr />

        {/* ================= BUS REASSIGNMENT ================= */}
        <h3>D. Reassign Bus to Overcrowded Hostel</h3>

        <label>Select Available Bus:</label><br />
        <select
          value={selectedBus}
          onChange={(e) => setSelectedBus(e.target.value)}
        >
          {idleOrBackupBuses.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <br /><br />

        <label>Assign to Hostel:</label><br />
        <select
          value={targetHostel}
          onChange={(e) => setTargetHostel(e.target.value)}
        >
          {Array.from({ length: 25 }, (_, i) => (
            <option key={i}>KP-{i + 1}</option>
          ))}
        </select>

        <br /><br />

        <button
          onClick={reassignBus}
          style={{
            padding: "8px 16px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Reassign Bus
        </button>

      </div>
    </div>
  )
}

export default Vehicles
