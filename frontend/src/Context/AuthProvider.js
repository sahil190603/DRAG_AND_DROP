import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [memberId , setMemberId]  = useState(null);

  const checkAndSetAllValues = () => {
    const storedToken = localStorage.getItem("authTokens");
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(tokenPayload);
      setToken(storedToken);
      setIsAuth(true);
      setRole(tokenPayload.role);
      setIsLoading(false);
      setMemberId(null);
    } else {
      setTimeout(() => {
        setUser(null);
        setIsLoading(false);
      }, 500); 
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    checkAndSetAllValues();
    return () => ac.abort();
  }, [isAuth]);

  useEffect(() => {
    checkAndSetAllValues();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authTokens");
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(tokenPayload);
      setToken(storedToken);
      setIsAuth(true);
      setRole(tokenPayload.role);
      setMemberId(null);
    }
  }, []);

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setIsAuth(false);
    setRole("");
    setMemberId(null);
    localStorage.clear();
    navigate("/Login", { replace: true });
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logoutUser,
        isAuth,
        setIsAuth,
        role,
        setRole,
        memberId,
        setMemberId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
