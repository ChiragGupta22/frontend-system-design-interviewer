import { createContext, useContext, useState } from "react";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/authservices";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

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

      setToken(accessToken);

      const userResponse = await getCurrentUser(accessToken);

      setUser(userResponse.data);

      return userResponse.data;
    } catch (error) {
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
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