import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: "50px" }}>
      <h2>Admin Login</h2>
      <input placeholder="Username" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button onClick={() => navigate("/dashboard")}>Login</button>
    </div>
  )
}

export default Login
