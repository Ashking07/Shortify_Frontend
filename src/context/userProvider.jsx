import { useState, useEffect } from "react";
import { UserContext } from "./user-context.jsx";

// ==============================
// src/context/UserContext.jsx
// Fixed for consistency and functionality
// ==============================

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");

  // useEffect 1: Load name from localStorage on initial render.
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // useEffect 2: Save name to localStorage whenever it changes.
  // This addresses a critical bug where the name was never saved.
  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    } else {
      localStorage.removeItem("name");
    }
  }, [name]);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};
