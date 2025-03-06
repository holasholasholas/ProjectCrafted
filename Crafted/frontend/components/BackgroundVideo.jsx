import React from 'react';
import videoFile from '../src/Crafted-background-vid.mp4'; // Adjust the path
import '../src/backgroundVideo.css';

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video autoPlay loop muted playsInline className="video">
          <source src={videoFile} type="video/mp4" />
         
        </video>
      </div>
      
    </div>
  );
};

export default BackgroundVideo;