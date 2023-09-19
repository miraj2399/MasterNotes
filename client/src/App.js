
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import './index.css';
function App() {
  return (
    <div className="App">
      <h1 className="bg-green-100 text-center text-red-800 m-3 rounded-3xl p-3">Welcome</h1>
      <Home />
      <Login />
      <SignUp />

    </div>
  );
}

export default App;
