// src/Components/PrivateRoute.js
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
