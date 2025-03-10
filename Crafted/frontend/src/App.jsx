import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Components
import BackgroundVideo from '../components/BackgroundVideo';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

// Pages
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import UserPanelPage from '../pages/UserPanelPage';

// Auth Context
import { UserProvider } from './context/userContext'; 

// Protected Route Component
import ProtectedRoute from '../components/routing/ProtectedRoute'; 

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <ToastContainer position="top-right" autoClose={3000} />
          <NavBar toggleDrawer={() => setOpen(true)} />
          <SideBar open={open} onClose={() => setOpen(false)} />
          <BackgroundVideo />
        
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            
            {/* Protected route */}
            <Route path="/userpanel" element={
              <ProtectedRoute>
                <UserPanelPage />
              </ProtectedRoute>
            } />
            
            <Route path="/test3" />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;