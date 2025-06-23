import { Navigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";

export const RedirectIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/success" /> : children;
};
