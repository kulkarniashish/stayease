import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CONSTANTS from "../utils/constants";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role === CONSTANTS.ROLES.MANAGER) {
    return <Navigate to="/manager" replace />;
  }
  if (role === CONSTANTS.ROLES.ADMIN) {
    return <Navigate to="/admin/hotels" replace />;
  }
  return children;
}
