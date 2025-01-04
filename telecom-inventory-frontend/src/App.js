import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return element;
};

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={<ProtectedRoute element={<Products />} allowedRoles={['Admin', 'Manager']} />}
        />
        <Route
          path="/suppliers"
          element={<ProtectedRoute element={<Suppliers />} allowedRoles={['Admin']} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} allowedRoles={['Admin', 'Manager', 'Staff']} />}
        />
      </Routes>
      <Footer />
      </div>

  );
};

export default App;
