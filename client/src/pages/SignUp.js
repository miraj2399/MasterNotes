import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUpService } from '../services/AuthService';
import Snackbar from '@mui/material/Snackbar'
import { validateEmail, validatePassword, validatePasswordMatch } from "../utilities/ValidateInput";




export default function SignUp() {
  // Initializing state variables using the useState hook

  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: ""
  }
  const [data, setData] = useState(emptyUser);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")

  // Event handler for input changes

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  // Event handler for form submission

  const submitHandler = e => {
    e.preventDefault();
    // Validation checks for email, password, and password match

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
    if (!validatePasswordMatch(data.password, data.confirm_password)) {
      setOpen(true);
      setMessage("Passwords do not match");
      return;
    }
    // Calling the SignUpService to create a new user

    SignUpService(data).then((res) => {
      setOpen(true);
      setMessage("User Created");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }).catch((err) => {
      setOpen(true);
      setMessage("User Creation Failed, message: " + err.message);
    });
    // Clearing form fields after submission

    setData(emptyUser);
  }

  return (
    <div className="">
      <div className="bg-zinc-200 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-gray-900 w-full">
            <div className='text-center mb-8 '> <a href="/" className=" animate-text bg-gradient-to-r from-teal-500 via-purple-500 via-red-900 to-orange-500 bg-clip-text text-transparent text-5xl font-black mb-10 hover:text-blue-900">RU Notes</a></div>

            <div className="mb-4 flex">
              <div className="w-1/2 pr-2">
                <input
                  type="text"
                  className="block border border-gray-100 w-full p-3 rounded"
                  name="firstName"
                  value={data.firstName}
                  onChange={changeHandler}
                  placeholder="First Name" />
              </div>
              {/* User input fields for sign up */}

              <div className="w-1/2 pl-2">
                <input
                  type="text"
                  className="block border border-gray-100 w-full p-3 rounded"
                  name="lastName"
                  value={data.lastName}
                  onChange={changeHandler}
                  placeholder="Last Name" />
              </div>
            </div>
            {/* Email, password, and confirm password input fields */}

            <input
              type="text"
              className="block border border-gray-100 w-full p-3 rounded mb-4"
              name="email"
              value={data.email}
              onChange={changeHandler}
              placeholder="Email" />

            <input
              type="password"
              className="block border border-gray-100 w-full p-3 rounded mb-4"
              name="password"
              value={data.password}
              onChange={changeHandler}
              placeholder="Password" />
            <input
              type="password"
              className="block border border-gray-100 w-full p-3 rounded mb-4"
              name="confirm_password"
              value={data.confirm_password}
              onChange={changeHandler}
              placeholder="Confirm Password" />

            <button
              className='bg-green-500 hover:bg-green-700 text-white-700 px-4 py-3 rounded font-medium w-full'
              onClick={submitHandler}
            >
              Create Account
            </button>
            {/* User agreement */}

            <div className="text-center text-sm text-gray-700 mt-4">
              By signing up, you agree to the &nbsp;
              <a className="no-underline border-b border-gray-700 text-red-700" href="#">
                Terms of Service&nbsp;
              </a> and&nbsp;
              <a className="no-underline border-b border-gray-900 text-gray-900" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
          {/* Link to login page */}

          <div className="text-gray-900 mt-6">
            Already have an account? &nbsp;
            <a className="no-underline border-b border-blue-900 text-blue" href="../login/">
              Log in
            </a>.
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />

      <div className="text-center">
        <Link to="/">Back</Link>
      </div>
    </div>

  );
}