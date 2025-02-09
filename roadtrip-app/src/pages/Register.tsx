import { useState } from "react";
import api from "../api"; // Import Axios instance

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear success message

    // Password matching validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/api/accounts/register/", {
        username,
        password,
      });

      setSuccessMessage("Registration successful! You can now log in.");
      setUsername("");
      setPassword("");
      setConfirmPassword(""); // Reset the confirm password field
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container align-items-center mt-5 text-secondary">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="w-50">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <a href="/login" className="text-secondary"><u>Login</u></a>
        <button type="submit" className="btn btn-primary w-100 mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
