import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "../src/context/userContext";


const LoginComponent = () => {

const { login, isAuthenticated, error } = useContext(UserContext);
  
const navigate = useNavigate();

const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  // redirect after login
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      console.log('Navigating to /userpanel');
      navigate('/userpanel');
    }
  }, [isAuthenticated, navigate]);

// toast notification if fail login
useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);

const handleSignUpNavigation = (e) => {
  e.preventDefault();
  navigate('/sign-up')
}

const onChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    await login(email, password);
    toast.success('Login successful');
  } catch (error) {
    console.error(error);
    // Error is already handled in the context
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
    
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com" value={email} onChange={onChange} name="email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="••••••••" value={password} onChange={onChange} name="password"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
      </div>

      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors" >
        Sign In
      </button>
    </form>

    <div className="mt-6 text-center text-sm text-gray-600">
      Don't have an account? 
      <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium" onClick={handleSignUpNavigation}>Sign up</a>
    </div>
  </div>
</div>

  )
}

export default LoginComponent;