import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// initialize with user data from stored token
// provides login/logout/register functions 
// maintains authentication state
// setup global axios headers for auth req
// for use with compoent that require userContext 
axios.defaults.baseURL = 'http://localhost:5000'
const UserContext = createContext();


const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Full token payload:', payload);
      
      // Check if user data is in payload.user or directly in payload
      if (payload.user) {
          return payload.user;
      } else if (payload.payload) {
          return payload.payload;
      } else {
          // If no clear user object, return the whole payload
          return payload;
      }
  } catch (error) {
      console.error('Invalid token format', error);
      localStorage.removeItem('token');
      return null;
  }
};
  
const setAuthToken = (token) => {
    if (token) {
        //https://axios-http.com/docs/config_defaults
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
    
function UserProvider({ children }) {
    const [user, setUser] = useState(getUserFromToken());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Set auth token on initial load and when user changes
    useEffect(() => {
        setAuthToken(localStorage.getItem('token'));
    }, [user]);
  
    // Login function
    const login = async (formData) => {
        setLoading(true);
        setError(null);
     
        const email = formData.email;
        const password = formData.password;
     
        
        try {
          console.log('Attempting login with:',  email, password );
          const res = await axios.post('/api/login', { email: email, password: password });
          console.log('Login response:', res.data);
          const { token } = res.data;
          
          // Save token and update user state
          localStorage.setItem('token', token);
          setUser(getUserFromToken());
          
          
            return true;
            
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };
  
    // Logout function
    const logout = () => {
        localStorage.clear();
        setUser(null);
        setAuthToken(null);
    };
  
    // Register function
    const register = async (userData) => {
        setLoading(true);
        setError(null);
      
        try {
            const res = await axios.post('/api/users', userData);
            const { token } = res.data;
        
            // Save token and update user state
            localStorage.setItem('token', token);
            setUser(getUserFromToken());
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };
  
    // Check if user is authenticated
    const isAuthenticated = !!user;
  
    const value = { 
        user, 
        setUser, 
        login, 
        logout, 
        register, 
        loading, 
        error,
        isAuthenticated 
    };
  
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
  
export { UserProvider, UserContext };