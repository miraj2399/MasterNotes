import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LoginService } from "../services/AuthService";
import Snackbar from "@mui/material/Snackbar";
import { validateEmail, validatePassword, validatePasswordMatch } from "../utilities/ValidateInput";
import Cookies from "js-cookie";

export default function Login() {
  const emptyUser = {
    email:"",
    password:""
  }
  const [data,setData] = useState(emptyUser);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")

  const changeHandler = e => {
    setData({...data,[e.target.name]:e.target.value});
  }

  const submitHandler = e => {
    e.preventDefault();
    if (!validateEmail(data.email)) {
      setOpen(true);
      setMessage("Invalid Email");
      return;
    }
    if (!validatePassword(data.password)) {
      setOpen(true);
      setMessage("Password must be at least 8 characters long with at least 1 number and 1 character");
      return;
    }
    LoginService(data).then((res) => {
      Cookies.set("token", res.data.token);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("firstName", res.data.firstName);
      localStorage.setItem("lastName", res.data.lastName);
      setOpen(true);
      setMessage("User Logged In");
      window.location.href = "/dashboard";

      
    }).catch((err) => {
      setOpen(true);
      setMessage("User Login Failed, message: " + err.message);
    });
    setData(emptyUser);
  }


  return (
    <>
      <div className="bg-zinc-200 min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <a href="/" className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black mb-10 hover:text-blue-900">RU Notes</a>
          <input 
            type="email"
            className="block border border-gray-100 w-full p-3 rounded"
            name="email"
            value={data.email}
            onChange={changeHandler}
            placeholder="Email" />
          
          <input
            type="password"
            className="block border border-gray-100 w-full p-3 rounded mt-4 mb-4"
            name="password"
            value={data.password}
            onChange={changeHandler}
            placeholder="Password" />
          
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
            onClick={submitHandler}>Login</button>

          <div className="text-center text-sm text-grey-dark mt-4">
            Don't have an account?&nbsp;
            <Link className="no-underline border-b  border-blue-700 text-blue" to="/signup">
              Create an account
            </Link>.
        
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message={message}
          />

          </div>
        </div>
      </div>

    </>
  )
}