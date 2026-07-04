import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("asa_token");
      const cachedUser = localStorage.getItem("asa_user");

      if (!token) {
        setLoading(false);
        return;
      }

      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch {
          /* ignore malformed cache */
        }
      }

      try {
        const { user: freshUser } = await authService.getMe();
        setUser(freshUser);
        localStorage.setItem("asa_user", JSON.stringify(freshUser));
      } catch {
        localStorage.removeItem("asa_token");
        localStorage.removeItem("asa_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (credentials) => {
    const { token, user: loggedInUser, message } = await authService.login(credentials);
    localStorage.setItem("asa_token", token);
    localStorage.setItem("asa_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    toast.success(message || "Welcome back!");
    return loggedInUser;
  };

  const register = async (data) => {
    const { token, user: newUser, message } = await authService.register(data);
    localStorage.setItem("asa_token", token);
    localStorage.setItem("asa_user", JSON.stringify(newUser));
    setUser(newUser);
    toast.success(message || "Account created successfully!");
    return newUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      /* proceed with local logout regardless */
    }
    localStorage.removeItem("asa_token");
    localStorage.removeItem("asa_user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem("asa_user", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
