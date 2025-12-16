function StatCard({ title, value }) {
  return (
    <div style={{ padding: "15px", background: "#fff", border: "1px solid #ddd" }}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

export default StatCard
