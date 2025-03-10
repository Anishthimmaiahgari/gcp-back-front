import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AWSCredentials() {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fade-in effect on component mount
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!accessKey || !secretKey) {
      setError('Both Access Key and Secret Access Key are required');
      // Shake effect for error
      const form = document.getElementById('credentials-form');
      form.classList.add('shake-animation');
      setTimeout(() => {
        form.classList.remove('shake-animation');
      }, 500);
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // In a real app, you would handle the credentials securely
    console.log('AWS credentials submitted:', { accessKey, secretKey });
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard or next step
      navigate('/dashboard');
    }, 1000);
  };

  const handleBack = () => {
    // Fade-out effect before navigating
    setFadeIn(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Bilvantis Logo with hover effect */}
            <img
              src="https://bilvantis.io/wp-content/uploads/2022/12/Bilvantis-logo-png.jpg"
              alt="Bilvantis Logo"
              className="h-8 mr-3 rounded hover:scale-105 transition-transform duration-200"
            />
            <h1 className="text-2xl font-bold text-white">AWS Configuration</h1>
          </div>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105"
          >
            Back
          </button>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div 
          className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50"
        >
          <div className="flex items-center justify-center mb-6">
            {/* AWS Logo with pulse effect */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-HsLcwh4VPToCAUJq1_YO8zvUeXWzqer8A&s"
              alt="Amazon Web Services"
              className="w-16 h-16 object-contain hover:animate-pulse"
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Enter AWS Credentials</h2>
          
          {error && (
            <div className="bg-red-900 text-red-200 p-3 rounded mb-4 animate-fadeIn">
              {error}
            </div>
          )}
          
          <form id="credentials-form" onSubmit={handleSubmit}>
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-1">
              <label className="block text-gray-300 mb-2" htmlFor="accessKey">Access Key ID</label>
              <input
                id="accessKey"
                type="text"
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="AKIAIOSFODNN7EXAMPLE"
              />
            </div>
            
            <div className="mb-6 transform transition-all duration-300 hover:translate-x-1">
              <label className="block text-gray-300 mb-2" htmlFor="secretKey">Secret Access Key</label>
              <input
                id="secretKey"
                type="password"
                className="w-full px-3 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  'Connect to AWS'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake-animation {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  );
}

export default AWSCredentials;