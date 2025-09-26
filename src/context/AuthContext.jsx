import { createContext, useState, useEffect } from "react";
import { storage } from "../utils/localStorage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = storage.get("token") || storage.get("sessionToken");
    const storedUser = storage.get("user") || storage.get("sessionUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData, authToken, rememberMe = false) => {
    setUser(userData);
    setToken(authToken);

    if (rememberMe) {
      storage.set("user", userData);
      storage.set("token", authToken);
      storage.remove("sessionUser");
      storage.remove("sessionToken");
    } else {
      storage.set("sessionUser", userData);
      storage.set("sessionToken", authToken);
      storage.remove("user");
      storage.remove("token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove("user");
    storage.remove("token");
    storage.remove("sessionUser");
    storage.remove("sessionToken");
  };

  const updateUser = (userData) => {
    setUser(userData);
    const isRemembered = storage.get("token");
    if (isRemembered) {
      storage.set("user", userData);
    } else {
      storage.set("sessionUser", userData);
    }
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
