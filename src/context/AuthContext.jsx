import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // load user from token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token.split(".").length === 3) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);        // 🔥 Restore user from decoded token
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoadingUser(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loadingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
