import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login"  exact/>;
  }
  return <Outlet />;
}
