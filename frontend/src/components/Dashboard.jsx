import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CloudService from '../services/CloudService';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [notification, setNotification] = useState(null);
  const [hoveredProvider, setHoveredProvider] = useState(null);
  const [cloudProviders, setCloudProviders] = useState({
    aws: false,
    gcp: false,
    azure: false
  });
  
  useEffect(() => {
    // Retrieve username from local storage or passed state
    const storedUsername = localStorage.getItem('username') || 
                           (location.state && location.state.username) || 
                           'User';
    setUsername(storedUsername);

    // Persist username in local storage
    localStorage.setItem('username', storedUsername);

    // Check for messages from redirects
    if (location.state && location.state.message) {
      setNotification({
        message: location.state.message,
        type: 'success'
      });
      
      // Clear the location state after reading
      window.history.replaceState({}, document.title);
    }
    
    // Check cloud providers authentication status
    setCloudProviders({
      aws: localStorage.getItem('aws_authenticated') === 'true',
      gcp: CloudService.isGCPAuthenticated(),
      azure: localStorage.getItem('azure_authenticated') === 'true'
    });
  }, [location]);
  
  const handleSignOut = () => {
    // Clear all authentication data
    AuthService.logout();
    CloudService.clearGCPAuth();
    localStorage.removeItem('aws_authenticated');
    localStorage.removeItem('azure_authenticated');
    localStorage.removeItem('username');
    
    navigate('/signin');
  };

  const handleSelectAWS = () => {
    navigate('/aws-credentials');
  };

  const handleSelectGCP = () => {
    navigate('/gcp-credentials');
  };

  const handleSelectAzure = () => {
    navigate('/azure-credentials');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-['Inter']"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, rgba(17,24,39,0.9), rgba(31,41,55,0.9)), url("https://www.solidbackgrounds.com/images/1920x1080/1920x1080-black-solid-color-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://th.bing.com/th/id/OIP.PQzWQzdJEXwoGdeuUfsnUAHaCL?rs=1&pid=ImgDetMain"  
              alt="Bilvantis Logo" 
              className="h-8 mr-3 rounded-lg shadow-md"
            />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Cloud Dashboard
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
          >
            Sign Out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome Back, {username}!
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enhance Your Cloud Infrastructure with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-semibold"> 
              {' '}Cost Optimization
            </span>
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-600"></div>
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-400"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Select Your Cloud Provider
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AWS Card */}
          <div 
            className={`bg-gray-800/60 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out 
            ${hoveredProvider === 'aws' ? 'scale-105 shadow-2xl' : 'scale-100'}
            hover:scale-105 hover:shadow-2xl`}
            onMouseEnter={() => setHoveredProvider('aws')}
            onMouseLeave={() => setHoveredProvider(null)}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-HsLcwh4VPToCAUJq1_YO8zvUeXWzqer8A&s" 
                  alt="Amazon Web Services" 
                  className="w-16 h-16 object-contain rounded-full shadow-lg"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-white mb-2">AWS</h3>
              <p className="text-gray-400 text-center mb-4">Amazon Web Services</p>
              <button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-orange-500/50"
                onClick={handleSelectAWS}
              >
                Select AWS
              </button>
            </div>
          </div>
          
          {/* GCP Card */}
          <div 
            className={`bg-gray-800/60 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out 
            ${hoveredProvider === 'gcp' ? 'scale-105 shadow-2xl' : 'scale-100'}
            hover:scale-105 hover:shadow-2xl`}
            onMouseEnter={() => setHoveredProvider('gcp')}
            onMouseLeave={() => setHoveredProvider(null)}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://static-00.iconduck.com/assets.00/google-cloud-icon-2048x1646-7admxejz.png" 
                  alt="Google Cloud Platform" 
                  className="w-16 h-16 object-contain rounded-full shadow-lg"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-white mb-2">GCP</h3>
              <p className="text-gray-400 text-center mb-4">Google Cloud Platform</p>
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                onClick={handleSelectGCP}
              >
                Select GCP
              </button>
            </div>
          </div>
          
          {/* Azure Card */}
          <div 
            className={`bg-gray-800/60 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out 
            ${hoveredProvider === 'azure' ? 'scale-105 shadow-2xl' : 'scale-100'}
            hover:scale-105 hover:shadow-2xl`}
            onMouseEnter={() => setHoveredProvider('azure')}
            onMouseLeave={() => setHoveredProvider(null)}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://img.icons8.com/color/512/azure-1.png" 
                  alt="Microsoft Azure Platform" 
                  className="w-16 h-16 object-contain rounded-full shadow-lg"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-white mb-2">Azure</h3>
              <p className="text-gray-400 text-center mb-4">Microsoft Azure Platform</p>
              <button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-blue-700/50"
                onClick={handleSelectAzure}
              >
                Select Azure
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
