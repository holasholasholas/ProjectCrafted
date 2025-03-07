import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundVideo from '../components/BackgroundVideo';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import UserPanelPage from '../pages/UserPanelPage';

function App() {

  const [open, setOpen] = React.useState(false);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  return (
    <BrowserRouter>
    <div className="App">
      <NavBar toggleDrawer={() => setOpen(true) } />
      <SideBar open={open} onClose={() => setOpen(false)} />
      <BackgroundVideo />
    
      <Routes>
        
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/userpanel" element ={<UserPanelPage />} /> 
        <Route path="/test3" />

      </Routes>
    
    
    </div>
    </BrowserRouter>
  );
}

export default App;