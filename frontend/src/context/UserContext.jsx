// frontend/src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define types for our context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Here you would typically make an API call
      // For now, we'll simulate an API call
      const user = {
        id: Math.random().toString(),
        email: userData.email,
        type: userData.type,
        name: userData.name || 'User',
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user,
        login,
        logout,
        updateUser,
        loading,
        error,
        isAuthenticated: !!user 
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
