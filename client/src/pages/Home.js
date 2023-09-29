import { Link } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShareIcon from '@mui/icons-material/Share';


import FAQSection from '../components/FAQSection';
export default function Home() {
  return (
    <>
    <div
    style={{
      backgroundImage: `url("background2.jpg")`,
      height: "50vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",

    }} 
    >
      
      
      <div className="flex flex-row justify-between items-center bg-cyan-500 bg-opacity-50  h-16">
        <div className="flex flex-row justify-between items-center">
          <Link to="/">
            <p className="text-gray-600 hover:text-gray-800 mb-5 text-3xl text-center font-bold  bg-gradient-to-r from-blue-900 to-red-900 bg-clip-text text-transparent">RU Notes</p>
          </Link>


          </div>
          <div className="flex flex-row justify-between items-center mr-8">
          <Link to="/login">
            <p className="text-lg font-bold text-black-900 hover:bg-white p-1 px-2 rounded-2xl ml-4">Login</p>
          </Link>

          <Link to="/signup">
            <p className="text-lg font-bold text-black-900 hover:bg-white p-1 px-2 rounded-2xl ml-4">Sign Up</p>
          </Link>
          </div>
          </div>
          
          <div className="flex flex-col justify-center items-center">
            <p className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl mt-10 font-black mb-2 hover:text-blue-900">RU Notes</p>
            <p className="text-2xl font-bold text-gray-900 mt-4">The best way to take notes</p>
            <Link to="/signup">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8">
              Get Started
            </button>
            </Link>
          </div>
    </div>
    <div className='grid grid-cols-1 gap-4 mt-20  p-10 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'
    
    >
    <div className='col-span-1'>
      <div className='flex flex-col justify-center items-center'>
        <DescriptionIcon sx={{fontSize:50}}/>
        <p className='text-2xl font-bold text-gray-900 mt-4'>Take Notes</p>
        <p className='text-lg text-gray-900 mt-4'>Take notes in class, at home, or anywhere else</p>
      </div>
      </div>

      <div className='col-span-1'>
      <div className='flex flex-col justify-center items-center'>
        <FilterListIcon sx={{fontSize:50}}/>
        <p className='text-2xl font-bold text-gray-900 mt-4'>Organize Notes</p>
        <p className='text-lg text-gray-900 mt-4'>Organize your notes by lecture session</p>
        </div>
        </div>
      
      <div className='col-span-1'>
      <div className='flex flex-col justify-center items-center'>
        <ShareIcon sx={{fontSize:50}}/>
        <p className='text-2xl  fond-bold text-gray-900 mt-4'>Share Notes</p>
        <p className='text-lg text-gray-900 mt-4'>Share your notes with your friends and classmates</p>
        </div>
        </div>
      </div>
      <div 
      className='flex flex-col justify-center  bg-zinc-200 p-32 pt-64 rounded-3xl'
      style={{
        clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)"
      }}
      >
        <FAQSection/>
      </div>
      
      </>
  );
}
