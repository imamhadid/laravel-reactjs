import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Login from '../Components/Login';
import Register from '../Components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthPage: React.FC = () => {
  const history = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      history('/user');
    }
  }, [history]);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Authentication Page</h1>
            </div>
            <div className="card-body">
              {showLogin ? <Login /> : <Register />}
              <hr />
              <div className="text-center">
                <button className="btn btn-link" onClick={toggleForm}>
                  {showLogin ? 'Switch to Register' : 'Switch to Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
