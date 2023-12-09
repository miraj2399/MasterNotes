import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import AxiosInstance from "../services/AxiosInstance";

//this React component represents a public route that allows access to its child components only if the user is not authenticated. If the user is already authenticated, they are redirected to the dashboard.
export default function PublicRoute() {
  const token = Cookies.get("token");
  if (!token) {
    return <Outlet />;
  }
  AxiosInstance.get("/users/authenticated").then((res) => {
    alert("You are already logged in")
    window.location.href = "/dashboard"
    }
    ).catch((err) => {
        return <Outlet />;
        }
        );
}