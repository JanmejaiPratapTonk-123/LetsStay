import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  };

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const res = await getProfile(savedToken);
          if (res.success && res.data) {
            setUser(res.data);
            setToken(savedToken);
          } else {
            // Expired or invalid token
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error("Failed to restore session profile:", error);
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      }

      setLoading(false);
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
