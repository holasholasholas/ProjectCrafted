import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

// Components
import BackgroundVideo from '../components/BackgroundVideo';
import CarModForm from '../components/CarModForm'
import CreateGroupBox from '../components/CreateGroupBox';
// import NavBar from '../components/NavBar';
// import SideBar from '../components/SideBar';

// Pages
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import UserPanelPage from '../pages/UserPanelPage';
import GroupPage from '../pages/GroupPage';
import GaragePage from '../pages/GaragePage';
import SearchPage from '../pages/SearchPage';

// Auth Context
import { UserProvider } from './context/UserContext'; 



function App() {

  const [searchTerm, setSearchTerm] = useState('');
  

  const [carData, setCarData] = useState({
      make: "",
      model: "",
      yearOfManufacture: "",
      modifications: {
        interior: {
          seats: "",
          steeringWheel: "",
        },
        exterior: {
          wheels: "",
          spoilers: "",
        },
        engine: {
          exhaustSystems: {
            downpipe: "",
            midpipe: "",
            muffler: "",
          },
          ecuTuning: "",
        },
      },
    });

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <ToastContainer position="top-right" autoClose={3000} />
          
          {/* <BackgroundVideo /> */}
        
          <Routes>
            <Route path="/" element={<BackgroundVideo />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/search" element={<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="/userpanel" element={<UserPanelPage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/garage" element={ <GaragePage carData={carData} setCarData={setCarData}  /> } />
            <Route path="/garage/:carId" element={<CarModForm carData={carData} setCarData={setCarData}  />} />
           
            
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;