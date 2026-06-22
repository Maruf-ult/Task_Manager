import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

useEffect(() => {
  const accessToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!accessToken) {
    setLoading(false);
    return;
  }

  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.warn("Invalid stored user data", error);
      localStorage.removeItem("user");
    }
  }

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log("User not authenticated", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, pageLoading, setPageLoading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;