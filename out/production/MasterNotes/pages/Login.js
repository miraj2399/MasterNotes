import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
const [data,setData] = useState({
  email:"",
  password:""
})

const {email,password} = data;

const changeHandler = e => {
  setData({...data,[e.target.name]:[e.target.value]});
}

const submitHandler = e => {
  e.preventDefault();
  Array.from(e.target).forEach((i) => (i.value = ""));
  setData({email:"",password:""})
  console.log("DATA: email  " + email + " PASSWORD  " + password);

}

return (
    <div>
      <center>
      <h1>Login</h1>
          <form onSubmit={submitHandler} className="bg-green-100 text-center text-red-800 m-3 rounded-3xl p-3">
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