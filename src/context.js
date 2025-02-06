import React, { createContext, useContext, useEffect, useState } from "react";
import { url } from "./url";

const Context = createContext({
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const Provider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (email, password) => {
    const res = await fetch(url + "/authorization", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status > 299 || res.status < 200) {
      throw await res.json();
    }

    setToken((await res.json()).data.token);
  };

  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token]);

  const register = async (data) => {
    const res = await fetch(url + "/registration", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status > 299 || res.status < 200) {
      throw await res.json();
    }

    return res.json();
  };

  const logout = () => {
    setToken(null);
    window.location.replace("/#/login");
  };

  return (
    <Context.Provider
      value={{
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
