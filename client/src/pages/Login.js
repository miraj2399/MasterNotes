import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
const [data,setData] = useState({
  username:"",
  password:""
})

const {username,password} = data;

const changeHandler = e => {
  setData({...data,[e.target.name]:[e.target.value]});
}

const submitHandler = e => {
  e.preventDefault();
  Array.from(e.target).forEach((i) => (i.value = ""));
  setData("", "")
  console.log("DATA: USERNAME  " + username + " PASSWORD  " + password);

}

return (
    <div>
      <center>
      <h1>Login</h1>
          <form onSubmit={submitHandler} className="bg-green-100 text-center text-red-800 m-3 rounded-3xl p-3">
              <label>Username: </label>
              <input type="text" name="username" value={username} onChange={changeHandler} required/><br/>
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