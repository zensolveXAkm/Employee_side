// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../AppwriteConfig"; // Adjust the path as necessary
import { ID } from "appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  async function login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password); // Correct method name
      setUser(session); // Set user session
      return session; // Return session for further use if needed
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to handle in login component
    }
  }

  // Register function
  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password); // Auto-login after registration
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  // Logout function
  async function logout() {
    try {
      await account.deleteSession('current'); // Delete the current session
      setUser(null); // Clear user session
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Re-throw to handle in dashboard component
    }
  }

  // Initialize session check
  async function init() {
    try {
      const session = await account.get(); // Check existing session
      setUser(session); // Set session if available
    } catch (err) {
      setUser(null); // Clear session if not found
    } finally {
      setLoading(false); // Done with loading state
    }
  }

  // Initialize user state
  useEffect(() => {
    init();
  }, []);

  if (loading) return null; // Show nothing while loading

  return (
    <UserContext.Provider value={{ current: user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}