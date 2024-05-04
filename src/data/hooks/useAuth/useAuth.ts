import { createContext, useContext } from "react";
import { AuthContextType } from "../../@types/authcontext/authcontext.type";

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};
