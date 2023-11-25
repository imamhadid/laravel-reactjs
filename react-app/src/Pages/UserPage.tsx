import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../Components/UserTable";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const response = await axios.get(
            "http://localhost:8000/api/v1/profile"
          );
          setUserData(response.data.user);
        } else {
          history("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [history]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        localStorage.removeItem("token");

        await axios.post("http://localhost:8000/api/v1/logout");

        history("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Your App Name</span>
          {userData && (
            <div className="d-flex">
              <span className="navbar-text me-3">
                Welcome, {userData.name}!
              </span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <h1>User Page</h1>
        {userData && (
          <div>
            <p>Welcome, {userData.name}!</p>
            <UserTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
