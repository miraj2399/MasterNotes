import { Link } from 'react-router-dom';

import FAQSection from '../components/FAQSection';
export default function Home() {
  return (
    <div className="App">
      
      <nav className="bg-yellow-600 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">RU Notes</div>
          <div className="space-x-4">
            <Link to="/login" className="text-lg hover:text-blue-300">
              Login
            </Link>
            <Link to="/signup" className="text-lg hover:text-blue-300">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      
      <div className="bg-zinc-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-white">
          <div className="flex flex-col md:flex-row items-center">
            
            <div className="md:w-1/2 p-4">
              <img
                src="robot-taking-notes.png" 
                alt="App Image"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="md:w-1/2 p-4">
              <h1 className="text-4xl font-bold mb-4">
                Collaborative Note-Taking for College Students
              </h1>
              <p className="text-xl mb-6">
                Take your notes to the next level with our collaborative note-taking app designed specifically for college students. Simplify your study groups and enhance your learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <FAQSection/>
      </div>
    </div>
  );
}
