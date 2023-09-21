import React,{useState} from 'react';

export default function Login() {
const [data,setData] = useState({
  username:"",
  password:""
})

const {username,password} = data;

const changeHandler = e => {
  setData({...data,[e.target.name]:[e.target.value]});

  console.log(username + "   " + password);

}

const submitHandler = e => {

  e.preventDefault();
  console.log(data);

  Array.from(e.target).forEach((i) => (i.value = ""));
  console.log("LASTINGG VERIFY: " + "  USER  " + username + " PASS  " + password);
  setData("", "")
  console.log("RESET: " + "  USER  " + username + " PASS  " + password);

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
    </div>

  );
}