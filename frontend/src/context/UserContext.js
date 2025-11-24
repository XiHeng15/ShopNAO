//keeps track of user authentication state across the app
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    name: localStorage.getItem("userName"),
    role: localStorage.getItem("role"),
  });

  // Keep React state in sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUser({
        token: localStorage.getItem("token"),
        name: localStorage.getItem("userName"),
        role: localStorage.getItem("role"),
      });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = ({ token, name, role }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("role", role);
    setUser({ token, name, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setUser({ token: null, name: null, role: null });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
