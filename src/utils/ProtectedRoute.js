import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, islogged }) => {
  if (!islogged) {
    return <Navigate to="/login" />;
  }
  return children;
};