import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Home = () => (
  <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
    <div className="text-center">
      <h1 className="mb-4">Welcome to Todo App</h1>
      <p className="mb-4">Your ultimate tool to keep track of your tasks and stay organized.</p>
      <div className="mb-4">
        <Link to="/signup" className="btn btn-primary mr-2">Sign Up</Link>
        <Link to="/signin" className="btn btn-secondary">Sign In</Link>
      </div>
      <img src="https://via.placeholder.com/600x400" alt="Todo App" className="img-fluid" />
    </div>
    <footer className="mt-auto">
      <p className="text-muted">&copy; 2024 Todo App. All rights reserved.</p>
    </footer>
  </div>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Todo App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/todos">My Todos</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => setToken('')}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={!token ? <SignUp /> : <Navigate to="/todos" />} />
            <Route path="/signin" element={!token ? <SignIn setToken={setToken} /> : <Navigate to="/todos" />} />
            <Route path="/todos" element={token ? <Todos token={token} /> : <Navigate to="/signin" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
