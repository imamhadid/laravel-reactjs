import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const apiUrl = "http://localhost:8000/api/v1/login";

      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
      });

      console.log("Login successful:", response.data);

      const token = response.data.token;

      localStorage.setItem("token", token);

      // Redirect to the /user page or handle it in your React Router setup
      history("/user");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join("\n");

        console.error("Login failed:", errorMessages);
        alert(`Login failed:\n${errorMessages}`);
      } else {
        console.error("Login failed:", error.response?.data?.message);
        alert("Login failed. Please check your inputs and try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group mb-2">
          <legend>Email:</legend>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group mb-2">
          <legend>Password:</legend>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-group-append">
              <span
                className="input-group-text eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
