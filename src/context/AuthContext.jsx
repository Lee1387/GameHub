import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { storage } from "../utils/helpers";

const AuthContext = createContext();

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

  const login = useCallback((userData, authToken, rememberMe = false) => {
    setUser(userData);
    setToken(authToken);

    const userKey = rememberMe ? "user" : "sessionUser";
    const tokenKey = rememberMe ? "token" : "sessionToken";

    storage.set(userKey, userData);
    storage.set(tokenKey, authToken);

    storage.remove(rememberMe ? "sessionUser" : "user");
    storage.remove(rememberMe ? "sessionToken" : "token");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    ["user", "token", "sessionUser", "sessionToken"].forEach((key) =>
      storage.remove(key)
    );
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    const isRemembered = storage.get("token");
    storage.set(isRemembered ? "user" : "sessionUser", userData);
  }, []);

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
