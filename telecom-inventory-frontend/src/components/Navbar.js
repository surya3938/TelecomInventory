import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Telecom Inventory</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user && (
          <>
            {user.role === 'Admin' && (
              <>
                <Link to="/products">Products</Link>
                <Link to="/suppliers">Suppliers</Link>
              </>
            )}
            {user.role === 'Manager' && (
              <>
                <Link to="/products">Products</Link>
              </>
            )}
            {user.role === 'Staff' && <Link to="/dashboard">Dashboard</Link>}
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!user && <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
