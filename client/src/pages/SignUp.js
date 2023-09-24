import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {SignUpService} from '../services/AuthService';
import Snackbar from '@mui/material/Snackbar'




export default function SignUp() {
    const emptyUser = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirm_password:""
    }
    const [data,setData] = useState(emptyUser);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")


    const changeHandler = e => {
      setData({...data,[e.target.name]:e.target.value});
    }

    const submitHandler = e => {
      e.preventDefault();
      if (data.password !== data.confirm_password) {
        setOpen(true);
        setMessage("Passwords do not match");
        return;
      }
      SignUpService(data).then((res) => {
        setOpen(true);
        setMessage("User Created");
      }).catch((err) => {
        setOpen(true);
        setMessage("User Creation Failed, message: " + err.message);
      });
      setData(emptyUser);
    }

    return (
        <div className="">
<div className="bg-zinc-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-gray-900 w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
                   className='bg-green-700 text-white-700 px-4 py-3 rounded font-medium w-full'
                    onClick={submitHandler}
                   >
                    Create Account
                   </button>

                    <div className="text-center text-sm text-gray-700 mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-gray-700 text-red-700" href="#">
                            Terms of Service&nbsp;
                        </a> and&nbsp;
                        <a className="no-underline border-b border-gray-900 text-gray-900" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-gray-900 mt-6">
                    Already have an account? 
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
                action={
                    <React.Fragment>
                    <button className="bg-green-700 text-white-700 px-4 py-3 rounded font-medium w-full" onClick={() => setOpen(false)}>Close</button>
                    </React.Fragment>
                }
            />

          <div className="text-center">
            <Link to="/">Back</Link>
          </div>
        </div>

      );
    }