import React,{useState} from 'react';

export default function SignUp() {
    const [data,setData] = useState({
      username:"",
      password:"",
      firstName:"",
      lastName:""
    })

    const {firstName, lastName, username,password} = data;

    const changeHandler = e => {
     console.log(e + "  ALL  ")
      setData({...data,[e.target.name]:[e.target.value]});

      console.log(firstName + "  LAST  " + lastName + "  USER  " + username + " PASS  " + password);

    }

    const submitHandler = e => {
      e.preventDefault();
      console.log(data);
      console.log("FINAL CHECK: " + firstName + "  LAST  " + lastName + "  USER  " + username + " PASS  " + password);

      Array.from(e.target).forEach((i) => (i.value = ""));
      console.log("LASTINGG VERIFY: " + firstName + "  LAST  " + lastName + "  USER  " + username + " PASS  " + password);
      setData("", "", "", "")
      console.log("RESET: " + firstName + "  LAST  " + lastName + "  USER  " + username + " PASS  " + password);

    }

//    const backendCall = e => {
//
//    }

    return (
        <div>
          <center>
          <h1>SignUp</h1>
          <form id='signUpForm' onSubmit={submitHandler} className="bg-green-100 text-center text-red-800 m-3 rounded-3xl p-3">
          <label>First Name: </label>
          <input type="text" name="firstName" value={firstName} onChange={changeHandler} required/><br/>
          <label>Last Name: </label>
          <input type="text" name="lastName" value={lastName} onChange={changeHandler} required/><br/>
          <label>Username: </label>
          <input type="text" name="username" value={username} onChange={changeHandler} required/><br/>
          <label>Password: </label>
          <input type="password" name="password" value={password} onChange={changeHandler} required/><br/>
          <input type="submit" name="submit"/>
          </form>
          </center>
        </div>

      );
    }