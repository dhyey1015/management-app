import { Navigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext"; 

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};