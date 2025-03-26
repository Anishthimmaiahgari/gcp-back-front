import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AzureCredentials() {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enabledApis, setEnabledApis] = useState([]);
  const navigate = useNavigate();

  // Mock function to authenticate with Azure
  const authenticateWithAzure = async (key) => {
    // In a real app, this would call Azure's authentication API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (key === 'valid-key') {
          resolve(true);
        } else {
          reject(new Error('Invalid secret key'));
        }
      }, 1000);
    });
  };

  // Mock function to fetch enabled APIs
  const fetchEnabledApis = async () => {
    // In a real app, this would call Azure's API management service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'API 1', description: 'Description for API 1' },
          { id: 2, name: 'API 2', description: 'Description for API 2' },
          { id: 3, name: 'API 3', description: 'Description for API 3' },
        ]);
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!secretKey) {
      setError('Secret Key is required');
      return;
    }
    
    try {
      // Authenticate with Azure
      await authenticateWithAzure(secretKey);
      setIsAuthenticated(true);

      // Fetch enabled APIs
      const apis = await fetchEnabledApis();
      setEnabledApis(apis);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-gray-900/20 animate-gradient-x"
        style={{
          animation: 'gradient-x 15s ease infinite',
          backgroundSize: '200% 200%',
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      <header className="bg-gray-800/90 shadow-lg backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Bilvantis Logo */}
            <img 
              src="https://th.bing.com/th/id/OIP.PQzWQzdJEXwoGdeuUfsnUAHaCL?rs=1&pid=ImgDetMain" 
              alt="Bilvantis Logo" 
              className="h-8 mr-3 rounded"
            />
            <h1 className="text-2xl font-bold text-white">Azure Configuration</h1>
          </div>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg"
          >
            Back
          </button>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {!isAuthenticated ? (
          <div className="bg-gray-800/90 rounded-xl shadow-2xl p-8 border border-gray-700/50 backdrop-blur-lg">
            <div className="flex items-center justify-center mb-8">
              {/* Azure Logo */}
              <img 
                src="https://img.icons8.com/color/512/azure-1.png" 
                alt="Microsoft Azure Platform" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Enter Azure Secret Key
            </h2>
            
            {error && (
              <div className="bg-red-900/80 text-red-200 p-3 rounded-lg mb-6 backdrop-blur-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block text-gray-300 mb-3 text-lg" htmlFor="secretKey">Secret Key</label>
                <input
                  id="secretKey"
                  type="password"
                  className="w-full px-4 py-3 border rounded-xl bg-gray-700/50 border-gray-600/50 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter your Azure secret key"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group shadow-lg"
                >
                  <span className="relative z-10">Connect to Azure</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-800/90 rounded-xl shadow-2xl p-8 border border-gray-700/50 backdrop-blur-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Enabled APIs
            </h2>
            
            <div className="space-y-4">
              {enabledApis.map((api) => (
                <div
                  key={api.id}
                  className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:bg-gray-700/70 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-blue-400">{api.name}</h3>
                  <p className="text-gray-300">{api.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AzureCredentials;
