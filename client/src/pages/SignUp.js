import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [data,setData] = useState({
      email:"",
      password:"",
      firstName:"",
      lastName:""
    })

    const {firstName, lastName, email, password} = data;

    const changeHandler = e => {
      setData({...data,[e.target.name]:[e.target.value]});
    }

    const submitHandler = e => {
      e.preventDefault();
      Array.from(e.target).forEach((i) => (i.value = ""));
      setData({email:"", password:"", firstName:"", lastName:""})
      console.log("DATA: FIRST  " + firstName + "  LAST  " + lastName + "  email  " + email + " PASSWORD  " + password);

    }

    return (
        <div>
          <center>
              <h1>SignUp</h1>
              <form id='signUpForm' onSubmit={submitHandler} className="bg-green-100 text-center text-red-800 m-3 rounded-3xl p-3">
                  <label>First Name: </label>
                  <input type="text" name="firstName" value={firstName} onChange={changeHandler} required/><br/>
                  <label>Last Name: </label>
                  <input type="text" name="lastName" value={lastName} onChange={changeHandler} required/><br/>
                  <label>Email: </label>
                  <input type="text" name="email" value={email} onChange={changeHandler} required/><br/>
                  <label>Password: </label>
                  <input type="password" name="password" value={password} onChange={changeHandler} required/><br/>
                  <input type="submit" name="submit"/>
              </form>
          </center>
          <div className="text-center">
            <Link to="/">Back</Link>
          </div>
        </div>

      );
    }