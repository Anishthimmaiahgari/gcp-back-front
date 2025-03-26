import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { Fingerprint, Mail, Lock, User, EyeOff, Eye } from 'lucide-react';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = AuthService.signup(name, email, password);
    if (success) {
      navigate('/signin');
    } else {
      setError('Signup failed');
    }
  };

  const handleBiometricSignUp = () => {
    setError('Biometric authentication initiated. This is a placeholder for real implementation.');
  };

  const handleSocialSignUp = (provider) => {
    setError(`Sign up with ${provider} initiated. This is a placeholder for real implementation.`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white"
         style={{
           backgroundImage: 'url("https://www.shutterstock.com/image-vector/abstract-gradient-wave-particles-big-600nw-1930623710.jpg")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
    }}>
      <div className="w-full max-w-md p-4 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
           
        <div className="flex justify-center mb-4">
          <img 
            src="https://th.bing.com/th/id/OIP.PQzWQzdJEXwoGdeuUfsnUAHaCL?rs=1&pid=ImgDetMain" 
            alt="Bilvantis Logo" 
            className="h-12 rounded"
          />
        </div>
        <h2 className="text-xl font-bold text-center mb-4">Create an Account</h2>
        
        {error && <div className="bg-red-900/70 text-red-200 p-2 rounded mb-3 backdrop-blur-sm text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-300 mb-1 text-sm" htmlFor="name">
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>Name</span>
              </div>
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-2 py-1 border rounded-lg bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-gray-300 mb-1 text-sm" htmlFor="email">
              <div className="flex items-center">
                <Mail size={14} className="mr-1" />
                <span>Email</span>
              </div>
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-2 py-1 border rounded-lg bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-gray-300 mb-1 text-sm" htmlFor="password">
              <div className="flex items-center">
                <Lock size={14} className="mr-1" />
                <span>Password</span>
              </div>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-2 py-1 border rounded-lg bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-1 text-sm" htmlFor="confirmPassword">
              <div className="flex items-center">
                <Lock size={14} className="mr-1" />
                <span>Confirm Password</span>
              </div>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-2 py-1 border rounded-lg bg-gray-700/80 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-bold text-sm relative overflow-hidden group"
            style={{
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)'
            }}
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-300 opacity-50 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="absolute top-0 left-0 w-0 h-full bg-blue-400 opacity-20 group-hover:w-full transition-all duration-500"></span>
          </button>
        </form>
        
        <div className="mt-4 mb-4">
          <button 
            onClick={handleBiometricSignUp}
            className="w-full flex items-center justify-center py-1 px-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300 text-sm"
          >
            <Fingerprint size={16} className="mr-1 text-blue-400" />
            Sign Up with Biometrics
          </button>
        </div>
        
        <div className="mt-3 mb-4">
          <p className="text-center text-gray-400 mb-2 text-sm">Or sign up with</p>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => handleSocialSignUp('Google')}
              className="flex items-center justify-center py-1 px-2 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#FFF"/>
              </svg>
              Google
            </button>
            
            <button 
              onClick={() => handleSocialSignUp('Facebook')}
              className="flex items-center justify-center py-1 px-2 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" fill="#1877f2"/>
              </svg>
              Facebook
            </button>
            
            <button 
              onClick={() => handleSocialSignUp('Microsoft')}
              className="flex items-center justify-center py-1 px-2 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7fba00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00a4ef"/>
                <rect x="13" y="13" width="10" height="10" fill="#ffb900"/>
              </svg>
              Microsoft
            </button>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-gray-400 text-sm">Already have an account? <a href="#/signin" className="text-blue-400 hover:text-blue-300 transition-colors">Sign In</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
