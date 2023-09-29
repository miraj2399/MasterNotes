import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import AxiosInstance from "../services/AxiosInstance";

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