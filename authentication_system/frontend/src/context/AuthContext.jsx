import { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user || { token: data.token });
    setIsModalOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const openLogin = () => {
    setMode("login");
    setIsModalOpen(true);
  };
  const openRegister = () => {
    setMode("register");
    setIsModalOpen(true);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        mode,
        setMode,
        isModalOpen,
        setIsModalOpen,
        login,
        logout,
        openLogin,
        openRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
