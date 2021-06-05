import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  admin: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
