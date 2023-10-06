import { Link } from 'react-router-dom';

export default function Home() {
    return (
    <div className="App">
    <h1 className="bg-green-100 text-center text-red-800 m-3 rounded-3xl p-3">Welcome</h1>
     
        <div className="text-center">
            <Link to="/login">Login</Link> 
        </div>

        <div className="text-center">
            <Link to="/signup">Sign Up</Link>
        </div>

    </div>
    );
}