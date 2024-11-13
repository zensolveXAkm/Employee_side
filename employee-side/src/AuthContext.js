// import React, { createContext, useState, useEffect } from 'react';
// import { account } from './AppwriteConfig';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check session on initial load
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const userAccount = await account.get();
//         setUser(userAccount);
//       } catch {
//         setUser(null);
//       }
//     };
//     getUser();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       await account.createSession(email, password);
//       const userAccount = await account.get();
//       setUser(userAccount);
//     } catch (error) {
//       console.error("Login failed", error.message);
//     }
//   };

//   const register = async (email, password) => {
//     try {
//       await account.create(ID.unique(), email, password);
//     } catch (error) {
//       console.error("Registration failed", error.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       await account.deleteSession('current');
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed", error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
