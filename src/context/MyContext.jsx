
import { createContext, useContext, useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/authservices";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  // Check user when app loads or refreshes
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(token);
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const register = async (data) => {
    setLoading(true);

    try {
      const response = await registerUser(data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);

    try {
      const response = await loginUser(data);

      const accessToken = response.data.token;

      localStorage.setItem("token", accessToken);
      setToken(accessToken);

      const userResponse = await getCurrentUser(accessToken);

      setUser(userResponse.data);

      return userResponse.data;
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
