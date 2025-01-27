import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    
    if (email === 'user@example.com' && password === 'password123') {
      setIsAuthenticated(true);
      setUser({ email });
      localStorage.setItem('user', JSON.stringify({ email }));
    } else {
      return false; 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
