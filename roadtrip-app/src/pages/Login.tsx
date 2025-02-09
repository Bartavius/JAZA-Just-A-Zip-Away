import { useState } from "react";
import api from "../api"; // Import Axios instance

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await api.post("/api/accounts/login/", { username, password });

      localStorage.setItem("token", response.data.access); // Store JWT token
      alert("Login successful!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <div className="container align-items-center mt-5 text-secondary">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="w-50">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {setUsername(e.target.value); e.preventDefault();}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {setPassword(e.target.value); e.preventDefault();}}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <a href="/register" className="text-secondary"><u>Register</u></a>
        <button type="submit" className="mt-2 btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
