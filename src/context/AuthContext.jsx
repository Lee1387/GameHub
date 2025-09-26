import { createContext, useState, useEffect } from "react";
import { storage } from "../utils/localStorage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = storage.get("token");
    const storedUser = storage.get("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    storage.set("user", userData);
    storage.set("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove("user");
    storage.remove("token");
  };

  const updateUser = (userData) => {
    setUser(userData);
    storage.set("user", userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
