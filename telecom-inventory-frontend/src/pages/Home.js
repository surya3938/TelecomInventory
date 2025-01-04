import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext for role-based logic
import '../styles/components/Home.css'; // Import the styles for the Home page

const Home = () => {
    // Simulate logged-in user and roles
    const [user, setUser] = useState(null);
  
    // Mock login to simulate different roles
    const loginAsAdmin = () => setUser({ role: 'Admin' });
    const loginAsManager = () => setUser({ role: 'Manager' });
    const loginAsStaff = () => setUser({ role: 'Staff' });
    const logout = () => setUser(null);
  
    return (
      <div className="home-container">
        <h1 className="home-heading">Telecom Inventory Management System</h1>
  
        {!user ? (
          <div className="home-login-options">
            <p className="home-subheading">Simulate Login:</p>
            <button onClick={loginAsAdmin} className="home-login-btn">Login as Admin</button>
            <button onClick={loginAsManager} className="home-login-btn">Login as Manager</button>
            <button onClick={loginAsStaff} className="home-login-btn">Login as Staff</button>
          </div>
        ) : (
          <div>
            <p className="home-subheading">Role: {user.role}</p>
            <div className="home-actions">
              {user.role === 'Admin' && (
                <>
                  <Link to="/products">Manage Products</Link>
                  <Link to="/suppliers">Manage Suppliers</Link>
                  <Link to="/users">Manage Users</Link>
                </>
              )}
              {user.role === 'Manager' && (
                <>
                  <Link to="/products">View/Edit Products</Link>
                  <Link to="/transactions">Manage Transactions</Link>
                </>
              )}
              {user.role === 'Staff' && (
                <>
                  <Link to="/products">View Products</Link>
                  <Link to="/transactions">Perform Stock Transactions</Link>
                </>
              )}
            </div>
            <button onClick={logout} className="home-logout-btn">Logout</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Home;
  