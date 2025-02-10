import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { url } from "./url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const checkAuth = useCallback(async () => {
    console.log("checkAuth Start")
    try {
      const token = localStorage.getItem("token");
      console.log("checkAuth - token:", token);
      if (token) {
        console.log("checkAuth - token exists, fetching user");
        const response = await fetch(`${url}/authorization`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("checkAuth - response:", response);

        if (!response.ok) {
          console.log("checkAuth - response not ok");
          console.error(
            `Authentication failed: ${response.status} ${response.statusText}`,
          );
          try {
            const errorData = await response.json();
            console.error("Error data:", errorData);
            localStorage.removeItem("token");
            setUser(null);
          } catch (jsonError) {
            console.error("Error parsing error response:", jsonError);
            localStorage.removeItem("token");
            setUser(null);
          }
          return;
        }

        const responseData = await response.json();
        setUser(responseData.data.user);
      } else {
        console.log("checkAuth - response ok");
        setUser(null);
      }
    } catch (error) {
      console.log("checkAuth - no token, setting user to null");
      setUser(null);
    } finally {
      console.log("checkAuth - finally, setting loading to false");
      setLoading(false);
    }
    console.log("checkAuth finished");
  }, [])

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.token); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthContext;
