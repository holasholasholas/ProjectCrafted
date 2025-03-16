import React from 'react';
import videoFile from '../src/Crafted-background-vid.mp4'; // Adjust the path
import { useNavigate } from 'react-router-dom';


const BackgroundVideo = () => {
  const navigate = useNavigate();
  return (
    <>
      
      <div className="relative h-screen overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>

        
        <div className="absolute inset-0 flex z-10 bg-gray-500 opacity-10"></div>

        
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="text-8xl font-bold font-rock-salt text-teal-500 m-5 ">Crafted</div>
          <div className="text-white text-4xl font-fine font-rock-salt">Your ride, Your rules</div>

         <div className="flex">
  <div className="text-white text-2xl font-fine font-rock-salt ">
    <button className="bg-transparent text-teal-500 px-6 py-2 hover:text-white transition-colors" onClick={() => navigate('/sign-up')}>
      Sign Up |
    </button>
  </div>
  <div className="text-white text-2xl font-fine font-rock-salt ">
    <button className="bg-transparent text-teal-500 px-6 py-2 hover:text-white transition-colors" onClick={() => navigate('/sign-in')}> | Sign In
    </button>
  </div>
</div> 

        </div>
      </div>
    </>
  );
};

export default BackgroundVideo;