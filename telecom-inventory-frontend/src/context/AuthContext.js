import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Mock user data
const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'manager', password: 'manager123', role: 'Manager' },
  { username: 'staff', password: 'staff123', role: 'Staff' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Check if the username and password match a mock user
    const authenticatedUser = mockUsers.find(
      (mockUser) => mockUser.username === username && mockUser.password === password
    );

    if (authenticatedUser) {
      setUser({ username: authenticatedUser.username, role: authenticatedUser.role });
      return { success: true, role: authenticatedUser.role };
    } else {
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
