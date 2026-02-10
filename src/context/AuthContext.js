import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  login: (email, password) => {},
  register: (userData) => {},
  logout: () => {},
});

export const AuthProvider = AuthContext.Provider;

export const useAuth = () => {
  return useContext(AuthContext);
};
