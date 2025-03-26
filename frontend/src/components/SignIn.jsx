import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { Mail, Lock, Eye, EyeOff, Fingerprint } from 'lucide-react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    const success = AuthService.login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleBiometricSignIn = () => {
    setError('Biometric authentication initiated. This is a placeholder for real implementation.');
  };

  const handleSocialSignIn = (provider) => {
    setError(`Sign in with ${provider} initiated. This is a placeholder for real implementation.`);
  };

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-gray-900 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1674811564431-4be5bd37fb6a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYnNpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div> {/* Dark overlay with blur effect */}

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90"
      ></div> {/* Gradient overlay for depth */}

      {/* Parallax Scrolling Effect */}
      <div 
        className="absolute inset-0 bg-fixed"
        style={{
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1674811564431-4be5bd37fb6a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYnNpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(-1px) scale(1.2)', // Parallax effect
          zIndex: -1
        }}
      ></div>

      {/* Sign-In Container */}
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg bg-opacity-90 backdrop-blur-md relative z-10"> {/* Added backdrop-blur-md for glass effect */}
        <div className="flex justify-center mb-6">
          {/* Bilvantis Logo */}
          <img 
            src="https://th.bing.com/th/id/OIP.PQzWQzdJEXwoGdeuUfsnUAHaCL?rs=1&pid=ImgDetMain"
            alt="Bilvantis Logo"
            className="h-14 rounded"
          />
        </div>
        <h2 className="text-xl font-bold text-center mb-6">Sign In</h2>
        
        {error && <div className="bg-red-900 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm" htmlFor="email">
              <div className="flex items-center">
                <Mail size={14} className="mr-2" />
                <span>Email</span>
              </div>
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm" htmlFor="password">
              <div className="flex items-center">
                <Lock size={14} className="mr-2" />
                <span>Password</span>
              </div>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          
          {/* Luminescent Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-bold text-sm relative overflow-hidden group"
            style={{
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)'
            }}
          >
            <span className="relative z-10">Sign In</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-300 opacity-50 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="absolute top-0 left-0 w-0 h-full bg-blue-400 opacity-20 group-hover:w-full transition-all duration-500"></span>
          </button>
        </form>
        
        {/* Biometric Option */}
        <div className="mt-6 mb-6">
          <button 
            onClick={handleBiometricSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
          >
            <Fingerprint size={16} className="mr-2 text-blue-400" />
            Sign In with Biometrics
          </button>
        </div>
        
        {/* Social Sign In Options */}
        <div className="mt-4 mb-6">
          <p className="text-center text-gray-400 mb-3 text-sm">Or sign in with</p>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => handleSocialSignIn('Google')}
              className="flex items-center justify-center py-2 px-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#FFF"/>
              </svg>
              Google
            </button>
            
            <button 
              onClick={() => handleSocialSignIn('Facebook')}
              className="flex items-center justify-center py-2 px-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" fill="#1877f2"/>
              </svg>
              Facebook
            </button>
            
            <button 
              onClick={() => handleSocialSignIn('Microsoft')}
              className="flex items-center justify-center py-2 px-3 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors text-sm"
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
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Don't have an account? <a href="#/signup" className="text-blue-400 hover:text-blue-300">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
