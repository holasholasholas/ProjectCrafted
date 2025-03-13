import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

// Configure axios instance for auth requests https://blog.logrocket.com/understanding-axios-create/
const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
  
});

// Sign up function using axios
async function signUp(formData) {
  try {
    const response = await authAPI.post('/sign-up', formData);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }
    throw new Error ('No token received from server');
  } catch (error) { 
    error.message
   }
}

// Sign in function using axios
async function signIn(formData) {
  try {
    const response = await authAPI.post('/sign-in', formData);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }
    
    throw new Error('Invalid response from server');
  }  catch (error) { 
    console.error('error during sign in:', error);
    throw error; 
  }
  }


export {
  signUp,
  signIn
};