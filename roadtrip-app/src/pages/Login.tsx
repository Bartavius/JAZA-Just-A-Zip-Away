import { useState } from "react";
import { loginUser}  from "../services/auth";
import { useDispatch } from "react-redux";
import { clearTokens  } from "../services/authSlice";
import store from "../services/store";
import api from "../api";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const data = await loginUser(username, password, dispatch);
    console.log("Tokens stored in Redux after login:", store.getState().auth); // Debugging
  };

    const handleLogout = () => {
      dispatch(clearTokens());
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
        <button className="btn btn-danger w-100 mt-2" onClick={() => {handleLogout(); window.location.href = '/';}}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;
